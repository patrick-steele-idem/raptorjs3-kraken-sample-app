var raptorRenderer = require('raptor-renderer');
var renderer = require('./renderer');

exports.render = function(input) {
    return raptorRenderer.render(renderer, input);
};