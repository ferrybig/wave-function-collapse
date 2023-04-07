import { SimpleTile } from '../models/simple-tiled-model';

export default Object.entries(
	import.meta.glob<false, '', {
		width: number,
		height: number,
		tiles: Record<string, SimpleTile>,
	}>('./*/index.ts'),
).map(([key, value]) => [key.substring(2, key.length - '/index.ts'.length), value] as const);
