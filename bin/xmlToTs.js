#!/usr/env node
import fs from 'fs';
import { XMLParser } from 'fast-xml-parser';

const parser = new XMLParser({
	ignoreAttributes: false,
	attributeNamePrefix : '@_',
});

const doc = parser.parse(fs.readFileSync(process.argv[2]), 'application/xml');
const tiles = doc.set.tiles.tile;
let generatedCode = '';
generatedCode += 'import { TileInit } from \'../Tile.ts\';\n';
for (const tile of tiles) {
	generatedCode += `import ${tile['@_name']}Image from './${tile['@_name']}.png';\n`;
}
generatedCode += '\n';
for (const tile of tiles) {
	generatedCode += `export const ${tile['@_name']}: SimpleTile = {\n`;
	generatedCode += `\timages: [${tile['@_name']}Image],\n`;
	generatedCode += `\tweight: ${tile['@_weight'] ?? 1},\n`;
	generatedCode += `\tsymmetry: '${tile['@_symmetry'] === '\\' ? '/' : tile['@_symmetry']}',\n`;
	generatedCode += '\tconnections: [,\n';
	generatedCode += '\t\t"xxx",\n';
	generatedCode += '\t\t"xxx",\n';
	generatedCode += '\t\t"xxx",\n';
	generatedCode += '\t\t"xxx",\n';
	generatedCode += '\t],\n';
	generatedCode += '}\n';
}
console.log(generatedCode);
