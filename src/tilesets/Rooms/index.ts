import { SimpleTile, simpleTiledModel } from '../../models/simple-tiled-model';
import bendImage from './bend.png';
import cornerImage from './corner.png';
import corridorImage from './corridor.png';
import doorImage from './door.png';
import emptyImage from './empty.png';
import sideImage from './side.png';
import tImage from './t.png';
import turnImage from './turn.png';
import wallImage from './wall.png';

const bend: SimpleTile ={
	images: [bendImage],
	weight: 0.5,
	symmetry: 'L',
	connections: [
		'wbb',
		'bbw',
		'www',
		'www',
	],
};
const corner: SimpleTile ={
	images: [cornerImage],
	weight: 0.5,
	symmetry: 'L',
	connections: [
		'bbw',
		'wbb',
		'bbb',
		'bbb',
	],
};
const corridor: SimpleTile ={
	images: [corridorImage],
	weight: 1.0,
	symmetry: 'I',
	connections: [
		'bwb',
		'bbb',
		'bwb',
		'bbb',
	],
};
const door: SimpleTile ={
	images: [doorImage],
	weight: 0.5,
	symmetry: 'T',
	connections: [
		'www',
		'wbb',
		'bwb',
		'bbw',
	],
};
const empty:SimpleTile = {
	images: [emptyImage],
	weight: 1,
	symmetry: 'X',
	connections: [
		'www',
		'www',
		'www',
		'www',
	],
};
const side:SimpleTile = {
	images: [sideImage],
	weight: 2.0,
	symmetry: 'T',
	connections: [
		'bbb',
		'bbw',
		'www',
		'wbb',
	],
};
const t: SimpleTile ={
	images: [tImage],
	weight: 0.5,
	symmetry: 'T',
	connections: [
		'bbb',
		'bwb',
		'bwb',
		'bwb',
	],
};
const turn: SimpleTile ={
	images: [turnImage],
	weight: 0.25,
	symmetry: 'L',
	connections: [
		'bwb',
		'bwb',
		'bbb',
		'bbb',
	],
};
const wall: SimpleTile =  {
	images: [wallImage],
	weight: 1,
	symmetry: 'X',
	connections: [
		'bbb',
		'bbb',
		'bbb',
		'bbb',
	],
};

export default () => simpleTiledModel({
	width: 3,
	height: 3,
	tiles: {
		bend,
		corner,
		corridor,
		door,
		empty,
		side,
		t,
		turn,
		wall,
	},
});
