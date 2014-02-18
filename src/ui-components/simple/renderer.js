var raptorTemplates = require('raptor-templates');
var templatePath = require.resolve('./template.rhtml');

exports.render = function(input, context) {    
    raptorTemplates.render(templatePath, input, context);
};