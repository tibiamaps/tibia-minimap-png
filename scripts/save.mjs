import { createChunk } from '../create-chunk.mjs';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fs = require('fs');
const jsesc = require('jsesc');

export const saveBuffer = ({ fileName, buffer }) => {
	const hex = buffer.toString('hex').toUpperCase();
	const id = fileName.replace(/-/g, '_').toUpperCase();
	const contents = `export const ${ id } = Buffer.from(${ jsesc(hex, {
		wrap: true,
	}) }, 'hex');\n`;
	fs.writeFileSync(`./chunks/${ fileName }.mjs`, contents);
};

export const saveChunk = ({ chunkName, fileName, buffer }) => {
	const chunk = createChunk(chunkName, buffer);
	saveBuffer({
		buffer: chunk,
		fileName: fileName,
	});
};
