(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.gltfStatistics = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
module.exports = {
	getAllStatistics : require('./lib/gltfStatistics').getAllStatistics,
	getDrawCallStatistics : require('./lib/gltfStatistics').getDrawCallStatistics,
	gltfDefaults : require('./lib/gltfDefaults')
};
},{"./lib/gltfDefaults":4,"./lib/gltfStatistics":5}],2:[function(require,module,exports){
"use strict";
var defined = require('./defined');

module.exports = defaultValue;

function defaultValue(a, b) {
    if (defined(a)) {
        return a;
    }
    return b;
}
},{"./defined":3}],3:[function(require,module,exports){
"use strict";

module.exports = defined;

function defined(value) {
    return (value !== undefined) && (value !== null);
}
},{}],4:[function(require,module,exports){
"use strict";
var defined = require('./defined');
var defaultValue = require('./defaultValue');

module.exports = gltfDefaults;

function accessorDefaults(gltf) {
    if (!defined(gltf.accessors)) {
        gltf.accessors = {};
    }
    var accessors = gltf.accessors;

    for (var name in accessors) {
        if (accessors.hasOwnProperty(name)) {
            var accessor = accessors[name];
            accessor.byteStride = defaultValue(accessor.byteStride, 0);
        }
    }
}

function animationDefaults(gltf) {
    if (!defined(gltf.animations)) {
        gltf.animations = {};
    }
    var animations = gltf.animations;

    for (var name in animations) {
        if (animations.hasOwnProperty(name)) {
            var animation = animations[name];

            if (!defined(animation.channels)) {
                animation.channels = [];
            }

            if (!defined(animation.parameters)) {
                animation.parameters = {};
            }

            if (!defined(animation.samplers)) {
                animation.samplers = {};
            }

            var samplers = animations.samplers;

            for (var samplerName in samplers) {
                if (samplers.hasOwnProperty(samplerName)) {
                    var sampler = samplers[samplerName];
                    sampler.interpolation = defaultValue(sampler.interpolation, 'LINEAR');
                }
            }
        }
    }
}

function assetDefaults(gltf) {
    if (!defined(gltf.asset)) {
        gltf.asset = {};
    }
    var asset = gltf.asset;

    // Backwards compatibility for glTF 0.8. profile was a string.
    if (!defined(asset.profile) || (typeof asset.profile === 'string')) {
        asset.profile = {};
    }
    var profile = asset.profile;

    asset.premultipliedAlpha = defaultValue(gltf.asset.premultipliedAlpha, false);
    profile.api = defaultValue(profile.api, 'WebGL');
    profile.version = defaultValue(profile.version, '1.0.2');
    asset.version = defaultValue(gltf.version, '0.9');
}

function bufferDefaults(gltf) {
    if (!defined(gltf.buffers)) {
        gltf.buffers = {};
    }
    var buffers = gltf.buffers;

    for (var name in buffers) {
        if (buffers.hasOwnProperty(name)) {
            var buffer = buffers[name];
            buffer.type = defaultValue(buffer.type, 'arraybuffer');
        }
    }
}

function bufferViewDefaults(gltf) {
    if (!defined(gltf.bufferViews)) {
        gltf.bufferViews = {};
    }
}

function cameraDefaults(gltf) {
    if (!defined(gltf.cameras)) {
        gltf.cameras = {};
    }
}

function imageDefaults(gltf) {
    if (!defined(gltf.images)) {
        gltf.images = {};
    }
}

function lightDefaults(gltf) {
    if (!defined(gltf.lights)) {
        gltf.lights = {};
    }
    var lights = gltf.lights;

    for (var name in lights) {
        if (lights.hasOwnProperty(name)) {
            var light = lights[name];
            if (light.type === 'ambient') {
                if (!defined(light.ambient)) {
                    light.ambient = {};
                }
                var ambientLight = light.ambient;

                if (!defined(ambientLight.color)) {
                    ambientLight.color = [1.0, 1.0, 1.0];
                }
            } else if (light.type === 'directional') {
                if (!defined(light.directional)) {
                    light.directional = {};
                }
                var directionalLight = light.directional;

                if (!defined(directionalLight.color)) {
                    directionalLight.color = [1.0, 1.0, 1.0];
                }
            } else if (light.type === 'point') {
                if (!defined(light.point)) {
                    light.point = {};
                }
                var pointLight = light.point;

                if (!defined(pointLight.color)) {
                    pointLight.color = [1.0, 1.0, 1.0];
                }

                pointLight.constantAttenuation = defaultValue(pointLight.constantAttenuation, 1.0);
                pointLight.linearAttenuation = defaultValue(pointLight.linearAttenuation, 0.0);
                pointLight.quadraticAttenuation = defaultValue(pointLight.quadraticAttenuation, 0.0);
            } else if (light.type === 'spot') {
                if (!defined(light.spot)) {
                    light.spot = {};
                }
                var spotLight = light.spot;

                if (!defined(spotLight.color)) {
                    spotLight.color = [1.0, 1.0, 1.0];
                }

                spotLight.constantAttenuation = defaultValue(spotLight.constantAttenuation, 1.0);
                spotLight.fallOffAngle = defaultValue(spotLight.fallOffAngle, 3.14159265);
                spotLight.fallOffExponent = defaultValue(spotLight.fallOffExponent, 0.0);
                spotLight.linearAttenuation = defaultValue(spotLight.linearAttenuation, 0.0);
                spotLight.quadraticAttenuation = defaultValue(spotLight.quadraticAttenuation, 0.0);
            }
        }
    }
}

function materialDefaults(gltf) {
    if (!defined(gltf.materials)) {
        gltf.materials = {};
    }
    var materials = gltf.materials;

    for (var name in materials) {
        if (materials.hasOwnProperty(name)) {
            var instanceTechnique = materials[name].instanceTechnique;
            if (!defined(instanceTechnique.values)) {
                instanceTechnique.values = {};
            }
        }
    }
}

function meshDefaults(gltf) {
    if (!defined(gltf.meshes)) {
        gltf.meshes = {};
    }
    var meshes = gltf.meshes;

    for (var name in meshes) {
        if (meshes.hasOwnProperty(name)) {
            var mesh = meshes[name];

            if (!defined(mesh.primitives)) {
                mesh.primitives = [];
            }

            var primitives = mesh.primitives.length;
            var length = primitives.length;
            for (var i = 0; i < length; ++i) {
                var primitive = primitives[i];

                if (!defined(primitive.attributes)) {
                    primitive.attributes = {};
                }

                // Backwards compatibility for glTF 0.8. primitive was renamed to mode.
                var defaultMode = defaultValue(primitive.primitive, 4); // WebGLRenderingContext.TRIANGLES

                primitive.mode = defaultValue(primitive.mode, defaultMode);
            }
        }
    }
}

function nodeDefaults(gltf) {
    if (!defined(gltf.nodes)) {
        gltf.nodes = {};
    }
    var nodes = gltf.nodes;

    for (var name in nodes) {
        if (nodes.hasOwnProperty(name)) {
            var node = nodes[name];

            if (!defined(node.children)) {
                node.children = [];
            }

            if (!defined(node.matrix)) {
                // Add default identity matrix if there is no matrix property and no TRS properties
                if (!(defined(node.translation) && defined(node.rotation) && defined(node.scale))) {
                    node.matrix = [
                        1.0, 0.0, 0.0, 0.0,
                        0.0, 1.0, 0.0, 0.0,
                        0.0, 0.0, 1.0, 0.0,
                        0.0, 0.0, 0.0, 1.0
                    ];
                } else {
                    if (!defined(node.translation)) {
                        node.translation = [0.0, 0.0, 0.0];
                    }

                    if (!defined(node.rotation)) {
                        // GLTF_SPEC: What is the default?  https://github.com/KhronosGroup/glTF/issues/197
                        node.rotation = [1.0, 0.0, 0.0, 0.0];
                    }

                    if (!defined(node.scale)) {
                        node.scale = [1.0, 1.0, 1.0];
                    }
                }
            }
        }
    }
}

function programDefaults(gltf) {
    if (!defined(gltf.programs)) {
        gltf.programs = {};
    }
    var programs = gltf.programs;

    for (var name in programs) {
        if (programs.hasOwnProperty(name)) {
            var program = programs[name];
            if (!defined(program.attributes)) {
                program.attributes = [];
            }
        }
    }
}

function samplerDefaults(gltf) {
    if (!defined(gltf.samplers)) {
        gltf.samplers = {};
    }
    var samplers = gltf.samplers;

    for (var name in samplers) {
        if (samplers.hasOwnProperty(name)) {
            var sampler = samplers[name];
            sampler.magFilter = defaultValue(sampler.magFilter, 9729); // WebGLRenderingContext.LINEAR)
            sampler.minFilter = defaultValue(sampler.minFilter, 9986); // WebGLRenderingContext.NEAREST_MIPMAP_LINEAR
            sampler.wrapS = defaultValue(sampler.wrapS, 10497); // WebGLRenderingContext.REPEAT
            sampler.wrapT = defaultValue(sampler.wrapT, 10497);
        }
    }
}

function sceneDefaults(gltf) {
    if (!defined(gltf.scenes)) {
        gltf.scenes = {};
    }
    var scenes = gltf.scenes;

    for (var name in scenes) {
        if (scenes.hasOwnProperty(name)) {
            var scene = scenes[name];
            if (!defined(scene.node)) {
                scene.node = [];
            }
        }
    }
}

function shaderDefaults(gltf) {
    if (!defined(gltf.shaders)) {
        gltf.shaders = {};
    }
}

function skinDefaults(gltf) {
    if (!defined(gltf.skins)) {
        gltf.skins = {};
    }
    var skins = gltf.skins;

    for (var name in skins) {
        if (skins.hasOwnProperty(name)) {
            var skin = skins[name];
            if (defined(skin.bindShapeMatrix)) {
                skin.bindShapeMatrix = [
                    1.0, 0.0, 0.0, 0.0,
                    0.0, 1.0, 0.0, 0.0,
                    0.0, 0.0, 1.0, 0.0,
                    0.0, 0.0, 0.0, 1.0
                ];
            }
        }
    }
}

function statesDefaults(states) {
    if (!defined(states.enable)) {
        states.enable = [];
    }

    if (!defined(states.disable)) {
        states.disable = [];
    }
}

function techniqueDefaults(gltf) {
    if (!defined(gltf.techniques)) {
        gltf.techniques = {};
    }
    var techniques = gltf.techniques;

    for (var name in techniques) {
        if (techniques.hasOwnProperty(name)) {
            var technique = techniques[name];
            if (!defined(technique.parameters)) {
                technique.parameters = {};
            }

            var passes = technique.passes;
            for (var passName in passes) {
                if (passes.hasOwnProperty(passName)) {
                    var pass = passes[passName];
                    var instanceProgram = pass.instanceProgram;

                    if (!defined(instanceProgram.attributes)) {
                        instanceProgram.attributes = {};
                    }

                    if (!defined(instanceProgram.uniforms)) {
                        instanceProgram.uniforms = {};
                    }

                    if (!defined(pass.states)) {
                        pass.states = {};
                    }
                    statesDefaults(pass.states);
                }
            }
        }
    }
}

function textureDefaults(gltf) {
    if (!defined(gltf.textures)) {
        gltf.textures = {};
    }
    var textures = gltf.textures;

    for (var name in textures) {
        if (textures.hasOwnProperty(name)) {
            var texture = textures[name];
            texture.format = defaultValue(texture.format, 6408); // WebGLRenderingContext.RGBA
            texture.internalFormat = defaultValue(texture.internalFormat, texture.format);
            texture.target = defaultValue(texture.target, 3553); // WebGLRenderingContext.TEXTURE_2D
            texture.type = defaultValue(texture.type, 5121); // WebGLRenderingContext.UNSIGNED_BYTE
        }
    }
}

/**
 * Modifies gltf in place.
 */
function gltfDefaults(gltf) {
    if (!defined(gltf)) {
        return undefined;
    }

    if (!defined(gltf.allExtensions)) {
        gltf.allExtensions = [];
    }
    accessorDefaults(gltf);
    animationDefaults(gltf);
    assetDefaults(gltf);
    bufferDefaults(gltf);
    bufferViewDefaults(gltf);
    cameraDefaults(gltf);
    imageDefaults(gltf);
    lightDefaults(gltf);
    materialDefaults(gltf);
    meshDefaults(gltf);
    nodeDefaults(gltf);
    programDefaults(gltf);
    samplerDefaults(gltf);
    sceneDefaults(gltf);
    shaderDefaults(gltf);
    skinDefaults(gltf);
    techniqueDefaults(gltf);
    textureDefaults(gltf);

    return gltf;
}
},{"./defaultValue":2,"./defined":3}],5:[function(require,module,exports){
"use strict";
var defined = require('./defined');
var defaultValue = require('./defaultValue');

exports.getAllStatistics = gltfStatistics;
exports.getDrawCallStatistics = getDrawCallStatistics;

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

function getDrawCallStatistics(gltf, nodeId) {
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
                    }
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
    };
}

function getAllDrawCallStats(gltf) {
    var numberOfDrawCalls = 0;
    var numberOfRenderedPrimitives = 0;

    var rootNodes = gltf.scenes[gltf.scene].nodes;
    var rootNodesLength = rootNodes.length;

    for (var i = 0; i < rootNodesLength; ++i) {
        var stats = getDrawCallStatistics(gltf, rootNodes[i]);
        numberOfDrawCalls += stats.numberOfDrawCalls;
        numberOfRenderedPrimitives += stats.numberOfRenderedPrimitives;
    }

    return {
        numberOfDrawCalls : numberOfDrawCalls,
        numberOfRenderedPrimitives : numberOfRenderedPrimitives
    };
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
}
},{"./defaultValue":2,"./defined":3}]},{},[1])(1)
});