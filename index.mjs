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

const toScanlines = (data) => {
	// Pre-allocate a 65,792-byte buffer (256 rows * 257 bytes per row).
	// Each 256-pixel row requires a 1-byte PNG filter indicator prefix before compression.
	const scanlines = Buffer.allocUnsafe(HEIGHT * 257);
	for (let y = 0; y < HEIGHT; y++) {
		const offset = y * 257;
		scanlines[offset] = 0x00;
		scanlines.set(data.subarray(y * WIDTH, (y + 1) * WIDTH), offset + 1);
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
