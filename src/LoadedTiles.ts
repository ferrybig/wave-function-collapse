import { Tile } from './Tile';

export interface LoadedTiles {
	width: number,
	height: number,
	description: string,
	license: string,
	tiles: Tile[]
}
