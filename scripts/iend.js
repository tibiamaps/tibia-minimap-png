const saveChunk = require('./save.js').saveChunk;

// https://www.w3.org/TR/PNG/#11IEND
saveChunk({
	buffer: Buffer.from([]),
	chunkName: 'IEND',
	fileName: 'iend',
});
