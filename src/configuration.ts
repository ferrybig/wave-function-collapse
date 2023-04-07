import tileSets from './tilesets';
import { Tile } from './Tile';
import { simpleTiledModel } from './models/simple-tiled-model';
import { LoadedTiles } from './LoadedTiles';
import { TilePreview } from './ui';
import generation from './generation';

export interface Configuration {
	valid: boolean,
	tileset: LoadedTiles,
	width: number,
	height: number,
}

export function configuration(generatorModule: ReturnType<typeof generation>) {
	const tileSetSection = document.querySelector<HTMLFormElement>('#tileset-section')!;
	const configuration = document.querySelector<HTMLFormElement>('#configuration')!;
	const width = document.querySelector<HTMLInputElement>('#width')!;
	const height = document.querySelector<HTMLInputElement>('#height')!;
	const tileSize = document.querySelector<HTMLOutputElement>('#tileSize')!;
	const tileSetElement = document.querySelector<HTMLSelectElement>('#tileset')!;

	interface LoadedTiles {
		width: number,
		height: number,
		tiles: Tile[]
	}

	const EMPTY_TILES: LoadedTiles = {
		width: 0,
		height: 0,
		tiles: [],
	};

	let tiles: LoadedTiles = EMPTY_TILES;
	let selectedTileSet = '';

	for (const [name] of tileSets) {
		const option = document.createElement('option');
		option.innerText = name;
		tileSetElement.appendChild(option);
	}

	const tilePreview = new TilePreview();
	tileSetSection.appendChild(tilePreview);

	function onSizeChange() {
		tileSize.value = `${tiles.width}px x ${tiles.height}px`;

		if (height.valueAsNumber > 0 && width.valueAsNumber > 0 && tiles.tiles.length > 0) {
			generatorModule.setSize(width.valueAsNumber, height.valueAsNumber);
			generatorModule.setTiles(tiles);
		}
	}
	width.addEventListener('input', onSizeChange);
	height.addEventListener('input', onSizeChange);

	async function onTileSetChange() {
		tiles = EMPTY_TILES;
		const value = tileSetElement.value;
		selectedTileSet = value;
		const loaded = await tileSets.find(([key]) => key === value)?.[1]();
		if (loaded && selectedTileSet === value) {
			tiles = {
				tiles: simpleTiledModel(loaded),
				height: loaded.height,
				width: loaded.width,
			};
			onSizeChange();
			tilePreview.render(tiles);
		}
	}
	tileSetElement.addEventListener('change', onTileSetChange);
	configuration.addEventListener('reset', () => setTimeout(onSizeChange));
	onTileSetChange();
}
