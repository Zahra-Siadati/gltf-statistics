#!/usr/bin/env node
"use strict";
var fs = require('fs');
var path = require('path');
var glob = require('glob');
var argv = require('minimist')(process.argv.slice(2));
var defined = require('../lib/defined');
var gltfDefaults = require('../').gltfDefaults;
var getAllStatistics = require('../').getAllStatistics;

if (!defined(argv._[0]) || defined(argv.h) || defined(argv.help)) {
	var help =
	    'Usage: node ' + path.basename(__filename) + ' [path-to.gltf or directory-with-gltf-files]\n' +
	    '\n' +
	    'Examples:\n' +
	    '  node ' + path.basename(__filename) + ' test/data/Cesium_Air.gltf\n' +
	    '  node ' + path.basename(__filename) + ' test/data/\n' +
	    '\n' +
	    'Description of each statistic:\n' +
	    '\n' +
	    '  Total size of all buffers: Size, in bytes, of all glTF buffers (geometry, keyframes, skins, etc) \n' +
	    '  Images: Number of glTF images\n' +
	    '  External requests: Expected number of requests (non-data uris) for external resources\n' +
	    '\n' +
	    '  Draw calls: Expected number of WebGL draw calls, i.e., number of glTF primitives encountered when\n' +
	    '    traversing the glTF node hierarchy\n' +
	    '  Rendered primitives: Expected number of WebGL primitives (e.g., triangles) used to render the model\n' +
	    '\n' +
	    '  Nodes: Number of glTF nodes\n' +
	    '  Meshes: Number of glTF meshes\n' +
	    '  Materials: Number of glTF materials\n' +
	    '  Animations: Number of glTF animations\n';

    process.stdout.write(help);

    return;
}

function printStats(gltfPath) {
	var gltf = JSON.parse(fs.readFileSync(gltfPath));
	var stats = getAllStatistics(gltfDefaults(gltf));
	var output =
	    '\n' +
		'Key statistics for ' + gltfPath + '\n' +
	    '--------------\n' +
	    'Total size of all buffers: ' + stats.buffersSizeInBytes.toLocaleString() + ' bytes\n' +
	    'Images: ' + stats.numberOfImages.toLocaleString() + '\n' +
	    'External requests (not data uris): ' + stats.numberOfExternalRequests.toLocaleString() + '\n' +
	    '\n' +
	    'Draw calls: ' + stats.numberOfDrawCalls.toLocaleString() + '\n' +
	    'Rendered primitives (e.g., triangles): ' + stats.numberOfRenderedPrimitives.toLocaleString() + '\n' +
	    '\n' +
	    'Nodes: ' + stats.numberOfNodes.toLocaleString() + '\n' +
	    'Meshes: ' + stats.numberOfMeshes.toLocaleString() + '\n' +
	    'Materials: ' + stats.numberOfMaterials.toLocaleString() + '\n' +
	    'Animations: ' + stats.numberOfAnimations.toLocaleString() + '\n';

	process.stdout.write(output);
}

var inputPath = argv._[0];

if (!fs.lstatSync(inputPath).isDirectory()) {
	printStats(inputPath);
} else {
    var matches = glob.sync(path.join(inputPath, '**/*.gltf'));
    var matchesLength = matches.length;
    if (matchesLength === 0) {
        process.stdout.write('Did not recursively find any .gltf files in ' + inputPath);
    }

    for (var i = 0; i < matchesLength; ++i) {
        printStats(matches[i]);
    }
}

process.stdout.write('\nRun with -h for a description of each statistic.');
