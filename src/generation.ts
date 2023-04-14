import { EdgeMode } from './algorithm';
import { LoadedTiles } from './LoadedTiles';
import { OutputGrid } from './ui';

export default function generation() {
	const outputGrid = new OutputGrid();

	const output = document.querySelector<HTMLFormElement>('#output-canvas-container')!;
	const generateProgress = document.querySelector<HTMLOutputElement>('#generateProgress')!;
	const play = document.querySelector<HTMLOutputElement>('#generation-buttons__play')!;
	const step = document.querySelector<HTMLOutputElement>('#generation-buttons__step')!;
	const reset = document.querySelector<HTMLOutputElement>('#generation-buttons__reset')!;
	const regenerate = document.querySelector<HTMLOutputElement>('#generation-buttons__regenerate')!;

	play.addEventListener('click', () => outputGrid.play());
	step.addEventListener('click', () => outputGrid.step());
	reset.addEventListener('click', () => outputGrid.reset());
	regenerate.addEventListener('click', () => { outputGrid.reset(); outputGrid.play(); });

	function updateGenerateStatus() {
		play.value = outputGrid.isPlaying() ? 'pause' : 'play';
	}
	outputGrid.on('playing', updateGenerateStatus);
	function updateProgress() {
		generateProgress.value = `${outputGrid.getProgress()}/${outputGrid.getTotal()}`;
	}
	outputGrid.on('progress', updateProgress);
	outputGrid.on('total', updateProgress);
	output.appendChild(outputGrid);
	return {
		setTiles(tile: LoadedTiles) {
			outputGrid.setTiles(tile);
		},
		setSize(x: number, y: number) {
			outputGrid.setSize(x, y);
		},
		setSeed(seed: string) {
			outputGrid.setSeed(seed);
		},
		setHorizontalMode(mode: EdgeMode) {
			outputGrid.setHorizontalMode(mode);
		},
		setVerticalMode(mode: EdgeMode) {
			outputGrid.setVerticalMode(mode);
		},
	};
}
