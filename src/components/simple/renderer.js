var raptorTemplates = require('raptor-templates');
var templatePath = require.resolve('./template.rhtml');
var raptorRenderer = require('raptor-renderer');

exports.tag = {
    attributes: {
        name: 'string',
        time: 'expression',
        '*': 'string'
    }
};

exports.render = function(input, context) {
    if (!context) {
        return raptorRenderer.render(exports, input);
    }

    raptorTemplates.render(templatePath, input, context);
};