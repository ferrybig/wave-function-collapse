#!/usr/bin/env node
import fs from 'fs';
import { XMLParser } from 'fast-xml-parser';

const parser = new XMLParser({
	ignoreAttributes: false,
	attributeNamePrefix : '@_',
});

function symmetryToCount(symmetry) {
	switch (symmetry){
	case 'I':
	case '/':
		return 4;
	case 'F':
		return 8;
	case 'X':
		 return 1;
	case 'L':
	case 'T':
		return 4;
	default:
		throw new Error(`Unknown symmetry: ${  symmetry}`);
	}
}

const doc = parser.parse(fs.readFileSync(process.argv[2]), 'application/xml');
const tiles = doc.set.tiles.tile;
let generatedCode = '';
generatedCode += 'import { SimpleTile } from \'../../models/simple-tiled-model\';\n';
for (const tile of tiles) {
	if (doc.set['@_unique']) {
		const count = symmetryToCount(tile['@_symmetry']);
		for (let i = 0; i < count; i++) {
			generatedCode += `import ${tile['@_name']}${i}Image from './${tile['@_name']} ${i}.png';\n`;
		}
	} else {
		generatedCode += `import ${tile['@_name']}Image from './${tile['@_name']}.png';\n`;
	}
}
generatedCode += '\n';
generatedCode += 'export const width = ;\n';
generatedCode += 'export const height = ;\n';
generatedCode += '\n';
generatedCode += 'export const tiles: Record<string, SimpleTile> = {\n';
for (const tile of tiles) {
	generatedCode += `\t${tile['@_name']}: {\n`;

	if (doc.set['@_unique']) {
		const count = symmetryToCount(tile['@_symmetry']);
		generatedCode += '\t\timages: [\n';
		for (let i = 0; i < count; i++) {
			generatedCode += `\t\t\t${tile['@_name']}${i}Image,\n`;
		}
		generatedCode+= '\t\t],\n';
	} else {
		generatedCode += `\t\timages: [${tile['@_name']}Image],\n`;
	}
	generatedCode += `\t\tweight: ${tile['@_weight'] ?? 1},\n`;
	generatedCode += `\t\tsymmetry: '${tile['@_symmetry'] === '\\' ? '/' : tile['@_symmetry']}',\n`;
	generatedCode += '\t\tconnections: [\n';
	generatedCode += '\t\t\t"xxx",\n';
	generatedCode += '\t\t\t"xxx",\n';
	generatedCode += '\t\t\t"xxx",\n';
	generatedCode += '\t\t\t"xxx",\n';
	generatedCode += '\t\t],\n';
	generatedCode += '\t},\n';
}
generatedCode += '}\n';
console.log(generatedCode);
