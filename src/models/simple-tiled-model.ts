import { Connector2D, Tile } from '../Tile';
import { assertNever } from '../utils';

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
	],
	avoidSelf?: boolean,
};

function loadPromise(image: HTMLImageElement) {
	return new Promise<HTMLImageElement>((resolve, reject) => {
		image.addEventListener('load', () => resolve(image));
		image.addEventListener('error', (e) => reject(e.error));
	});
}

function create(
	name: string,
	images: HTMLImageElement[],
	index: number,
	weight: number,
	flip: boolean,
	rotate: 0 | 90 | 180 | 270,
	selfConnectors: [string, string, string, string],
	avoidSelfConnection: boolean,
) {
	if (flip) {
		selfConnectors = [selfConnectors[0], selfConnectors[3], selfConnectors[2], selfConnectors[1]];
	}
	switch (rotate) {
	case 0:
		break;
	case 90:
		selfConnectors = [selfConnectors[3], selfConnectors[0], selfConnectors[1], selfConnectors[2]];
		break;
	case 180:
		selfConnectors = [selfConnectors[2], selfConnectors[3], selfConnectors[0], selfConnectors[1]];
		break;
	case 270:
		selfConnectors = [selfConnectors[1], selfConnectors[2], selfConnectors[3], selfConnectors[0]];
		break;
	default:
		return assertNever(rotate);
	}
	const shouldPickImage = index < images.length;
	const image = shouldPickImage ? images[index] : images[0];

	return new Tile(
		ctx => {
			if (shouldPickImage) {
				ctx.drawImage(image, -0.5, -0.5, 1, 1);
			} else {
				const angle = rotate * Math.PI / 180;
				if (rotate) ctx.rotate(angle);
				if (flip) ctx.scale(-1, 1);
				ctx.drawImage(image, -0.5, -0.5, 1, 1);
				if (flip) ctx.scale(-1, 1);
				if (rotate) ctx.rotate(-angle);
			}
		},
		weight,
		selfConnectors,
		loadPromise(image),
		`${name}-${rotate}-${flip ? 'flipped' : 'normal'}`,
		name,
		avoidSelfConnection,
	);
}

export function simpleTiledModel({ tiles, width, height }: {tiles: Record<string, SimpleTile>, width: number, height: number }): Tile[] {
	return Object.entries(tiles).flatMap(([name, { connections, images, symmetry, weight, avoidSelf = false }]): Tile[] => {
		const resolvedImages = images.map(url => {
			const image = new Image(width, height);
			image.src = url;
			return image;
		});
		switch (symmetry) {
		case 'F':
			return [
				create(name, resolvedImages, 0, weight / 8, false, 0, connections, avoidSelf),
				create(name, resolvedImages, 1, weight / 8, false, 90, connections, avoidSelf),
				create(name, resolvedImages, 2, weight / 8, false, 180, connections, avoidSelf),
				create(name, resolvedImages, 3, weight / 8, false, 270, connections, avoidSelf),
				create(name, resolvedImages, 4, weight / 8, true, 0, connections, avoidSelf),
				create(name, resolvedImages, 5, weight / 8, true, 90, connections, avoidSelf),
				create(name, resolvedImages, 6, weight / 8, true, 180, connections, avoidSelf),
				create(name, resolvedImages, 7, weight / 8, true, 270, connections, avoidSelf),
			];
		case '/':
		case 'I':
			return [
				create(name, resolvedImages, 0, weight / 2, false, 0, connections, avoidSelf),
				create(name, resolvedImages, 1, weight / 2, false, 90, connections, avoidSelf),
			];
		case 'L':
		case 'T':
			return [
				create(name, resolvedImages, 0, weight / 4, false, 0, connections, avoidSelf),
				create(name, resolvedImages, 1, weight / 4, false, 90, connections, avoidSelf),
				create(name, resolvedImages, 2, weight / 4, false, 180, connections, avoidSelf),
				create(name, resolvedImages, 3, weight / 4, false, 270, connections, avoidSelf),
			];
		case 'X':
			return [
				create(name, resolvedImages, 0, weight / 1, false, 0, connections, avoidSelf),
			];
		default:
			return assertNever(symmetry);
		}
	});
}
