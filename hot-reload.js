var server = require('./server');
var nodePath = require('path');

module.exports = function(hotReload, config) {
    hotReload.specialReload(nodePath.join(__dirname, 'routes.js'), function(path) {
        hotReload.log('Reloading routes: ' + path);
        delete require.cache[path];
        hotReload.waitFor(server.reload());
    });

    hotReload.on('reload', function() {
        hotReload.waitFor(server.reload());
    });
};