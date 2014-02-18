'use strict';

var q = require('q'),
    http = require('http'),
    express = require('express'),
    kraken = require('kraken.next'),
    logger = require('raptor-logging'),
    optimizer = require('raptor-optimizer');


var PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;


var server, register;

server = http.createServer();
server.listen(PORT, function print() {
    var socket = server.address();
    console.log('Listening on %s', typeof socket === 'string' ? socket : String(socket.port));
});

// Create an app and register the request listener with our server.
register = registrar(server, createApp);
register();

// Create the reload promise wrapper
exports.reload = reloader(register);



/**
 * Factory method for creating a kraken-based express application.
 * @returns {*} an express app/request handler
 */
function createApp() {
    var app;
    app = express();
    app.use(kraken({ onconfig: onconfig }));
    return app;
}


/**
 * Default onconfig for kraken applications.
 * @param settings the application config settings
 * @param cb continuation callback: `cb(err, settings)`
 */
function onconfig(settings, cb) {
    logger
        .configure(settings.get('raptor-logging'));

    optimizer
        .configureDefault(settings.get('raptor-optimizer'), __dirname)
        .then(cb.bind(null, null, settings))
        .fail(cb);
}



// XXX: Don't think anything below this line belongs in this file, but separating at this level
//      allows all app configuration to reside in the same file, while the reload stuff clutters it
//      as little as possible.
// XXX: Not in love with hot reloading integration that runs this deep.



/**
 * Creates a load/reload function which updated the current server
 * with a new request handler
 * @param server the http(s)? server to update
 * @param appFactory a factory function responsible for creating the request handler
 * @returns {register} the function to invoke when reloading the app is desired.
 */
function registrar(server, appFactory) {
    var original = function noop() {};

    return function register() {
        var replacement = appFactory();
        server.removeListener('request', original);
        server.addListener('request', replacement);
        return original = replacement;
    };
}


/**
 * Creates a reload handler which wraps app events in a promise implementation.
 * @param update implementation of application updater, returning the new or updated express app.
 * @returns {reload} the function whihc will reload the current application when invoked.
 */
function reloader(update) {
    // Returns just a promise wrapper of express app events.
    return function reload() {
        var deferred, app;
        deferred = q.defer();
        app = update();
        app.once('start', deferred.resolve.bind(deferred));
        app.once('error', deferred.reject.bind(deferred));
        return deferred.promise;
    }
}



