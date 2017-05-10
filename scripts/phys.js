const saveChunk = require('./save.js').saveChunk;

// pngcheck -v tests/fixtures/Minimap_Color_32256_32000_7.png | grep pHYs
const PIXELS_PER_METER = 3780;
const UNIT_SPECIFIER = 1;

// https://www.w3.org/TR/PNG/#11pHYs
const buffer = Buffer.alloc(9);
buffer.writeUInt32BE(PIXELS_PER_METER, 0);
buffer.writeUInt32BE(PIXELS_PER_METER, 4);
buffer.writeUInt8(UNIT_SPECIFIER, 8);

saveChunk({
	buffer: buffer,
	chunkName: 'pHYs',
	fileName: 'phys',
});
