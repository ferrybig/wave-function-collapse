import { SimpleTile } from '../../models/simple-tiled-model';
import bridgeImage from './bridge.png';
import groundImage from './ground.png';
import riverImage from './river.png';
import riverturnImage from './riverturn.png';
import roadImage from './road.png';
import roadturnImage from './roadturn.png';
import tImage from './t.png';
import towerImage from './tower.png';
import wallImage from './wall.png';
import wallriverImage from './wallriver.png';
import wallroadImage from './wallroad.png';


export const width = 7;
export const height = 7;

const ROAD = 'R';
const WATER = 'W';
const LAND = 'L';
const WALL = '#';

export const tiles: Record<string, SimpleTile> = {
	bridge: {
		images: [bridgeImage],
		weight: 1,
		symmetry: 'I',
		connections: [
			WATER,
			ROAD,
			WATER,
			ROAD,
		],
	},
	ground: {
		images: [groundImage],
		weight: 1,
		symmetry: 'X',
		connections: [
			LAND,
			LAND,
			LAND,
			LAND,
		],
	},
	river:  {
		images: [riverImage],
		weight: 1,
		symmetry: 'I',
		connections: [
			WATER,
			LAND,
			WATER,
			LAND,
		],
	},
	riverturn:  {
		images: [riverturnImage],
		weight: 1,
		symmetry: 'L',
		connections: [
			WATER,
			WATER,
			LAND,
			LAND,
		],
	},
	road:  {
		images: [roadImage],
		weight: 1,
		symmetry: 'I',
		connections: [
			ROAD,
			LAND,
			ROAD,
			LAND,
		],
	},
	roadturn:  {
		images: [roadturnImage],
		weight: 1,
		symmetry: 'L',
		connections: [
			ROAD,
			ROAD,
			LAND,
			LAND,
		],
	},
	t: {
		images: [tImage],
		weight: 1,
		symmetry: 'T',
		connections: [
			LAND,
			ROAD,
			ROAD,
			ROAD,
		],
	},
	tower: {
		images: [towerImage],
		weight: 1,
		symmetry: 'L',
		connections: [
			WALL,
			WALL,
			LAND,
			LAND,
		],
		avoidSelf: true,
	},
	wall:  {
		images: [wallImage],
		weight: 1,
		symmetry: 'I',
		connections: [
			WALL,
			LAND,
			WALL,
			LAND,
		],
	},
	wallriver: {
		images: [wallriverImage],
		weight: 1,
		symmetry: 'I',
		connections: [
			WALL,
			WATER,
			WALL,
			WATER,
		],
	},
	wallroad:  {
		images: [wallroadImage],
		weight: 1,
		symmetry: 'I',
		connections: [
			WALL,
			ROAD,
			WALL,
			ROAD,
		],
	},
};
