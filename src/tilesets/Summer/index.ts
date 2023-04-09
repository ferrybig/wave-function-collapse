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

const CLIFF_HIGH = 'C';
const CLIFF_LOW = 'c';
const LAND = 'LL';
const WATER = 'W';
const ROAD = 'R';

export const tiles: Record<string, SimpleTile> = {
	cliff: {
		images: [
			cliff0Image,
			cliff3Image,
			cliff2Image,
			cliff1Image,
		],
		weight: 1,
		symmetry: 'T',
		connections: [
			LAND,
			CLIFF_HIGH + CLIFF_LOW,
			LAND,
			CLIFF_LOW + CLIFF_HIGH,
		],
	},
	cliffcorner: {
		images: [
			cliffcorner0Image,
			cliffcorner3Image,
			cliffcorner2Image,
			cliffcorner1Image,
		],
		weight: 1,
		symmetry: 'L',
		connections: [
			CLIFF_HIGH + CLIFF_LOW,
			CLIFF_LOW + CLIFF_HIGH,
			LAND,
			LAND,
		],
	},
	cliffturn: {
		images: [
			cliffturn0Image,
			cliffturn3Image,
			cliffturn2Image,
			cliffturn1Image,
		],
		weight: 1,
		symmetry: 'L',
		connections: [
			CLIFF_LOW + CLIFF_HIGH,
			CLIFF_HIGH + CLIFF_LOW,
			LAND,
			LAND,
		],
	},
	grass: {
		images: [
			grass0Image,
		],
		weight: 1,
		symmetry: 'X',
		connections: [
			LAND,
			LAND,
			LAND,
			LAND,
		],
	},
	grasscorner: {
		images: [
			grasscorner0Image,
			grasscorner3Image,
			grasscorner2Image,
			grasscorner1Image,
		],
		weight: 0.01,
		symmetry: 'L',
		connections: [
			ROAD + LAND,
			LAND + ROAD,
			ROAD,
			ROAD,
		],
	},
	road: {
		images: [
			road0Image,
			road3Image,
			road2Image,
			road1Image,
		],
		weight: 0.05,
		symmetry: 'T',
		connections: [
			ROAD,
			ROAD + LAND,
			LAND,
			LAND + ROAD,
		],
	},
	roadturn: {
		images: [
			roadturn0Image,
			roadturn3Image,
			roadturn2Image,
			roadturn1Image,
		],
		weight: 0.05,
		symmetry: 'L',
		connections: [
			LAND + ROAD,
			ROAD + LAND,
			LAND,
			LAND,
		],
	},
	water_a: {
		images: [
			water_a0Image,
		],
		weight: 1,
		symmetry: 'X',
		connections: [
			WATER,
			WATER,
			WATER,
			WATER,
		],
	},
	water_b: {
		images: [
			water_b0Image,
		],
		weight: 1,
		symmetry: 'X',
		connections: [
			WATER,
			WATER,
			WATER,
			WATER,
		],
	},
	water_c: {
		images: [
			water_c0Image,
		],
		weight: 1,
		symmetry: 'X',
		connections: [
			WATER,
			WATER,
			WATER,
			WATER,
		],
	},
	watercorner: {
		images: [
			watercorner0Image,
			watercorner3Image,
			watercorner2Image,
			watercorner1Image,
		],
		weight: 1,
		symmetry: 'L',
		connections: [
			LAND + WATER,
			WATER + LAND,
			LAND,
			LAND,
		],
	},
	waterside: {
		images: [
			waterside0Image,
			waterside3Image,
			waterside2Image,
			waterside1Image,
		],
		weight: 1,
		symmetry: 'T',
		connections: [
			WATER,
			WATER+LAND,
			LAND,
			LAND + WATER,
		],
	},
	waterturn: {
		images: [
			waterturn0Image,
			waterturn3Image,
			waterturn2Image,
			waterturn1Image,
		],
		weight: 1,
		symmetry: 'L',
		connections: [
			WATER,
			WATER,
			WATER+LAND,
			LAND + WATER,
		],
	},
};

