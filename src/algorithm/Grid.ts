import { RandomSeed } from 'random-seed';
import { Tile } from '../Tile';
import { GridCell } from './GridCell';
import { NextCalculator } from './NextCalculator';
import { TileCache } from './TileCache';

export type EdgeMode = 'mirror' | 'wrap' | 'none';

export class Grid {
	#next: [number, (readonly GridCell[])[], boolean] = [0, [], false];
	readonly #cells: GridCell[] = [];
	readonly #nextCalcs: NextCalculator[] = [];

	constructor(
		public readonly x: number,
		public readonly y: number,
		public readonly cache: TileCache,
		public readonly horizontalMode: EdgeMode,
		public readonly verticalMode: EdgeMode,
	) {
		let generated = 0;
		let current = new NextCalculator([]);
		const needsUpdate = new Set<GridCell>();
		for (let i = 0; i < x; i++) {
			for (let j = 0; j < y; j++) {
				const cell = new GridCell(i, j, null, cache.validOptions, this.cache.maxWeight);
				if (
					(horizontalMode === 'mirror' && (i=== 0 || i === x - 1)) ||
					(verticalMode === 'mirror' && (j === 0 || j === y - 1))
				) {
					needsUpdate.add(cell);
				}
				this.#cells.push(cell);
				current.push(cell);
				if (generated++ > 1000) {
					generated = 0;
					this.#nextCalcs.push(current);
					current = new NextCalculator([]);
				}
			}
		}
		this.#nextCalcs.push(current);
		this.#next = [this.#cells.length, [this.#cells], false];
		if (needsUpdate.size > 0) {
			this.recomputeCells(needsUpdate, []);
		}
	}
	#getCellOrNull(x: number, y: number): GridCell | null {
		if (x < 0) return this.horizontalMode === 'wrap' ? this.#getCellOrNull(x + this.x, y) : null;
		if (y < 0) return this.verticalMode === 'wrap' ? this.#getCellOrNull(x, y + this.y) : null;
		if (x >= this.x) return this.horizontalMode === 'wrap' ? this.#getCellOrNull(x - this.x, y) : null;
		if (y >= this.y) return this.verticalMode === 'wrap' ? this.#getCellOrNull(x, y - this.y) : null;
		return this.#cells[x * this.y + y];
	}
	public getCells() {
		return this.#cells;
	}

	public getNextCells() {
		return this.#next;
	}

	#updateNextList() {
		if (this.#nextCalcs.length === 1) {
			const [val,,hasStuckCell] = this.#nextCalcs[0].get();
			this.#next = [val.length, [val], hasStuckCell];
			return;
		}
		let foundWeight = Number.POSITIVE_INFINITY;
		let next: [number, (readonly GridCell[])[], boolean] = [0, [], false];
		for (const calc of this.#nextCalcs) {
			const [cells, weight, hasStuckCell] = calc.get();
			if (weight < foundWeight) {
				next = [cells.length, [cells], hasStuckCell];
				foundWeight = weight;
			} else if (weight === foundWeight) {
				next[0]+= cells.length;
				next[1].push(cells);
				next[2] ||= hasStuckCell;
			}
		}
		this.#next = next;
	}

	private recomputeCell(cell: GridCell, setCells: GridCell[]) {
		const toUpdate = new Set<GridCell>();
		const [top, right, bottom, left] = this.#getNeighbors(cell);
		if (top) toUpdate.add(top);
		if (right) toUpdate.add(right);
		if (bottom) toUpdate.add(bottom);
		if (left) toUpdate.add(left);
		this.recomputeCells(toUpdate,setCells);
	}

	private recomputeCells(toUpdate: Set<GridCell>, setCells: GridCell[]) {
		do {
			for (const entry of toUpdate) {
				toUpdate.delete(entry);
				if (!entry) continue;
				const newSet = this.#updateValidOptions(entry);
				if (newSet !== 'no-change') {
					for (const callback of entry.onUpdate) {
						callback();
					}
					const [top, right, bottom, left] = this.#getNeighbors(entry);
					if (top) toUpdate.add(top);
					if (right) toUpdate.add(right);
					if (bottom) toUpdate.add(bottom);
					if (left) toUpdate.add(left);
					if (newSet === 'set') {
						setCells.push(entry);
					}
				}
			}
		} while (toUpdate.size > 0);
		this.#updateNextList();
	}

	public setTile(cell: GridCell, tile: Tile): GridCell[] {
		cell.tile = tile;
		cell.validOptions = [tile];
		cell.validOptionsWeight = 0;
		const changedCells: GridCell[] = [cell];
		for (const callback of cell.onUpdate) {
			callback();
		}
		this.recomputeCell(cell, changedCells);

		return changedCells;
	}
	#updateValidOptions(cell: GridCell): 'no-change' | 'updated-valid' | 'set' {
		if (cell.tile || cell.validOptions.length === 0) {
			return 'no-change';
		}
		const oldLength = cell.validOptions.length;
		const [top, right, bottom, left] = this.#getNeighbors(cell);
		cell.validOptions = this.cache.getTileConnections(
			top?.validOptions ?? this.cache.validOptions,
			right?.validOptions ?? this.cache.validOptions,
			bottom?.validOptions ?? this.cache.validOptions,
			left?.validOptions ?? this.cache.validOptions,
		);
		cell.validOptionsWeight = cell.validOptions === 'any' ? this.cache.maxWeight : cell.validOptions.reduce((a, c) => a + c.weight, 0);
		const newLength = cell.validOptions.length;
		if (newLength === 1 && cell.validOptions !== 'any') {
			cell.tile = cell.validOptions[0];
			cell.validOptionsWeight = 0;
			return 'set';
		}
		return oldLength !== newLength ? 'updated-valid' : 'no-change';
	}
	#getNeighbors(cell: GridCell) {
		return [
			this.#getCellOrNull(cell.x, cell.y - 1), // top
			this.#getCellOrNull(cell.x + 1, cell.y), // right
			this.#getCellOrNull(cell.x, cell.y + 1), // bottom
			this.#getCellOrNull(cell.x - 1, cell.y), // left
		] as const;
	}

	collapse(random: RandomSeed): GridCell[] {
		const nextInSequenceList = this.getNextCells();
		if (nextInSequenceList[0] === 0) return [];
		let picked = random.intBetween(0, nextInSequenceList[0] - 1);
		let nextInSequence: GridCell | null = null;
		for (const t of nextInSequenceList[1]) {
			if (picked < t.length) {
				nextInSequence = t[picked];
				break;
			}
			picked -= t.length;
		}
		if (!nextInSequence) {
			throw new Error('Was unable to pick a tile');
		}
		if (nextInSequence.tile) {
			throw new Error('Next already got a tile???');
		}
		if (nextInSequence.validOptions.length === 0) return [];
		let tile: Tile | null;
		switch (nextInSequence.validOptions.length) {
		case 0:
			return [];
		case 1:
			tile = nextInSequence.validOptions[0] as Tile;
			break;
		default: {
			const value = random.floatBetween(0, nextInSequence.validOptionsWeight);
			let accumulator = 0;
			tile = null;
			for (const t of nextInSequence.validOptions === 'any' ? this.cache.validOptions : nextInSequence.validOptions) {
				accumulator += t.weight;
				if (accumulator > value) {
					tile = t;
					break;
				}
			}
			if (!tile) {
				throw new Error('Got null tile??');
			}
		}
		}
		return this.setTile(nextInSequence, tile);
	}
}
