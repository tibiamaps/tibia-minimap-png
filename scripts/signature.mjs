import { saveBuffer } from './save.mjs';

// https://www.w3.org/TR/PNG/#5PNG-file-signature
const SIGNATURE = Buffer.from('\x89PNG\r\n\x1A\n', 'binary');

saveBuffer({
	fileName: 'signature',
	buffer: SIGNATURE,
});
