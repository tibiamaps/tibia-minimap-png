import { createChunk } from './create-chunk.mjs';

import { SIGNATURE } from './chunks/signature.mjs';
import { IHDR } from './chunks/ihdr.mjs';
import { PLTE_COLOR } from './chunks/plte-color.mjs';
import { PLTE_WAYPOINT } from './chunks/plte-waypoint.mjs';
import { PHYS } from './chunks/phys.mjs';
import { IEND } from './chunks/iend.mjs';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const zlib = require('zlib');

const WIDTH = 256;
const HEIGHT = 256;
const transposeBuffer = function(buffer) {
	const result = [];
	for (let xOffset = 0; xOffset < WIDTH; xOffset++) {
		for (let index = xOffset; index < WIDTH * HEIGHT; index += HEIGHT) {
			result.push(buffer[index]);
		}
	}
	return Buffer.from(result);
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

export const wrapColorData = (colorData, options = { overlayGrid: false }) => {
	if (options.overlayGrid) {
		for (let xOffset = 0; xOffset < WIDTH; xOffset++) {
			for (let yOffset = 0; yOffset < HEIGHT; yOffset++) {
				if (xOffset % 2 === 0 && yOffset % 2 === 0) {
					const index = xOffset * WIDTH + yOffset;
					colorData[index] = 0x00;
				}
			}
		}
	}
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

export const wrapWaypointData = (waypointData) => {
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
