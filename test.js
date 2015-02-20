"use strict";
var assert = require('assert');
var fs = require('fs');
var gltfDefaults = require('./index').gltfDefaults;
var getAllStatistics = require('./index').getAllStatistics;

var gltf = JSON.parse(fs.readFileSync('SampleData/Cesium_Air.gltf'));
var stats = getAllStatistics(gltfDefaults(gltf));

assert.equal(stats.buffersSizeInBytes, 172256);
assert.equal(stats.numberOfImages, 2);
assert.equal(stats.numberOfExternalRequests, 0);

assert.equal(stats.numberOfDrawCalls, 5);
assert.equal(stats.numberOfRenderedPrimitives, 5984);

assert.equal(stats.numberOfNodes, 7);
assert.equal(stats.numberOfMeshes, 2);
assert.equal(stats.numberOfMaterials, 2);
assert.equal(stats.numberOfAnimations, 2);

console.log('Tests pass');