const fs = require('fs');
const jsesc = require('jsesc');
const createChunk = require('../create-chunk.js');

const saveBuffer = ({ fileName, buffer }) => {
	const hex = buffer.toString('hex').toUpperCase();
	const contents = `module.exports = Buffer.from(${ jsesc(hex, {
		wrap: true,
	}) }, 'hex');\n`;
	fs.writeFileSync(`./chunks/${ fileName }.js`, contents);
};

const saveChunk = ({ chunkName, fileName, buffer }) => {
	const chunk = createChunk(chunkName, buffer);
	saveBuffer({
		buffer: chunk,
		fileName: fileName,
	});
};

module.exports = {
	saveBuffer,
	saveChunk,
};
