"use strict";
var defined = require('./defined');
var defaultValue = require('./defaultValue');

exports.getAllStatistics = gltfStatistics;
exports.geDrawCallStats = getDrawCallStats;

function getBuffersSize(buffers) {
    var size = 0;
    for (var name in buffers) {
        if (buffers.hasOwnProperty(name)) {
            size += buffers[name].byteLength;
        }
    }
    return size;
}

var isDataUriRegex = /^data:/;

function getNumberOfExternalRequests(gltf) {
    var name;
    var uri;
    var count = 0;

    var buffers = gltf.buffers;
    for (name in buffers) {
        if (buffers.hasOwnProperty(name)) {
            uri = buffers[name].uri;
            if (defined(uri) && !isDataUriRegex.test(uri)) {
                ++count;
            }
        }
    }

    var images = gltf.images;
    for (name in images) {
        if (images.hasOwnProperty(name)) {
            uri = images[name].uri;
            if (defined(uri) && !isDataUriRegex.test(uri)) {
                ++count;
            }
        }
    }

    var shaders = gltf.shaders;
    for (name in shaders) {
        if (shaders.hasOwnProperty(name)) {
            uri = shaders[name].uri;
            if (defined(uri) && !isDataUriRegex.test(uri)) {
                ++count;
            }
        }
    }

    return count;
}

function getNumberOfProperties(object) {
    var count = 0;
    for (var name in object) {
        if (object.hasOwnProperty(name)) {
            ++count;
        }
    }

    return count;
}

function getDrawCallStats(gltf, nodeId) {
    var numberOfDrawCalls = 0;
    var numberOfRenderedPrimitives = 0;

    var nodes = gltf.nodes;
    var meshes = gltf.meshes;
    var accessors = gltf.accessors;

    var nodeStack = [];

    var n = nodes[nodeId];
    nodeStack.push(n);

    while (nodeStack.length > 0) {
        n = nodeStack.pop();

        var nodeNeshes = defaultValue(n.meshes, defined(n.instanceSkin) ? n.instanceSkin.meshes : undefined);
        if (defined(nodeNeshes)) {
            var meshesLength = nodeNeshes.length;
            for (var j = 0; j < meshesLength; ++j) {
                var primitives = meshes[nodeNeshes[j]].primitives;
                var primitivesLength = primitives.length;
                for (var m = 0; m < primitivesLength; ++m) {
                    var primitive = primitives[m];
                    var indices = primitive.indices;
                    var indicesCount = accessors[indices].count;

                    switch(primitive.primitive) {
                        case 0: // POINTS
                            numberOfRenderedPrimitives += indicesCount;
                            break;
                        case 1: // LINES
                            numberOfRenderedPrimitives += (indicesCount / 2);
                            break;
                        case 2: // LINE_LOOP
                            numberOfRenderedPrimitives += indicesCount;
                            break;
                        case 3: // LINE_STRIP
                            numberOfRenderedPrimitives += Math.max(indicesCount - 1, 0);
                            break;
                        case 4: // TRIANGLES
                            numberOfRenderedPrimitives += (indicesCount / 3);
                            break;
                        case 5: // TRIANGLE_STRIP
                        case 6: // TRIANGLE_FAN
                            numberOfRenderedPrimitives += Math.max(indicesCount - 2, 0);
                            break;
                    };
                }
                numberOfDrawCalls += primitivesLength;
            }
        }

        var children = n.children;
        var childrenLength = children.length;
        for (var k = 0; k < childrenLength; ++k) {
            var child = nodes[children[k]];
            nodeStack.push(child);
        }
    }

    return {
        numberOfDrawCalls : numberOfDrawCalls,
        numberOfRenderedPrimitives : numberOfRenderedPrimitives
    }
}

function getAllDrawCallStats(gltf) {
    var numberOfDrawCalls = 0;
    var numberOfRenderedPrimitives = 0;

    var rootNodes = gltf.scenes[gltf.scene].nodes;
    var rootNodesLength = rootNodes.length;

    for (var i = 0; i < rootNodesLength; ++i) {
        var stats = getDrawCallStats(gltf, rootNodes[i]);
        numberOfDrawCalls += stats.numberOfDrawCalls;
        numberOfRenderedPrimitives += stats.numberOfRenderedPrimitives;
    }

    return {
        numberOfDrawCalls : numberOfDrawCalls,
        numberOfRenderedPrimitives : numberOfRenderedPrimitives
    }
}

function gltfStatistics(gltf) {
    if (!defined(gltf)) {
        return new Error('gltf must be defined');
    }

    var drawStats = getAllDrawCallStats(gltf);

    return {
        buffersSizeInBytes : getBuffersSize(gltf.buffers),
        numberOfImages : getNumberOfProperties(gltf.images),
        numberOfExternalRequests : getNumberOfExternalRequests(gltf),

        numberOfDrawCalls : drawStats.numberOfDrawCalls,
        numberOfRenderedPrimitives : drawStats.numberOfRenderedPrimitives,
        numberOfNodes : getNumberOfProperties(gltf.nodes),
        numberOfMeshes : getNumberOfProperties(gltf.meshes),
        numberOfMaterials : getNumberOfProperties(gltf.materials),
        numberOfAnimations : getNumberOfProperties(gltf.animations)
    };
};