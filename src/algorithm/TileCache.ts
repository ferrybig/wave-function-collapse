import { Tile } from '../Tile';
import { memoize } from '../utils';

const reverse = memoize((connector: string) => {
	return connector.length > 1 ? connector.split('').reverse().join('') : connector;
}, {
	key: (i) => i,
});

export class TileCache {
	public readonly maxWeight: number;
	constructor(
		public readonly validOptions: Tile[],
	) {
		this.maxWeight = validOptions.reduce((a, c) => a + c.weight, 0);
	}

	public readonly getTileConnections = memoize((top: Tile[], right: Tile[], bottom: Tile[], left: Tile[]) =>
		this.validOptions.filter(tile =>
			top.find(topTile =>
				tile.connections[0] === reverse(topTile.connections[2]) &&
				(!tile.avoidSelfConnection || tile.baseName !== topTile.baseName),
			) &&
			right.find(rightTile =>
				tile.connections[1] === reverse(rightTile.connections[3]) &&
				(!tile.avoidSelfConnection || tile.baseName !== rightTile.baseName),
			) &&
			bottom.find(bottomTile =>
				tile.connections[2] === reverse(bottomTile.connections[0]) &&
				(!tile.avoidSelfConnection || tile.baseName !== bottomTile.baseName),
			) &&
			left.find(leftTile =>
				tile.connections[3] === reverse(leftTile.connections[1]) &&
				(!tile.avoidSelfConnection || tile.baseName !== leftTile.baseName),
			),
		)
	, {
		key: (...sides) => sides.map(e => `[${e.map(t => t.id).join(',')}]`).join(','),
	});
}
