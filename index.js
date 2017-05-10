const zlib = require('zlib');

const createChunk = require('./create-chunk.js');

const SIGNATURE = require('./chunks/signature.js');
const IHDR = require('./chunks/ihdr.js');
const PLTE_COLOR = require('./chunks/plte-color.js');
const PLTE_WAYPOINT = require('./chunks/plte-waypoint.js');
const PHYS = require('./chunks/phys.js');
const IEND = require('./chunks/iend.js');

const WIDTH = 256;
const HEIGHT = 256;
const transposeBuffer = function(buffer) {
	const result = [];
	for (let xOffset = 0; xOffset < WIDTH; xOffset++) {
		for (let index = xOffset; index < WIDTH * HEIGHT; index += HEIGHT) {
			result.push(buffer[index]);
		}
	}
	return new Buffer(result);
};

const FILTER_TYPE = Buffer.from([0x00]);
const toScanlines = (data) => {
	let scanlines = Buffer.from([]);
	for (let index = 0; index < data.length; index += WIDTH) {
		const scanline = data.slice(index, index + WIDTH);
		scanlines = Buffer.concat([scanlines, FILTER_TYPE, scanline]);
	}
	return scanlines;
};

const wrapColorData = (colorData) => {
	return Buffer.concat([
		SIGNATURE,
		IHDR,
		PLTE_COLOR,
		PHYS,
		createChunk('IDAT', zlib.deflateSync(
			toScanlines(
				transposeBuffer(colorData)
			)
		)),
		IEND,
	]);
};

const wrapWaypointData = (waypointData) => {
	return Buffer.concat([
		SIGNATURE,
		IHDR,
		PLTE_WAYPOINT,
		PHYS,
		createChunk('IDAT', zlib.deflateSync(
			toScanlines(
				transposeBuffer(waypointData)
			)
		)),
		IEND,
	]);
};

module.exports = {
	wrapColorData,
	wrapWaypointData,
};
