export type Connector2D = [
	string,
	string,
	string,
	string,
];

export class Tile {
	public readonly loadPromise: Promise<unknown>;
	public isLoaded = false;

	public constructor(
		public readonly drawImage: ((ctx: CanvasRenderingContext2D) => void),
		public readonly weight: number,
		public readonly connections: Connector2D,
		loadPromise: Promise<unknown>,
		public readonly id: string,
		public readonly baseName: string,
		public readonly avoidSelfConnection: boolean,
	) {
		this.loadPromise = loadPromise.then((e) => {
			this.isLoaded = true;
			return e;
		});
	}
}
