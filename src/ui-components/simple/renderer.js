var raptorTemplates = require('raptor-templates');
var templatePath = require.resolve('./template.rhtml');

exports.tag = {
    attributes: {
        name: 'string',
        time: 'expression',
        "*": 'string'
    }
};

exports.render = function(input, context) {    
    raptorTemplates.render(templatePath, input, context);
};