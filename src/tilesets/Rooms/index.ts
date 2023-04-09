import { SimpleTile } from '../../models/simple-tiled-model';
import bendImage from './bend.png';
import cornerImage from './corner.png';
import corridorImage from './corridor.png';
import doorImage from './door.png';
import emptyImage from './empty.png';
import sideImage from './side.png';
import tImage from './t.png';
import turnImage from './turn.png';
import wallImage from './wall.png';

export const width = 3;
export const height = 3;

export const tiles: Record<string, SimpleTile> = {
	bend: {
		images: [bendImage],
		weight: 0.5,
		symmetry: 'L',
		connections: [
			'wbb',
			'bbw',
			'www',
			'www',
		],
	},
	corner: {
		images: [cornerImage],
		weight: 0.5,
		symmetry: 'L',
		connections: [
			'bbw',
			'wbb',
			'bbb',
			'bbb',
		],
	},
	corridor: {
		images: [corridorImage],
		weight: 1.0,
		symmetry: 'I',
		connections: [
			'bwb',
			'bbb',
			'bwb',
			'bbb',
		],
	},
	door: {
		images: [doorImage],
		weight: 0.5,
		symmetry: 'T',
		connections: [
			'www',
			'wbb',
			'bwb',
			'bbw',
		],
	},
	empty: {
		images: [emptyImage],
		weight: 1,
		symmetry: 'X',
		connections: [
			'www',
			'www',
			'www',
			'www',
		],
	},
	side: {
		images: [sideImage],
		weight: 2.0,
		symmetry: 'T',
		connections: [
			'bbb',
			'bbw',
			'www',
			'wbb',
		],
	},
	t: {
		images: [tImage],
		weight: 0.5,
		symmetry: 'T',
		connections: [
			'bbb',
			'bwb',
			'bwb',
			'bwb',
		],
	},
	turn: {
		images: [turnImage],
		weight: 0.25,
		symmetry: 'L',
		connections: [
			'bwb',
			'bwb',
			'bbb',
			'bbb',
		],
	},
	wall: {
		images: [wallImage],
		weight: 1,
		symmetry: 'X',
		connections: [
			'bbb',
			'bbb',
			'bbb',
			'bbb',
		],
	},
};

