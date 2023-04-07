import { SimpleTile } from '../../models/simple-tiled-model';
import bridgeImage from './bridge.png';
import componentImage from './component.png';
import connectionImage from './connection.png';
import cornerImage from './corner.png';
import substrateImage from './substrate.png';
import tImage from './t.png';
import trackImage from './track.png';
import transitionImage from './transition.png';
// import turnImage from './turn.png';
import viadImage from './viad.png';
import viasImage from './vias.png';
import wireImage from './wire.png';
import skewImage from './skew.png';
import dskewImage from './dskew.png';

export const width = 14;
export const height = 14;

const TRACK = 'STS';
const WIRE = 'SWS';
const COMPONENT = 'CCC';
const COMPONENT_RIGHT = 'SSC';
const COMPONENT_LEFT = 'CSS';
const SUBSTRATE = 'SSS';

export const tiles: Record<string, SimpleTile> = {
	bridge: {
		images: [bridgeImage],
		weight: 1.0,
		symmetry: 'I',
		connections: [
			TRACK,
			WIRE,
			TRACK,
			WIRE,
		],
	},
	component: {
		images: [componentImage],
		weight: 20.0,
		symmetry: 'X',
		connections: [
			COMPONENT,
			COMPONENT,
			COMPONENT,
			COMPONENT,
		],
	},
	connection: {
		images: [connectionImage],
		weight: 10.0,
		symmetry: 'T',
		connections: [
			TRACK,
			COMPONENT_RIGHT,
			COMPONENT,
			COMPONENT_LEFT,
		],
	},
	corner: {
		images: [cornerImage],
		weight: 10.0,
		symmetry: 'L',
		connections: [
			SUBSTRATE,
			SUBSTRATE,
			COMPONENT_RIGHT,
			COMPONENT_LEFT,
		],
		avoidSelf: true,
	},
	substrate: {
		images: [substrateImage],
		weight: 2.0,
		symmetry: 'X',
		connections: [
			SUBSTRATE,
			SUBSTRATE,
			SUBSTRATE,
			SUBSTRATE,
		],
	},
	t: {
		images: [tImage],
		weight: 0.1,
		symmetry: 'T',
		connections: [
			SUBSTRATE,
			TRACK,
			TRACK,
			TRACK,
		],
	},
	track: {
		images: [trackImage],
		weight: 2.0,
		symmetry: 'I',
		connections: [
			TRACK,
			SUBSTRATE,
			TRACK,
			SUBSTRATE,
		],
	},
	transition: {
		images: [transitionImage],
		weight: 0.4,
		symmetry: 'T',
		connections: [
			WIRE,
			SUBSTRATE,
			TRACK,
			SUBSTRATE,
		],
		avoidSelf: true,
	},
	// turn: {
	// 	images: [turnImage],
	// 	weight: 1.0,
	// 	symmetry: 'L',
	// 	connections: [
	// 		TRACK,
	// 		TRACK,
	// 		SUBSTRATE,
	// 		SUBSTRATE,
	// 	],
	// },
	viad: {
		images: [viadImage],
		weight: 0.1,
		symmetry: 'I',
		connections: [
			SUBSTRATE,
			TRACK,
			SUBSTRATE,
			TRACK,
		],
	},
	vias: {
		images: [viasImage],
		weight: 0.3,
		symmetry: 'T',
		connections: [
			TRACK,
			SUBSTRATE,
			SUBSTRATE,
			SUBSTRATE,
		],
	},
	wire: {
		images: [wireImage],
		weight: 0.5,
		symmetry: 'I',
		connections: [
			SUBSTRATE,
			WIRE,
			SUBSTRATE,
			WIRE,
		],
	},
	skew: {
		images: [skewImage],
		weight: 2.0,
		symmetry: 'L',
		connections: [
			TRACK,
			TRACK,
			SUBSTRATE,
			SUBSTRATE,
		],
	},
	dskew: {
		images: [dskewImage],
		weight: 2.0,
		symmetry: '/',
		connections: [
			TRACK,
			TRACK,
			TRACK,
			TRACK,
		],
	},
};
