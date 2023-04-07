import { Tile } from '../Tile';

export class GridCell {
	constructor(
		public readonly x: number,
		public readonly y: number,
		public tile: Tile | null,
		public validOptions: Tile[],
		public validOptionsWeight: number,
	) {

	}
}
