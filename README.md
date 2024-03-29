# gltf-statistics

<p align="center">
<a href="https://www.khronos.org/gltf"><img src="doc/gltf.png" /></a>
</p>

JavaScript and Node.js library and command-line tool to display statistics for [glTF](https://www.khronos.org/gltf) models.  This is useful for performance analysis.

[![Build Status](https://travis-ci.org/AnalyticalGraphicsInc/gltf-statistics.svg?branch=master)](https://travis-ci.org/AnalyticalGraphicsInc/gltf-statistics)

## Install

Install [Node.js](http://nodejs.org/), then run:
```
npm install gltf-statistics
```

## Command-Line Tool

Run `node ./bin/printGltfStats.js [path-to.gltf or directory-with-gltf-files]`.  For example:


```
node ./bin/printGltfStats.js test/data/Cesium_Air.gltf
```

outputs:

```
Key statistics
--------------
Total size of all buffers: 172,256 bytes
Images: 2
External requests (not data uris): 0

Draw calls: 5
Rendered primitives (e.g., triangles): 5,984

Nodes: 7
Meshes: 2
Materials: 2
Animations: 2

Run with -h for a description of each statistic.
```
It can also recursively search a directory for glTF files and write the stats for each one to a csv file.  For example, run:

```
node ./bin/printGltfStats.js test/data/ -c stats.csv
```

Loosely speaking, for runtime performance, i.e., fps, `Draw calls` is usually the most important metric.  Lower is better: a few dozen is great, a few hundred is doable; a 1,000+ is bad.  Lower is also better for `Rendered primitives`: a few thousand is nothing for today's GPUs; 100,000 should be fine; a million is doable on good hardware.  If they are being played, `Animations` also impact performance: a dozen is no problem; 100 is not unreasonable (Santa and his reindeer have [120](http://cesiumjs.org/2013/12/23/Building-A-WebGL-Santa-with-Cesium-and-glTF/));  several hundred is a bit much.  Generally, if there are a lot of animations, there will also be a lot of `Draw calls`, which also brings down performance.

The number of `Images`, `Nodes`, `Meshes`, and `Materials` impact performance, but these are accounted for in the number of `Draw calls`.  The complexity of the materials and size of the images also impact performance, but these are not reported yet ([#1](https://github.com/AnalyticalGraphicsInc/gltf-statistics/issues/1)).

For downloading size, the `Total size of all buffers` impacts speed (smaller is better) as does the number of `External requests`, which is the number of `uri` references for buffers, images, and shaders, except for data uris which have their contents base64-encoded (however, this requires base64-decode, which can impact performance).

## Use with Node.js

```
var getAllStatistics = require('gltf-statistics').getAllStatistics;
var gltf = // glTFJSON
var stats = getAllStatistics(gltf); // Returns an object with the statistics
```

We can also get the number of draw calls and rendered primitives for a sub-graph where a given node is the root:
```
var getDrawCallStatistics = require('gltf-statistics').getDrawCallStatistics;
var gltf = // glTFJSON
var stats = getDrawCallStatistics(gltf, 'node-id');
```

## Use in the browser

Include `build/gltf-statistics.js` it with a `script` tag:
```
<script src="build/gltf-statistics.js"></script>
<script>
    var stats = gltfStatistics.getAllStatistics(/* ... */);
</script>
```

## Running the tests

The tests use [mocha](http://mochajs.org/).  From the `gltf-statistics` root directory, run
```
npm test
```
We can also run JSHint separately
```
npm run jshint
```

## Building for browser use

A pre-built unminified `.js` file is in the `build` directory.  This is built with [browserify](http://browserify.org/).  Install it with:
```
npm install -g browserify
```
To rebuild, from the `gltf-statistics` root directory, run
```
npm run build
```

***

Developed by <a href="http://www.agi.com/">AGI</a>, founders of the Cesium WebGL engine.
<p align="center">
<a href="http://cesiumjs.org/"><img src="doc/cesium.png" /></a>
</p>
