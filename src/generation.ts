import { LoadedTiles } from './LoadedTiles';
import { OutputGrid } from './ui';


const buttons: Record<string, (grid: OutputGrid) => void> = {
	play: (grid) => grid.play(),
	pause: (grid) => grid.pause(),
	step: (grid) => grid.step(),
	reset: (grid) => grid.reset(),
};

export default function generation() {
	const output = document.querySelector<HTMLFormElement>('#output-canvas-container')!;
	const buttonContainer = document.querySelector<HTMLFormElement>('#generation-buttons')!;
	const generateStatus = document.querySelector<HTMLOutputElement>('#generateStatus')!;
	const generateProgress = document.querySelector<HTMLOutputElement>('#generateProgress')!;
	const outputGrid = new OutputGrid();
	output.appendChild(outputGrid);

	for (const [key, value] of Object.entries(buttons)) {
		const button = document.createElement('button');
		button.type = 'button';
		button.innerText = key;
		button.addEventListener('click', () => value(outputGrid));
		buttonContainer.appendChild(button);
	}
	function updateGenerateStatus() {
		generateStatus.value = outputGrid.isPlaying() ? 'Generating' : 'idle';
	}
	outputGrid.on('playing', updateGenerateStatus);
	function updateProgress() {
		generateProgress.value = `${outputGrid.getProgress()  }/${  outputGrid.getTotal()}`;
	}
	outputGrid.on('progress', updateProgress);
	outputGrid.on('total', updateProgress);
	return {
		setTiles(tile: LoadedTiles) {
			outputGrid.setTiles(tile);
		},
		setSize(x: number, y: number) {
			outputGrid.setSize(x, y);
		},
	};
}
