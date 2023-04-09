import { SimpleTile } from '../models/simple-tiled-model';

export default Object.entries(
	import.meta.glob<false, '', {
		width: number,
		height: number,
		tiles: Record<string, SimpleTile>,
	}>('./*/*.ts'),
).map(([key, value]) => [key.replace(/^.\/([^/]*)\/([^.]*).ts$/, (g0, g1, g2) => g2 === 'index' ? g1 : `${g1} - ${g2}`), value] as const);
