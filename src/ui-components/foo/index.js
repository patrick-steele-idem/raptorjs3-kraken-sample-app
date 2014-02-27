var renderFunc = require('./renderer').render;
var raptorRenderer = require('raptor-renderer');

exports.render = function(input) {
    return raptorRenderer.render(renderFunc, input);
};