# gltf-statistics

<p align="center">
<a href="https://www.khronos.org/gltf"><img src="doc/gltf.png" /></a>
</p>

JavaScript and Node.js library and command-line tool to display statistics for glTF models.

## Install

TODO

## Command-Line Tool

TODO

## Use with Node.js

TODO

## Use in the browser

Use [browserify](http://browserify.org/) to create a single .js file:

```
npm install -g browserify
browserify index.js > gltf-statistics.js
```
Then include it with a script tag:
```
<script src="gltf-statistics.js"></script>
```

## Run tests

Install [mocha](http://mochajs.org/)
```
npm install -g mocha
```
From the `gltf-statistics` root directory, run
```
mocha
```

## How to build for browser use

Prebuilt `.js` files are in the `build` directory.  These are built with [browserify](http://browserify.org/).  Install it with:
```
npm install -g browserify
```
From the `gltf-statistics` root directory, run
```
npm run build
```

***

Developed by <a href="http://www.agi.com/">AGI</a>, founders of the Cesium WebGL engine.
<p align="center">
<a href="http://cesiumjs.org/"><img src="doc/cesium.png" /></a>
</p>