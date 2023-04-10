import { SimpleTile, simpleTiledModel } from '../../models/simple-tiled-model';
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

const ROAD = 'R';
const WATER = 'W';
const LAND = 'L';
const WALL = '#';

const bridge: SimpleTile = {
	images: [bridgeImage],
	weight: 1,
	symmetry: 'I',
	connections: [
		WATER,
		ROAD,
		WATER,
		ROAD,
	],
};
const ground: SimpleTile = {
	images: [groundImage],
	weight: 1,
	symmetry: 'X',
	connections: [
		LAND,
		LAND,
		LAND,
		LAND,
	],
};
const river: SimpleTile = {
	images: [riverImage],
	weight: 1,
	symmetry: 'I',
	connections: [
		WATER,
		LAND,
		WATER,
		LAND,
	],
};
const riverturn: SimpleTile = {
	images: [riverturnImage],
	weight: 1,
	symmetry: 'L',
	connections: [
		WATER,
		WATER,
		LAND,
		LAND,
	],
};
const road: SimpleTile = {
	images: [roadImage],
	weight: 1,
	symmetry: 'I',
	connections: [
		ROAD,
		LAND,
		ROAD,
		LAND,
	],
};
const roadturn: SimpleTile = {
	images: [roadturnImage],
	weight: 1,
	symmetry: 'L',
	connections: [
		ROAD,
		ROAD,
		LAND,
		LAND,
	],
};
const t: SimpleTile = {
	images: [tImage],
	weight: 1,
	symmetry: 'T',
	connections: [
		LAND,
		ROAD,
		ROAD,
		ROAD,
	],
};
const tower: SimpleTile = {
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
};
const wall: SimpleTile = {
	images: [wallImage],
	weight: 1,
	symmetry: 'I',
	connections: [
		WALL,
		LAND,
		WALL,
		LAND,
	],
	avoidSelf: [
		false,
		true,
		false,
		true,
	],
};
const wallriver: SimpleTile = {
	images: [wallriverImage],
	weight: 1,
	symmetry: 'I',
	connections: [
		WALL,
		WATER,
		WALL,
		WATER,
	],
	avoidSelf: [
		false,
		true,
		false,
		true,
	],
};
const wallroad: SimpleTile = {
	images: [wallroadImage],
	weight: 1,
	symmetry: 'I',
	connections: [
		WALL,
		ROAD,
		WALL,
		ROAD,
	],
	avoidSelf: [
		true,
		true,
		true,
		true,
	],
};

export default () => simpleTiledModel({
	width: 7,
	height: 7,
	tiles: {
		bridge,
		ground,
		river,
		riverturn,
		road,
		roadturn,
		t,
		tower,
		wall,
		wallriver,
		wallroad,
	},
});
