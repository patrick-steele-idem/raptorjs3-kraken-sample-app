var raptorTemplates = require('raptor-templates');
var templatePath = require.resolve('./template.rhtml');
var raptorRenderer = require('raptor-renderer');

exports.render = function(input, context) {
    if (!context) {
        return raptorRenderer.render(exports, input);
    }

    raptorTemplates.render(
        templatePath,
        {
            message: input.message
        },
        context);
};