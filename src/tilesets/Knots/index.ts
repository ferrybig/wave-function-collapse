import { SimpleTile } from '../../models/simple-tiled-model';
import cornerImage from './corner.png';
import crossImage from './cross.png';
import emptyImage from './empty.png';
import lineImage from './line.png';
import tImage from './t.png';

export const width = 10;
export const height = 10;

const PIPE = 'P';
const EMPTY = 'E';

export const tiles: Record<string, SimpleTile> = {
	corner: {
		images: [cornerImage],
		weight: 1,
		symmetry: 'L',
		connections: [
			PIPE,
			PIPE,
			EMPTY,
			EMPTY,
		],
	},
	cross: {
		images: [crossImage],
		weight: 1,
		symmetry: 'I',
		connections: [
			PIPE,
			PIPE,
			PIPE,
			PIPE,
		],
	},
	empty: {
		images: [emptyImage],
		weight: 1,
		symmetry: 'X',
		connections: [
			EMPTY,
			EMPTY,
			EMPTY,
			EMPTY,
		],
	},
	line: {
		images: [lineImage],
		weight: 1,
		symmetry: 'I',
		connections: [
			EMPTY,
			PIPE,
			EMPTY,
			PIPE,
		],
	},
	t: {
		images: [tImage],
		weight: 1,
		symmetry: 'T',
		connections: [
			EMPTY,
			PIPE,
			PIPE,
			PIPE,
		],
	},
};

