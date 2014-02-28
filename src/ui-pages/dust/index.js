var dust = require('dustjs-linkedin');

module.exports = function(req, res, next) {
    dust.stream(
        '/ui-pages/dust/template.dust', {
            name: "John",
            attributes: {}
        }).pipe(res);
    };