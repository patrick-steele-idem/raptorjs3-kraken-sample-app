var expressResetter = require('express-resetter');

exports.init = function init(app) {
    var kraken = require('kraken.next');

    var config = {
        onconfig: function (settings, cb) {
            require('raptor-logging')
                .configure(settings.get('raptor-logging'));

            require('raptor-optimizer')
                .configureDefault(settings.get('raptor-optimizer'), __dirname)
                .then(function() {
                        cb(null, settings);
                    })
                .fail(cb);
        }
    };

    expressResetter.resetApp(app, require('express'));
    app.use(kraken(config));
};