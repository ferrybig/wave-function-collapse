import { Tile } from '../Tile';

export type Symmetry = 'X' | 'L' | 'T' | 'I' | '/' | 'F';
export type SimpleTile = {
	symmetry: Symmetry
	images: string[],
	weight: number,
	connections: [
		string,
		string,
		string,
		string,
	]
};

function loadImage(url: string) {
	return new Promise<HTMLImageElement>((resolve, reject) => {
		const image = new Image();
		image.src = url;
		image.addEventListener('load', () => resolve(image));
		image.addEventListener('error', (e) => reject(e.error));
	});
}

function pickImage(images: HTMLImageElement[], index: number): HTMLImageElement {
	return index < images.length ? images[index] : images[0];
}

function create(
	images: HTMLImageElement[],
	index: number,
	weight: number,
	flip: boolean,
	rotate: 0 | 90 | 180 | 270,
	selfConnectors: [string, string, string, string],
) {
	if(flip) {
		selfConnectors = [selfConnectors[0], selfConnectors[3], selfConnectors[2], selfConnectors[1]];
	}
	switch(rotate),
		case 0:
			break;
		case 90:
			
	return new Tile(ctx => {

	}, weight, );
}

export function simpleTiledModel(tiles: SimpleTile[], tileWidth: number, tileHeight: number): Tile[] {
	return tiles.flatMap(({ connections, images, symmetry, weight }) => {
		const baseRotation = new Tile(tile.weight);
		let tiles: Tile[];
		switch (tile.symmetry) {
		case 'F':
			return [
				Tile.create(pickImage(ti), tile.weight, tiles.imafalse, 0),
				baseRotation.rotate(false, 90),
				baseRotation.rotate(false, 180),
				baseRotation.rotate(false, 270),
				baseRotation.rotate(true, 0),
				baseRotation.rotate(true, 90),
				baseRotation.rotate(true, 180),
				baseRotation.rotate(true, 270),
			];
		case '/':
			tiles = [
				baseRotation.rotate(false, 0),
				baseRotation.rotate(false, 90),
			];
			break;
			case 'L':
				tiles = [
					baseRotation.rotate(false, 0),
					baseRotation.rotate(false, 90),
					baseRotation.rotate(false, 180),
					baseRotation.rotate(false, 270),
				];
				break;
				case 'L':
					tiles = [
						baseRotation.rotate(false, 0),
						baseRotation.rotate(false, 90),
						baseRotation.rotate(false, 180),
						baseRotation.rotate(false, 270),
					];
					break;

		}
	});
}
