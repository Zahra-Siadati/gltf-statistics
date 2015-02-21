# gltf-statistics

<p align="center">
<a href="https://www.khronos.org/gltf"><img src="doc/gltf.png" /></a>
</p>

JavaScript and Node.js library and command-line tool to display statistics for glTF models.

## Install

```
npm install gltf-statistics
```

## Command-Line Tool

Use `printGltfStats [path-to-gltf]`.  For example:


```
printGltfStats test/data/Cesium_Air.gltf
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

Loosely speaking, for runtime performance, i.e., fps, `Draw calls` is usually the most important metric (lower is better; a few dozen is great, a few hundred is doable; a 1000+ is bad).  Ideally, `Rendered primitives` will also be low: a few thousand is nothing for todays GPUs; 100,000 should be fine; 1 million+ is doable on good hardware.  If they are being played, `Animations` also impact performance: a dozen is no problem; 100 is not unreasonable (Santa and his reindeer have [120](http://cesiumjs.org/2013/12/23/Building-A-WebGL-Santa-with-Cesium-and-glTF/));  several hundred is a bit much.  Generally, if there are a lot of animations, there are also a lot of `Draw calls`, which also brings down performance.

The number of `Images`, `Nodes`, `Meshes`, and `Materials` impact performance but these are accounted for in the number of `Draw calls`.  The complexity of the materials and size of the images also impact performance, but these are not reported yet.

For downloading size, the `Total size of all buffers` impacts speed (smaller is better) as does the number of `External requests`, which is the number of `uri` references for buffers, images, and shaders, except for data uris which have their contents base64-encoded (however, this requires base64-decode so we can't always assume it is faster).

## Use with Node.js

```
var getAllStatistics = require('gltf-statistics').getAllStatistics;
var gltf = // glTFJSON
var stats = getAllStatistics(gltf); // Returns an object with the statistics
```

We can also get the number of draw calls and rendered primitives for the sub-graph where a given node is the root:
```
var getDrawCallStatistics = require('gltf-statistics').getDrawCallStatistics;
var gltf = // glTFJSON
var stats = getDrawCallStatistics(gltf, 'node-id');
```

## Use in the browser

Include `build/gltf-statistics.js` it with a `script` tag:
```
<script src="gltf-statistics.js"></script>
```

## Running the tests

Install [mocha](http://mochajs.org/)
```
npm install -g mocha
```
From the `gltf-statistics` root directory, run
```
mocha
```

## Building for browser use

A pre-built `.js` file is in the `build` directory.  These are built with [browserify](http://browserify.org/).  Install it with:
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