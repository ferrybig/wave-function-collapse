import { Tile } from '../Tile';
import { memoize } from '../utils';

const reverse = memoize((connector: string) => {
	return connector.length > 1 ? connector.split('').reverse().join('') : connector;
}, {
	key: (i) => i,
});

function filterTiles(tile: Tile, myConnection: 0 | 1 | 2 | 3, other: Tile[] | 'any' | 'mirror') {
	if (other === 'mirror') {
		return tile.connections[myConnection] === reverse(tile.connections[myConnection]) && !tile.avoidSelfConnection[myConnection];
	}
	if (other === 'any' || other.length === 0) {
		return true;
	}
	const otherConnection =
		myConnection === 0 ? 2 :
		myConnection === 1 ? 3 :
		myConnection === 2 ? 0 :
		1;
	return other.find(topTile =>
		tile.connections[myConnection] === reverse(topTile.connections[otherConnection]) &&
			(!tile.avoidSelfConnection[myConnection] || tile.baseName !== topTile.baseName),
	);
}

export class TileCache {
	public readonly maxWeight: number;
	constructor(
		public readonly validOptions: Tile[],
	) {
		this.maxWeight = validOptions.reduce((a, c) => a + c.weight, 0);
	}

	public readonly getTileConnections = memoize(
		(
			top: Tile[] | 'any' | 'mirror',
			right: Tile[] | 'any' | 'mirror',
			bottom: Tile[] | 'any' | 'mirror',
			left: Tile[] | 'any' | 'mirror',
		): Tile[] | 'any' => {
			const newOptions = this.validOptions.filter(tile =>
				filterTiles(tile, 0, top) &&
				filterTiles(tile, 1, right) &&
				filterTiles(tile, 2, bottom) &&
				filterTiles(tile, 3, left),
			);
			return newOptions.length === this.validOptions.length ? 'any' : newOptions;
		}, {
			key: (...sides) => JSON.stringify(sides),
		},
	);
}
