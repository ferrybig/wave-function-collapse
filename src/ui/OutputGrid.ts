import { create } from 'random-seed';
import { Grid, GridCell, TileCache, waveCollapseStep } from '../algorithm';
import { LoadedTiles } from '../LoadedTiles';

interface OutputGridEventMap {
	playing: boolean,
	autoStart: boolean,
	progress: number,
	total: number,
}

export class OutputGrid extends HTMLElement {
	#canvas = document.createElement('canvas');
	#ctx = this.#canvas.getContext('2d')!;
	#x = 0;
	#y = 0;
	#tileWidth = 0;
	#tileHeight = 0;
	#cache = new TileCache([]);
	#seed = '';
	#random = create(this.#seed);
	#grid = new Grid(this.#x, this.#y, this.#cache);
	#needsRender: GridCell[] = [];
	#autoPlaySpeed = Number.POSITIVE_INFINITY;
	#autoPlayLastUpdate = Date.now();
	#autoPlayRenderedInSecond = 0;
	#needsReset = false;
	#playing = false;
	#autoPlay = false;
	#scale = 1;
	#translate: [number, number] = [0, 0];
	#idleCallbackId: ReturnType<typeof requestIdleCallback> | null = null;
	#animationId: ReturnType<typeof requestAnimationFrame> | null = null;
	#listeners: Record<keyof OutputGridEventMap, ((this: OutputGrid, value: OutputGridEventMap[keyof OutputGridEventMap]) => void)[]> = {
		autoStart: [],
		playing: [],
		progress: [],
		total: [],
	};
	#progress = 0;

	public connectedCallback() {
		this.classList.add('output-grid');
		this.#canvas.classList.add('output-grid__canvas');
		this.#canvas.width = 0;
		this.appendChild(this.#canvas);
		this.addEventListener('mousedown', () => {
			const mouseMove = (e: MouseEvent)=> {
				this.#translate = [this.#translate[0] + e.movementX, this.#translate[1] + e.movementY];
				this.#updateTransform();
			};
			const mouseUp= () => {
				this.removeEventListener('mousemove', mouseMove);
				this.removeEventListener('mouseup', mouseUp);
			};
			this.addEventListener('mousemove', mouseMove);
			this.addEventListener('mouseup', mouseUp);
		});
		this.addEventListener('wheel', (e) => {
			e.preventDefault();
			const scale = Math.pow(1.001, -e.deltaY);
			this.#scale *= scale;
			const pixelsOffsetFromTheSide = this.getBoundingClientRect();
			const mousePosFromCenter = [
				e.pageX - (pixelsOffsetFromTheSide.left + pixelsOffsetFromTheSide.width / 2),
				e.pageY - (pixelsOffsetFromTheSide.top + pixelsOffsetFromTheSide.height / 2),
			];
			this.#translate = [this.#translate[0] - mousePosFromCenter[0], this.#translate[1] - mousePosFromCenter[1]];
			this.#translate = [this.#translate[0] * scale, this.#translate[1] * scale];
			this.#translate = [this.#translate[0] + mousePosFromCenter[0], this.#translate[1] + mousePosFromCenter[1]];
			this.#updateTransform();
		});
	}
	#updateTransform() {
		this.#canvas.style.transform = `translate(-50%, -50%) translate(${this.#translate[0]}px,${this.#translate[1]}px) scale(${this.#scale})`;
		this.#canvas.style.imageRendering = this.#scale > 1 ? 'pixelated' : '';
	}
	#step() {
		const updates = waveCollapseStep(this.#grid, this.#random);
		this.#needsRender.push(...updates);
		this.#progress += updates.length;
		return updates.length > 0;
	}
	#render() {
		if (this.#needsRender.length === 0) return;
		const notReady: GridCell[] = [];
		this.#ctx.resetTransform();
		this.#ctx.scale(this.#tileWidth, this.#tileHeight);
		this.#ctx.translate(0.5, 0.5);
		for (const cell of this.#needsRender) {
			if (!cell.tile?.isLoaded) {
				notReady.push(cell);
				return;
			}
			this.#ctx.translate(cell.x, cell.y);
			cell.tile.drawImage(this.#ctx);
			this.#ctx.translate(-cell.x, -cell.y);
		}
		this.#needsRender = notReady;
		this.#emit('progress', this.#progress - this.#needsRender.length);
	}
	#idleCallback(deadline: IdleDeadline) {
		this.#idleCallbackId = null;
		const previousNow = this.#autoPlayLastUpdate;
		this.#autoPlayLastUpdate = Date.now();

		this.#autoPlayRenderedInSecond = this.#autoPlayRenderedInSecond - this.#autoPlaySpeed * Math.min(1000, this.#autoPlayLastUpdate - previousNow);
		if (this.#autoPlayRenderedInSecond < 0 || Number.isNaN(this.#autoPlayRenderedInSecond)) this.#autoPlayRenderedInSecond = 0;
		if (this.#autoPlayRenderedInSecond > this.#autoPlaySpeed) this.#autoPlayRenderedInSecond = this.#autoPlaySpeed;
		let didStep = true;
		while (
			this.#autoPlayRenderedInSecond <= this.#autoPlaySpeed &&
			deadline.timeRemaining() > 0 &&
			didStep
		) {
			this.#autoPlayRenderedInSecond++;
			didStep = this.#step();
		}
		if (didStep) {
			this.#scheduleIdleCallback();
		} else {
			console.log('We are done rendering', this.#grid);
		}
	}
	#scheduleIdleCallback() {
		if (this.#idleCallbackId === null) this.#idleCallbackId = requestIdleCallback((deadline) => this.#idleCallback(deadline));
	}
	#animationFrame() {
		this.#animationId = null;
		if (this.#idleCallbackId !== null) {
			this.#scheduleAnimationFrame();
			this.#render();
		} else {
			console.log('canceling renderer, the idlecallback has stopped');
			this.pause();
		}
	}
	#scheduleAnimationFrame() {
		if (this.#animationId === null) this.#animationId = requestAnimationFrame(() => this.#animationFrame());
	}
	public isPlaying() {
		return this.#playing;
	}
	public isAutoPlaying() {
		return this.#autoPlay;
	}
	public step() {
		if (this.#needsReset) this.reset();
		this.#step();
		this.#render();
	}
	public reset() {
		this.#needsReset = false;
		this.#needsRender = [];
		this.#grid = new Grid(this.#x, this.#y, this.#cache);
		this.#canvas.width = this.#x*this.#tileWidth;
		this.#canvas.height = this.#y*this.#tileHeight;
		this.#ctx = this.#canvas.getContext('2d')!;
		this.#ctx.resetTransform();
		this.#ctx.clearRect(0,0,this.#canvas.width,this.#canvas.height);
		this.#autoPlayLastUpdate = Date.now();
		this.#autoPlayRenderedInSecond = 0;
		this.#random = this.#seed ? create(this.#seed) : create();
		this.#progress = 0;
		this.#translate = [0, 0];
		this.#scale = Math.max(1, Math.floor(Math.min(this.offsetWidth / this.#canvas.width, this.offsetHeight / this.#canvas.height)));
		this.#updateTransform();
		this.#emit('progress', this.#progress);
		this.#emit('total', this.#x * this.#y);
		if (this.#playing) {
			this.#scheduleAnimationFrame();
			this.#scheduleIdleCallback();
		}
	}
	public play() {
		if (this.#needsReset) this.reset();
		if (this.#playing) return;
		this.#scheduleAnimationFrame();
		this.#scheduleIdleCallback();
		this.#playing = true;
		this.#emit('playing', this.#playing);
	}
	public pause() {
		if (!this.#playing) return;
		this.#cancelScheduledTasks();
		if (this.#needsRender.length > 0) this.#render();
		this.#playing = false;
		this.#emit('playing', this.#playing);
	}
	#cancelScheduledTasks() {
		if (this.#idleCallbackId) cancelIdleCallback(this.#idleCallbackId);
		if (this.#animationId) cancelAnimationFrame(this.#animationId);
		this.#idleCallbackId = null;
		this.#animationId = null;
	}
	public setSize(x: number, y: number) {
		this.#needsReset ||= this.#x !== x || this.#y !== y;
		this.#x = x;
		this.#y = y;
	}
	public setTiles(tiles: LoadedTiles) {
		if (tiles.tiles !== this.#cache.validOptions) {
			this.#cache = new TileCache(tiles.tiles);
			this.#tileWidth = tiles.width;
			this.#tileHeight = tiles.height;
			this.#needsReset = true;
			Promise.all(tiles.tiles.map(t => t.loadPromise)).then(() => this.#render());
		}
	}
	public setSeed(seed: string) {
		this.#needsReset ||= this.#seed !== seed;
		this.#seed = seed;
	}
	#emit<K extends keyof OutputGridEventMap>(type: K, value: OutputGridEventMap[K]) {
		const subList = this.#listeners[type] as ((this: OutputGrid, ev: unknown) => void)[];
		for (const callback of subList) {
			callback.apply(this, [value]);
		}
	}
	public on<K extends keyof OutputGridEventMap>(type: K, listener: (this: OutputGrid, ev: OutputGridEventMap[K]) => void): () => void {
		const subList = this.#listeners[type] as ((this: OutputGrid, ev: never) => void)[];
		subList.push(listener);
		return () => {
			const index = subList.indexOf(listener);
			if (index >= 0) subList.splice(index, 1);
		};
	}

	public getProgress() {
		return this.#progress;
	}

	public getTotal() {
		return this.#grid.x * this.#grid.y;
	}
}

customElements.define('output-grid', OutputGrid);
