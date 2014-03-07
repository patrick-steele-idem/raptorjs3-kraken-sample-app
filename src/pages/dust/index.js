var dust = require('dustjs-linkedin');
var templatePath = require.resolve('./template.dust');

module.exports = function(req, res, next) {
    dust.stream(
        templatePath, {
            name: "John"
        }).pipe(res);
    };