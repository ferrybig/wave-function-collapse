import { SimpleTile } from '../../models/simple-tiled-model';
import deep from './deep.png';
import deepShallowCorner from './deep_shallow_corner.png';
import deepShallowEdge from './deep_shallow_edge.png';
import deepShallowTurn from './deep_shallow_turn.png';
import forest from './forest.png';
import plains from './plains.png';
import plainsForestCorner from './plains_forest_corner.png';
import plainsForestEdge from './plains_forest_edge.png';
import plainsForestTurn from './plains_forest_turn.png';
import sand from './sand.png';
import sandPlainsCorner from './sand_plains_corner.png';
import sandPlainsEdge from './sand_plains_edge.png';
import sandPlainsTurn from './sand_plains_turn.png';
import shallow from './shallow.png';
import shallowSandCorner from './shallow_sand_corner.png';
import shallowSandEdge from './shallow_sand_edge.png';
import shallowSandTurn from './shallow_sand_turn.png';

export const width = 2;
export const height = 2;

export const tiles: Record<string, SimpleTile> = {
	deep: {
		images: [deep],
		weight: 1,
		symmetry: 'X',
		connections: [
			'dd',
			'dd',
			'dd',
			'dd',
		],
	},
	deepShallowTurn: {
		images: [deepShallowTurn],
		weight: 1,
		symmetry: 'L',
		connections: [
			'wd',
			'dd',
			'dd',
			'dw',
		],
	},
	deepShallowEdge: {
		images: [deepShallowEdge],
		weight: 1,
		symmetry: 'X',
		connections: [
			'ww',
			'wd',
			'dd',
			'dw',
		],
	},
	deepShallowCorner: {
		images: [deepShallowCorner],
		weight: 1,
		symmetry: 'L',
		connections: [
			'ww',
			'ww',
			'wd',
			'dw',
		],
	},
	shallow: {
		images: [shallow],
		weight: 1,
		symmetry: 'X',
		connections: [
			'ww',
			'ww',
			'ww',
			'ww',
		],
	},
	shallowSandTurn: {
		images: [shallowSandTurn],
		weight: 1,
		symmetry: 'L',
		connections: [
			'sw',
			'ww',
			'ww',
			'ws',
		],
	},
	shallowSandEdge: {
		images: [shallowSandEdge],
		weight: 1,
		symmetry: 'X',
		connections: [
			'ss',
			'sw',
			'ww',
			'ws',
		],
	},
	shallowSandCorner: {
		images: [shallowSandCorner],
		weight: 1,
		symmetry: 'L',
		connections: [
			'ss',
			'ss',
			'sw',
			'ws',
		],
	},
	sand: {
		images: [sand],
		weight: 1,
		symmetry: 'X',
		connections: [
			'ss',
			'ss',
			'ss',
			'ss',
		],
	},
	sandPlainsTurn: {
		images: [sandPlainsTurn],
		weight: 1,
		symmetry: 'L',
		connections: [
			'ps',
			'ss',
			'ss',
			'sp',
		],
	},
	sandPlainsEdge: {
		images: [sandPlainsEdge],
		weight: 1,
		symmetry: 'X',
		connections: [
			'pp',
			'ps',
			'ss',
			'sp',
		],
	},
	sandPlainsCorner: {
		images: [sandPlainsCorner],
		weight: 1,
		symmetry: 'L',
		connections: [
			'pp',
			'pp',
			'ps',
			'sp',
		],
	},
	plains: {
		images: [plains],
		weight: 1,
		symmetry: 'X',
		connections: [
			'pp',
			'pp',
			'pp',
			'pp',
		],
	},
	plainsForestTurn: {
		images: [plainsForestTurn],
		weight: 1,
		symmetry: 'L',
		connections: [
			'fp',
			'pp',
			'pp',
			'pf',
		],
	},
	plainsForestEdge: {
		images: [plainsForestEdge],
		weight: 1,
		symmetry: 'X',
		connections: [
			'ff',
			'fp',
			'pp',
			'pf',
		],
	},
	plainsForestCorner: {
		images: [plainsForestCorner],
		weight: 1,
		symmetry: 'L',
		connections: [
			'ff',
			'ff',
			'fp',
			'pf',
		],
	},
	forest: {
		images: [forest],
		weight: 1,
		symmetry: 'X',
		connections: [
			'ff',
			'ff',
			'ff',
			'ff',
		],
	},
};

