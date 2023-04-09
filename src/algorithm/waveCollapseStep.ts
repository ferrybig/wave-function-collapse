import { Grid } from './Grid';
import { RandomSeed } from 'random-seed';
import { Tile } from '../Tile';
import { GridCell } from './GridCell';

export function waveCollapseStep(grid: Grid, random: RandomSeed): GridCell[] {
	const nextInSequenceList = grid.getNextCells();
	if (nextInSequenceList[0] === 0) return [];
	let picked = random.intBetween(0, nextInSequenceList[0] - 1);
	let nextInSequence: GridCell | null = null;
	for (const t of nextInSequenceList[1]) {
		if (picked < t.length) {
			nextInSequence = t[picked];
			break;
		}
		picked -= t.length;
	}
	if (!nextInSequence) {
		throw new Error('Was unable to pick a tile');
	}
	if (nextInSequence.tile) {
		throw new Error('Next already got a tile???');
	}
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
