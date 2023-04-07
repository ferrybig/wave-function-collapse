import { SimpleTile } from '../../models/simple-tiled-model';
import cliff0Image from './cliff 0.png';
import cliff1Image from './cliff 1.png';
import cliff2Image from './cliff 2.png';
import cliff3Image from './cliff 3.png';
import cliffcorner0Image from './cliffcorner 0.png';
import cliffcorner1Image from './cliffcorner 1.png';
import cliffcorner2Image from './cliffcorner 2.png';
import cliffcorner3Image from './cliffcorner 3.png';
import cliffturn0Image from './cliffturn 0.png';
import cliffturn1Image from './cliffturn 1.png';
import cliffturn2Image from './cliffturn 2.png';
import cliffturn3Image from './cliffturn 3.png';
import grass0Image from './grass 0.png';
import grasscorner0Image from './grasscorner 0.png';
import grasscorner1Image from './grasscorner 1.png';
import grasscorner2Image from './grasscorner 2.png';
import grasscorner3Image from './grasscorner 3.png';
import road0Image from './road 0.png';
import road1Image from './road 1.png';
import road2Image from './road 2.png';
import road3Image from './road 3.png';
import roadturn0Image from './roadturn 0.png';
import roadturn1Image from './roadturn 1.png';
import roadturn2Image from './roadturn 2.png';
import roadturn3Image from './roadturn 3.png';
import water_a0Image from './water_a 0.png';
import water_b0Image from './water_b 0.png';
import water_c0Image from './water_c 0.png';
import watercorner0Image from './watercorner 0.png';
import watercorner1Image from './watercorner 1.png';
import watercorner2Image from './watercorner 2.png';
import watercorner3Image from './watercorner 3.png';
import waterside0Image from './waterside 0.png';
import waterside1Image from './waterside 1.png';
import waterside2Image from './waterside 2.png';
import waterside3Image from './waterside 3.png';
import waterturn0Image from './waterturn 0.png';
import waterturn1Image from './waterturn 1.png';
import waterturn2Image from './waterturn 2.png';
import waterturn3Image from './waterturn 3.png';

export const width = 48;
export const height = 48;

const CLIFF_CLOCKWISE = 'C';
const CLIFF_COUNTER_CLOCKWISE = 'c';
const LANDS = 'L';
const WATER = 'W';

export const tiles: Record<string, SimpleTile> = {
	cliff: {
		images: [
			cliff0Image,
			cliff1Image,
			cliff2Image,
			cliff3Image,
		],
		weight: 1,
		symmetry: 'T',
		connections: [
			HIGH_LANDS,
			CLIFF,
			LANDS,
			CLIFF,
		],
	},
	cliffcorner: {
		images: [
			cliffcorner0Image,
			cliffcorner1Image,
			cliffcorner2Image,
			cliffcorner3Image,
		],
		weight: 1,
		symmetry: 'L',
		connections: [
			CLIFF,
			CLIFF,
			HIGH_LANDS,
			HIGH_LANDS,
		],
	},
	cliffturn: {
		images: [
			cliffturn0Image,
			cliffturn1Image,
			cliffturn2Image,
			cliffturn3Image,
		],
		weight: 1,
		symmetry: 'L',
		connections: [
			CLIFF,
			CLIFF,
			LANDS,
			LANDS,
		],
	},
	grass: {
		images: [
			grass0Image,
		],
		weight: 1,
		symmetry: 'X',
		connections: [
			'xxx',
			'xxx',
			'xxx',
			'xxx',
		],
	},
	grasscorner: {
		images: [
			grasscorner0Image,
			grasscorner1Image,
			grasscorner2Image,
			grasscorner3Image,
		],
		weight: 0.01,
		symmetry: 'L',
		connections: [
			'xxx',
			'xxx',
			'xxx',
			'xxx',
		],
	},
	road: {
		images: [
			road0Image,
			road1Image,
			road2Image,
			road3Image,
		],
		weight: 0.05,
		symmetry: 'T',
		connections: [
			'xxx',
			'xxx',
			'xxx',
			'xxx',
		],
	},
	roadturn: {
		images: [
			roadturn0Image,
			roadturn1Image,
			roadturn2Image,
			roadturn3Image,
		],
		weight: 0.05,
		symmetry: 'L',
		connections: [
			'xxx',
			'xxx',
			'xxx',
			'xxx',
		],
	},
	water_a: {
		images: [
			water_a0Image,
		],
		weight: 1,
		symmetry: 'X',
		connections: [
			'xxx',
			'xxx',
			'xxx',
			'xxx',
		],
	},
	water_b: {
		images: [
			water_b0Image,
		],
		weight: 1,
		symmetry: 'X',
		connections: [
			'xxx',
			'xxx',
			'xxx',
			'xxx',
		],
	},
	water_c: {
		images: [
			water_c0Image,
		],
		weight: 1,
		symmetry: 'X',
		connections: [
			'xxx',
			'xxx',
			'xxx',
			'xxx',
		],
	},
	watercorner: {
		images: [
			watercorner0Image,
			watercorner1Image,
			watercorner2Image,
			watercorner3Image,
		],
		weight: 1,
		symmetry: 'L',
		connections: [
			'xxx',
			'xxx',
			'xxx',
			'xxx',
		],
	},
	waterside: {
		images: [
			waterside0Image,
			waterside1Image,
			waterside2Image,
			waterside3Image,
		],
		weight: 1,
		symmetry: 'T',
		connections: [
			'xxx',
			'xxx',
			'xxx',
			'xxx',
		],
	},
	waterturn: {
		images: [
			waterturn0Image,
			waterturn1Image,
			waterturn2Image,
			waterturn3Image,
		],
		weight: 1,
		symmetry: 'L',
		connections: [
			'xxx',
			'xxx',
			'xxx',
			'xxx',
		],
	},
};

