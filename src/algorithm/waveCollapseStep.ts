import { Grid } from './Grid';
import { RandomSeed } from 'random-seed';
import { Tile } from '../Tile';
import { GridCell } from './GridTile';

export function waveCollapseStep(grid: Grid, random: RandomSeed): GridCell[] {
	const nextInSequenceList = grid.getNextCells();
	if (nextInSequenceList.length === 0) return [];
	const picked = random.intBetween(0, nextInSequenceList.length - 1);
	const nextInSequence = nextInSequenceList[picked];
	if (nextInSequence.validOptions.length === 0) return [];
	let tile: Tile | null;
	switch (nextInSequence.validOptions.length) {
	case 0:
		return [];
	case 1:
		tile = nextInSequence.validOptions[0];
		break;
	default: {
		const value = random.floatBetween(0, nextInSequence.validOptionsWeight);
		let accumulator = 0;
		tile = null;
		for (const t of nextInSequence.validOptions) {
			accumulator += t.weight;
			if (accumulator > value) {
				tile = t;
				break;
			}
		}
		if (!tile) {
			throw new Error('Got null tile??');
		}
	}
	}
	return grid.setTile(nextInSequence, tile);
}
