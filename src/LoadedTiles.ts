import { Tile } from './Tile';

export interface LoadedTiles {
	width: number,
	height: number,
	tiles: Tile[]
}

export const EMPTY_TILES: LoadedTiles = {
	width: 0,
	height: 0,
	tiles: [],
};
