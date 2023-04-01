import tileSets from "./tilesets";
import { Tile } from "./Tile";


const width = document.querySelector<HTMLInputElement>('#width')!;
const height = document.querySelector<HTMLInputElement>('#height')!;
const tileWidth = document.querySelector<HTMLOutputElement>('#tileWidth')!;
const tileHeight = document.querySelector<HTMLOutputElement>('#tileHeight')!;
const outputWidth = document.querySelector<HTMLOutputElement>('#outputWidth')!;
const outputHeight = document.querySelector<HTMLOutputElement>('#outputHeight')!;
const tileSetElement = document.querySelector<HTMLSelectElement>('#tileset')!;

let tiles: Tile[] = [];
let selectedTileSet = '';

for (const [name] of tileSets) {
	const option = document.createElement('option');
	option.innerText = name;
	tileSetElement.appendChild(option)
}

function updateComputedSizes() {

}
function onTilesetChange() {
	tiles = [];
	selectedTileSet = tileSetElement.value;
	
}



export {};