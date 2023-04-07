import { LoadedTiles } from '../LoadedTiles';

export class TilePreview extends HTMLElement {
	constructor() {
		super();
	}
	public connectedCallback() {
		this.classList.add('tile-preview');
	}
	public render({ tiles, height, width }: LoadedTiles) {
		this.replaceChildren(...tiles.map((tile) => {
			const canvas = document.createElement('canvas');
			canvas.classList.add('tile-preview__tile');
			canvas.width = width;
			canvas.height = height;
			canvas.title = `${tile.id} (weight: ${tile.weight}) (code: ${tile.connections})`;
			tile.loadPromise.then(() => {
				const ctx = canvas.getContext('2d')!;
				ctx.translate(width/2, height/2);
				ctx.scale(width, height);
				tile.drawImage(ctx);
			});
			return canvas;
		}));
	}
}

customElements.define('tile-preview', TilePreview);
