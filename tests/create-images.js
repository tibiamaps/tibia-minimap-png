const fs = require('fs');

const { wrapColorData, wrapWaypointData } = require('../index.js');

const buffer = fs.readFileSync('./tests/fixtures/12612507.map');
const colorData = buffer.slice(0, 0x10000);
const waypointData = buffer.slice(0x10000, 0x20000);

fs.writeFileSync('./tests/actual/Minimap_Color_32256_32000_7.png', wrapColorData(colorData));
fs.writeFileSync('./tests/actual/Minimap_WaypointCost_32256_32000_7.png', wrapWaypointData(waypointData));
