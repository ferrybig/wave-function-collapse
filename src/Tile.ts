export interface Connector {
	left: string,
	right: string,
}

export type Connector2D = [
	Connector,
	Connector,
	Connector,
	Connector,
];

function rotateAndFlipConnections(connections: Connector2D, rotate: 0 | 90 | 180 | 270, flip: boolean): Connector2D {

}

export class Tile {
	public constructor(
		public drawImage: ((ctx: CanvasRenderingContext2D) => boolean),
		public weight: number,
		public connections: Connector2D,
	) {
	}


	public static create(
		draw: (ctx: CanvasRenderingContext2D, flip: boolean, rotate: 0 | 90 | 180 | 270) => boolean,
		weight: number,
		flip: boolean,
		rotate: 0 | 90 | 180 | 270,
		connections: Connector2D,
	) {
		return new Tile(ctx => draw(ctx, flip, rotate), weight, rotateAndFlipConnections(connections, rotate, flip));
	}
}
