var path = require('path');
require('app-module-path').addPath(path.join(__dirname, 'src'));

var express = require('express');

var HTTP_PORT = 8080;

var app = express();

require('./init-app').init(app);

app.listen(HTTP_PORT, function() {
    console.log('Listening on port ' + HTTP_PORT);
});

exports.reload = function() {
    require('./init-app').init(app);
    var q = require('q');
    var deferred = q.defer();
    app.once('start', deferred.resolve.bind(deferred));
    app.once('error', deferred.reject.bind(deferred));
    return deferred.promise;

};