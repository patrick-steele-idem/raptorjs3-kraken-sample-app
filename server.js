'use strict';

var express = require('express');
var kraken = require('kraken.next');
var raptorLogging = require('raptor-logging');
var raptorOptimizer = require('raptor-optimizer');
var raptorDust = require('raptor-dust');
var dust = require('dustjs-linkedin');
var nodePath = require('path');
var fs = require('fs');



var PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;

/**
 * Default onconfig for kraken applications.
 * @param settings the application config settings
 * @param cb continuation callback: `cb(err, settings)`
 */
function onconfig(settings, cb) {
    raptorLogging
        .configure(settings.get('raptor-logging'));

    raptorDust
        .addHelpers(dust, settings.get('raptor-dust'));

    var dustBaseDir = settings.get('raptor-dust').baseDir;

    dust.onLoad = function(path, callback) {
        if (!fs.existsSync(path)) {
            if (!path.endsWith('.dust')) {
                path += '.dust';
            }

            path = nodePath.join(dustBaseDir || process.cwd(), path);
        }

        fs.readFile(path, 'utf-8', callback);
    };

    raptorOptimizer
        .configure(settings.get('raptor-optimizer'), __dirname)
        .then(function ready() {
            cb(null, settings);
        })
        .fail(cb);
}


var app = express();
app.use(kraken({ onconfig: onconfig }));
app.once('start', function() {
    console.log('Server ready');
    if (process.send) {
        process.send('online');
    }
});

app.listen(PORT, function() {
    console.log('Listening on port ' + PORT);
});