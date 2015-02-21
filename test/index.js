"use strict";
var assert = require("assert")
var fs = require('fs');
var gltfDefaults = require('../').gltfDefaults;
var getAllStatistics = require('../').getAllStatistics;

describe('getAllStatistics', function(){
    it('should return stats', function(){
		var gltf = JSON.parse(fs.readFileSync('test/data/Cesium_Air.gltf'));
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
    })

    it('works with skinned model', function(){
		var gltf = JSON.parse(fs.readFileSync('test/data/Cesium_Man.gltf'));
		var stats = getAllStatistics(gltfDefaults(gltf));

		assert.equal(stats.buffersSizeInBytes, 235728);
		assert.equal(stats.numberOfImages, 1);
		assert.equal(stats.numberOfExternalRequests, 0);

		assert.equal(stats.numberOfDrawCalls, 1);
		assert.equal(stats.numberOfRenderedPrimitives, 4672);

		assert.equal(stats.numberOfNodes, 27);
		assert.equal(stats.numberOfMeshes, 1);
		assert.equal(stats.numberOfMaterials, 1);
		assert.equal(stats.numberOfAnimations, 105);
    })
});