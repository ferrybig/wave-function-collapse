import { GridCell } from './GridCell';

export class NextCalculator {
	#next: GridCell[] | null = null;
	#nextWeight = 0;
	#cells: GridCell[];
	#hasStuckCell = false;

	public constructor(cells: GridCell[]) {
		this.#cells = cells;
		for (const cell of cells) {
			cell.onUpdate.push(this.reset);
		}
	}

	public push(cell: GridCell) {
		this.#cells.push(cell);
		cell.onUpdate.push(this.reset);
		this.reset();
	}

	public readonly reset = () => {
		this.#next = null;
	};

	public hasStuckCell() {
		return this.#hasStuckCell;
	}

	#calculate() {
		let foundWeight = Number.POSITIVE_INFINITY;
		this.#hasStuckCell = false;
		this.#next = [];
		for (const cell of this.#cells) {
			if (cell.tile) {
				continue;
			}
			if (cell.validOptions.length === 0) {
				this.#hasStuckCell = true;
				continue;
			}
			if (cell.validOptionsWeight < foundWeight) {
				this.#next = [cell];
				foundWeight = cell.validOptionsWeight;
			} else if (cell.validOptionsWeight === foundWeight) {
				this.#next.push(cell);
			}
		}
		this.#nextWeight = foundWeight;
		return this.#next;
	}

	public get(): [readonly GridCell[], number, boolean] {
		if (this.#next === null) {
			return [this.#calculate(), this.#nextWeight, this.#hasStuckCell];
		}
		return [this.#next, this.#nextWeight, this.#hasStuckCell];
	}
}
