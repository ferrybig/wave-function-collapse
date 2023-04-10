import { SimpleTile, simpleTiledModel } from '../../models/simple-tiled-model';
import cornerImage from './corner.png';
import crossImage from './cross.png';
import emptyImage from './empty.png';
import lineImage from './line.png';
import tImage from './t.png';

const PIPE = 'P';
const EMPTY = 'E';

const corner: SimpleTile = {
	images: [cornerImage],
	weight: 1,
	symmetry: 'L',
	connections: [
		PIPE,
		PIPE,
		EMPTY,
		EMPTY,
	],
};
const cross:SimpleTile = {
	images: [crossImage],
	weight: 1,
	symmetry: 'I',
	connections: [
		PIPE,
		PIPE,
		PIPE,
		PIPE,
	],
};
const empty: SimpleTile ={
	images: [emptyImage],
	weight: 1,
	symmetry: 'X',
	connections: [
		EMPTY,
		EMPTY,
		EMPTY,
		EMPTY,
	],
};
const line: SimpleTile ={
	images: [lineImage],
	weight: 1,
	symmetry: 'I',
	connections: [
		EMPTY,
		PIPE,
		EMPTY,
		PIPE,
	],
};
const t: SimpleTile = {
	images: [tImage],
	weight: 1,
	symmetry: 'T',
	connections: [
		EMPTY,
		PIPE,
		PIPE,
		PIPE,
	],
};

export default () => simpleTiledModel({
	width: 10,
	height: 10,
	tiles: {
		corner,
		cross,
		empty,
		line,
		t,
	},
});
export const cornersOnly = () => simpleTiledModel({
	width: 10,
	height: 10,
	tiles: {
		corner,
	},
});
export const lineCrossAndEmpty = () => simpleTiledModel({
	width: 10,
	height: 10,
	tiles: {
		line,
		empty,
		cross,
	},
});
