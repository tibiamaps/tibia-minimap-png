import { saveChunk } from './save.mjs';

// https://www.w3.org/TR/PNG/#11IEND
saveChunk({
	buffer: Buffer.alloc(0),
	chunkName: 'IEND',
	fileName: 'iend',
});
