import tileSets from './tilesets';
import { LoadedTiles } from './LoadedTiles';
import { TilePreview } from './ui';
import generation from './generation';
import { EdgeMode } from './algorithm';

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
	const horizontalMode = document.querySelector<HTMLInputElement>('#configuration__horizontal_mode')!;
	const verticalMode = document.querySelector<HTMLInputElement>('#configuration__vertical_mode')!;
	const tileSize = document.querySelector<HTMLOutputElement>('#tileSize')!;
	const tileSetElement = document.querySelector<HTMLSelectElement>('#tileset')!;

	const tilePreview = new TilePreview();
	tileSetSection.appendChild(tilePreview);

	const hash = decodeURI(location.hash.substring(1));

	let selectedTileSet: LoadedTiles | null = null;
	let lastGroup: HTMLOptGroupElement | null = null;

	for (const { group, subName, value, factory } of tileSets) {
		if (lastGroup?.label !== group) {
			lastGroup = document.createElement('optgroup');
			lastGroup.label = group;
			tileSetElement.appendChild(lastGroup);
		}
		const option = document.createElement('option');
		option.innerText = `${group  }/${  subName}`;
		option.value = value;
		lastGroup.appendChild(option);
		if (value === hash) {
			tileSetElement.value = value;
			selectedTileSet = factory();
			tilePreview.render(selectedTileSet);
		}
	}
	if (selectedTileSet === null) {
		tileSetElement.value = '--disabled--';
	}

	function onUpdate() {
		if (height.valueAsNumber > 0 && width.valueAsNumber > 0 && selectedTileSet && selectedTileSet.tiles.length > 0) {
			generatorModule.setSize(width.valueAsNumber, height.valueAsNumber);
			generatorModule.setHorizontalMode(horizontalMode.value as EdgeMode);
			generatorModule.setVerticalMode(verticalMode.value as EdgeMode);
			generatorModule.setTiles(selectedTileSet);
		}
	}
	width.addEventListener('input', onUpdate);
	height.addEventListener('input', onUpdate);
	horizontalMode.addEventListener('input', onUpdate);
	verticalMode.addEventListener('input', onUpdate);
	onUpdate();

	async function onTileSetChange() {
		const value = tileSetElement.value;
		const entry = tileSets.find((opt) => opt.value === value);
		if (!entry) return;
		selectedTileSet = entry.factory();
		tileSize.value = `${selectedTileSet.width}px x ${selectedTileSet.height}px`;
		onUpdate();
		location.replace(`#${encodeURI(value)}`);
		tilePreview.render(selectedTileSet);
	}
	tileSetElement.addEventListener('change', onTileSetChange);
	configuration.addEventListener('reset', () => setTimeout(onUpdate));
}
