import { LoadedTiles } from '../LoadedTiles';
import { Connector2D, Tile } from '../Tile';
import { assertNever } from '../utils';

export type Symmetry = 'X' | 'L' | 'T' | 'I' | '/' | 'F';
export type SimpleTile = {
	symmetry: Symmetry
	images: (string | {url: string, x: number, y: number, width?: number, height?: number})[],
	weight?: number,
	connections: [
		string | string[],
		string | string[],
		string | string[],
		string | string[],
	],
	avoidSelf?: boolean | [
		boolean,
		boolean,
		boolean,
		boolean,
	],
};
interface PreProcessedTile {
	baseName: string,
	symmetry: Symmetry
	extraId: string,
	images: { image: HTMLImageElement, x: number, y: number, width: number, height: number}[],
	weight: number,
	connections: Connector2D,
	avoidSelf: [
		boolean,
		boolean,
		boolean,
		boolean,
	],
}

function loadPromise(image: HTMLImageElement) {
	return new Promise<HTMLImageElement>((resolve, reject) => {
		image.addEventListener('load', () => resolve(image));
		image.addEventListener('error', (e) => reject(e.error));
	});
}

function create(
	{
		connections,
		avoidSelf,
		images,
		weight,
		baseName,
		extraId,
	}: PreProcessedTile,
	index: number,
	count: number,
	flip: boolean,
	rotate: 0 | 90 | 180 | 270,
) {
	if (flip) {
		connections = [connections[0], connections[3], connections[2], connections[1]];
		avoidSelf = [avoidSelf[0], avoidSelf[3], avoidSelf[2], avoidSelf[1]];
	}
	switch (rotate) {
	case 0:
		break;
	case 90:
		connections = [connections[3], connections[0], connections[1], connections[2]];
		avoidSelf = [avoidSelf[3], avoidSelf[0], avoidSelf[1], avoidSelf[2]];
		break;
	case 180:
		connections = [connections[2], connections[3], connections[0], connections[1]];
		avoidSelf = [avoidSelf[2], avoidSelf[3], avoidSelf[0], avoidSelf[1]];
		break;
	case 270:
		connections = [connections[1], connections[2], connections[3], connections[0]];
		avoidSelf = [avoidSelf[1], avoidSelf[2], avoidSelf[3], avoidSelf[0]];
		break;
	default:
		return assertNever(rotate);
	}
	const shouldPickImageInsteadOfTransform = index < images.length;
	const definition = shouldPickImageInsteadOfTransform ? images[index] : images[0];

	return new Tile(
		ctx => {
			if (shouldPickImageInsteadOfTransform) {
				ctx.drawImage(definition.image, definition.x, definition.y, definition.width, definition.height, -0.5, -0.5, 1, 1);
			} else {
				const angle = rotate * Math.PI / 180;
				if (rotate) ctx.rotate(angle);
				if (flip) ctx.scale(-1, 1);
				ctx.drawImage(definition.image, definition.x, definition.y, definition.width, definition.height, -0.5, -0.5, 1, 1);
				if (flip) ctx.scale(-1, 1);
				if (rotate) ctx.rotate(-angle);
			}
		},
		weight/count,
		connections,
		loadPromise(definition.image),
		`${baseName}${extraId}-${rotate}-${flip ? 'flipped' : 'normal'}`,
		baseName,
		avoidSelf,
	);
}

export interface SimpleTiledModel {
	tiles: Record<string, SimpleTile>,
	width: number,
	height: number
	license?: string
	description?: string
}

export function simpleTiledModel({ tiles, width, height, license = '', description = '' }: SimpleTiledModel): LoadedTiles {
	const loadedImages = new Map<string, HTMLImageElement>();
	return {
		width,
		height,
		license,
		description,
		tiles: Object
			.entries(tiles)
			.flatMap(([key, tile]) => {
				const splitTiles: PreProcessedTile[] = [];
				const amount = tile.connections.reduce((a, c) => Math.max(a, Array.isArray(c) ? c.length : 1), 0);
				for (let i = 0; i < amount; i++) {
					splitTiles.push({
						symmetry: tile.symmetry,
						avoidSelf:
							tile.avoidSelf === undefined ? [false, false, false, false] :
							typeof tile.avoidSelf === 'boolean' ? [tile.avoidSelf, tile.avoidSelf, tile.avoidSelf, tile.avoidSelf] :
							tile.avoidSelf,
						images: tile.images.map(entry => {
							const url = typeof entry ==='string' ? entry : entry.url;
							let image = loadedImages.get(url);
							if (!image) {
								image = new Image();
								image.src = url;
								loadedImages.set(url, image);
							}
							return {
								image,
								x: typeof entry === 'string' ? 0 : entry.x,
								y: typeof entry === 'string' ? 0 : entry.y,
								width: typeof entry === 'string' ? width : entry.width ?? width,
								height: typeof entry === 'string' ? height : entry.height ?? height,
							};
						}),
						baseName: key,
						extraId: `-${i}`,
						connections: [
							Array.isArray(tile.connections[0]) ? tile.connections[0][i % tile.connections[0].length] : tile.connections[0],
							Array.isArray(tile.connections[1]) ? tile.connections[1][i % tile.connections[1].length] : tile.connections[1],
							Array.isArray(tile.connections[2]) ? tile.connections[2][i % tile.connections[2].length] : tile.connections[2],
							Array.isArray(tile.connections[3]) ? tile.connections[3][i % tile.connections[3].length] : tile.connections[3],
						],
						weight: (tile.weight ?? 1) / tile.connections.length,
					});
				}
				return splitTiles;
			})
			.flatMap((tile): Tile[] => {
				switch (tile.symmetry) {
				case 'F':
					return [
						create(tile, 0, 8, false, 0),
						create(tile, 1, 8, false, 90),
						create(tile, 2, 8, false, 180),
						create(tile, 3, 8, false, 270),
						create(tile, 4, 8, true, 0),
						create(tile, 5, 8, true, 90),
						create(tile, 6, 8, true, 180),
						create(tile, 7, 8, true, 270),
					];
				case '/':
				case 'I':
					return [
						create(tile, 0, 2, false, 0),
						create(tile, 1, 2, false, 90),
					];
				case 'L':
				case 'T':
					return [
						create(tile, 0, 4, false, 0  ),
						create(tile, 1, 4, false, 90  ),
						create(tile, 2, 4, false, 180  ),
						create(tile, 3, 4, false, 270  ),
					];
				case 'X':
					return [
						create(tile, 0, 1, false, 0 ),
					];
				default:
					return assertNever(tile.symmetry);
				}
			}),
	};
}
