const saveChunk = require('./save.js').saveChunk;

// https://www.w3.org/TR/PNG/#11IHDR
const width = 256;
const height = 256;
const bitDepth = 8;
const colorType = 3;
const compressionType = 0;
const filterType = 0;
const interlaceType = 0;
const buffer = new Buffer(13);
buffer.writeUInt32BE(width, 0);
buffer.writeUInt32BE(height, 4);
buffer.writeUInt8(bitDepth, 8);
buffer.writeUInt8(colorType, 9);
buffer.writeUInt8(compressionType, 10);
buffer.writeUInt8(filterType, 11);
buffer.writeUInt8(interlaceType, 12);

saveChunk({
	buffer: buffer,
	chunkName: 'IHDR',
	fileName: 'ihdr',
});
