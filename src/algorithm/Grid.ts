import { Tile } from '../Tile';
import { GridCell } from './GridCell';
import { NextCalculator } from './NextCalculator';
import { TileCache } from './TileCache';

export class Grid {
	#next: [number, (readonly GridCell[])[]] = [0, []];
	readonly #cells: GridCell[] = [];
	readonly #nextCalcs: NextCalculator[] = [];

	constructor(
		public readonly x: number,
		public readonly y: number,
		public readonly cache: TileCache,
	) {
		let generated = 0;
		let current = new NextCalculator([]);
		for (let i = 0; i < x; i++) {
			for (let j = 0; j < y; j++) {
				const cell = new GridCell(i, j, null, cache.validOptions, this.cache.maxWeight);
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
		this.#next = [this.#cells.length, [this.#cells]];
	}
	#getCellOrNull(x: number, y: number): GridCell | null {
		if (x < 0) return null;
		if (y < 0) return null;
		if (x >= this.x) return null;
		if (y >= this.y) return null;
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
			const val = this.#nextCalcs[0].get()[0];
			this.#next = [val.length, [val]];
			return;
		}
		let foundWeight = Number.POSITIVE_INFINITY;
		let next: [number, (readonly GridCell[])[]] = [0, []];
		for (const calc of this.#nextCalcs) {
			const [cells, weight] = calc.get();
			if (weight < foundWeight) {
				next = [cells.length, [cells]];
				foundWeight = weight;
			} else if (weight === foundWeight) {
				next[0]+= cells.length;
				next[1].push(cells);
			}
		}
		this.#next = next;
	}

	public setTile(cell: GridCell, tile: Tile): GridCell[] {
		cell.tile = tile;
		cell.validOptions = [tile];
		cell.validOptionsWeight = 0;
		const changedCells: GridCell[] = [cell];
		for (const callback of cell.onUpdate) {
			callback();
		}
		const toUpdate = new Set<GridCell>();
		const [top, right, bottom, left] = this.#getNeighbors(cell);
		if (top) toUpdate.add(top);
		if (right) toUpdate.add(right);
		if (bottom) toUpdate.add(bottom);
		if (left) toUpdate.add(left);

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
						changedCells.push(entry);
					}
				}
			}
		} while (toUpdate.size > 0);
		this.#updateNextList();
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
		cell.validOptionsWeight = cell.validOptions.reduce((a, c) => a + c.weight, 0);
		const newLength = cell.validOptions.length;
		if (newLength === 1) {
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
}