const fs = require('fs');

const { wrapColorData, wrapWaypointData } = require('../index.js');

const map2png = (from, to) => {
	const buffer = fs.readFileSync(`./tests/fixtures/${ from }.map`);
	const colorData = buffer.slice(0, 0x10000);
	const waypointData = buffer.slice(0x10000, 0x20000);
	fs.writeFileSync(
		`./tests/actual/Minimap_Color_${ to }.png`,
		wrapColorData(colorData)
	);
	fs.writeFileSync(
		`./tests/actual/Minimap_WaypointCost_${ to }.png`,
		wrapWaypointData(waypointData)
	);
};

const map = new Map([
	['12612507', '32256_32000_7'],
	['12612508', '32256_32000_8'],
]);

for (const [from, to] of map) {
	map2png(from, to);
}
