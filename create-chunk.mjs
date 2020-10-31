import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const crc32 = require('crc').crc32;

export const createChunk = (type, dataChunk) => {
	// https://www.w3.org/TR/PNG/#5Chunk-layout
	const lengthChunk = Buffer.alloc(4);
	lengthChunk.writeUInt32BE(dataChunk.length, 0);

	console.assert(type.length === 4);
	const typeChunk = Buffer.alloc(4);
	typeChunk.write(type, 0);

	const bodyChunk = Buffer.concat([typeChunk, dataChunk]);

	const crcChunk = Buffer.alloc(4);
	const crc = crc32(bodyChunk);
	crcChunk.writeUInt32BE(crc, 0);

	const chunk = Buffer.concat([lengthChunk, bodyChunk, crcChunk]);
	return chunk;
};
