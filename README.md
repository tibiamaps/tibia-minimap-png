# `tibia-minimap-png` [![Build status](https://travis-ci.org/tibiamaps/tibia-minimap-png.svg?branch=master)](https://travis-ci.org/tibiamaps/tibia-minimap-png)

Given a buffer with [visual map data](https://tibiamaps.io/guides/map-file-format#visual-map-data) or [pathfinding data](https://tibiamaps.io/guides/map-file-format#pathfinding-data) from a Tibia 10-compatible `*.map` file, `tibia-minimap-png` creates a PNG buffer that is compatible with [Tibia 11’s minimap](https://tibiamaps.io/guides/minimap-file-format).

## Installation

```sh
npm install --save tibia-minimap-png
```

## Usage

```js
const fs = require('fs');

const { wrapColorData, wrapWaypointData } = require('tibia-minimap-png');

const buffer = fs.readFileSync('12612507.map');
const colorData = buffer.slice(0, 0x10000);
const waypointData = buffer.slice(0x10000, 0x20000);

fs.writeFileSync(
  'Minimap_Color_32256_32000_7.png',
  wrapColorData(colorData)
);
fs.writeFileSync(
  'Minimap_WaypointCost_32256_32000_7.png',
  wrapWaypointData(waypointData)
);
```

## Author

| [![twitter/mathias](https://gravatar.com/avatar/24e08a9ea84deb17ae121074d0f17125?s=70)](https://twitter.com/mathias "Follow @mathias on Twitter") |
|---|
| [Mathias Bynens](https://mathiasbynens.be/) |
