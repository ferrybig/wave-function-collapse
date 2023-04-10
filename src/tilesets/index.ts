import { LoadedTiles } from '../LoadedTiles';

const glob = Object.entries(
	import.meta.glob<true, '', Record<string, () => LoadedTiles>>('./*/*.ts', { eager: true }),
).map(([key, value]) => [key.replace(/^.\/([^/]*)\/([^.]*).ts$/, (_g0, g1, g2) => g2 === 'index' ? g1 : `${g1} - ${g2}`), value] as const);


type TileSet = {
	group: string,
	subName: string,
	value: string,
	factory: () => LoadedTiles
};

const tileSets: TileSet[] = glob.flatMap(([name, record]) => Object.entries(record).map(([ subName, factory ]): TileSet => ({
	group: name,
	subName: subName,
	value: `${name  }-${  subName}`,
	factory,
})));

export default tileSets;
