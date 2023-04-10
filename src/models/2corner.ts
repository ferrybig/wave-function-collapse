import { LoadedTiles } from '../LoadedTiles';
import { Tile } from '../Tile';
import { imageToPromise } from '../utils';

function drawTile(i: HTMLImageElement, x: number, y: number) {
	return (ctx: CanvasRenderingContext2D) => {
		ctx.drawImage(i, i.naturalWidth / 4 * x, i.naturalHeight /4 * y, i.naturalWidth / 4, i.naturalHeight / 4, -0.5, -0.5, 1, 1);
	};
}

export interface TwoCornerModel {
	image: string,
	tileWidth: number,
	tileHeight: number,
	license?: string
	description?: string
}
export function twoCornerModel({
	image,
	tileHeight,
	tileWidth,
	description = '',
	license = '',
}: TwoCornerModel): LoadedTiles {
	const i = new Image();
	i.src = image;
	const promise = imageToPromise(i);
	return {
		description,
		height: tileHeight,
		width: tileWidth,
		license,
		tiles: [
			new Tile(drawTile(i, 0, 0), 1, ['00', '00', '01', '10'], promise, '0', '0', [false, false, false, false]),
			new Tile(drawTile(i, 1, 0), 1, ['01', '11', '10', '00'], promise, '1', '1', [false, false, false, false]),
			new Tile(drawTile(i, 2, 0), 1, ['10', '01', '11', '11'], promise, '2', '2', [false, false, false, false]),
			new Tile(drawTile(i, 3, 0), 1, ['00', '01', '11', '10'], promise, '3', '3', [false, false, false, false]),
			new Tile(drawTile(i, 0, 1), 1, ['10', '01', '10', '01'], promise, '4', '4', [false, false, false, false]),
			new Tile(drawTile(i, 1, 1), 1, ['01', '11', '11', '10'], promise, '5', '5', [false, false, false, false]),
			new Tile(drawTile(i, 2, 1), 1, ['11', '11', '11', '11'], promise, '6', '6', [false, false, false, false]),
			new Tile(drawTile(i, 3, 1), 1, ['11', '10', '01', '11'], promise, '7', '7', [false, false, false, false]),
			new Tile(drawTile(i, 0, 2), 1, ['01', '10', '00', '00'], promise, '8', '8', [false, false, false, false]),
			new Tile(drawTile(i, 1, 2), 1, ['11', '10', '00', '01'], promise, '9', '9', [false, false, false, false]),
			new Tile(drawTile(i, 2, 2), 1, ['11', '11', '10', '01'], promise, '10', '10', [false, false, false, false]),
			new Tile(drawTile(i, 3, 2), 1, ['10', '00', '01', '11'], promise, '11', '11', [false, false, false, false]),
			new Tile(drawTile(i, 0, 3), 1, ['00', '00', '00', '00'], promise, '12', '12', [false, false, false, false]),
			new Tile(drawTile(i, 1, 3), 1, ['00', '01', '10', '00'], promise, '13', '13', [false, false, false, false]),
			new Tile(drawTile(i, 2, 3), 1, ['01', '10', '01', '10'], promise, '14', '14', [false, false, false, false]),
			new Tile(drawTile(i, 3, 3), 1, ['10', '00', '00', '01'], promise, '15', '15', [false, false, false, false]),
		],
	};
}
