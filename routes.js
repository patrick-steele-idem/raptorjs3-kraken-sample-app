module.exports = function(app) {
    app.get('/test', require('./src/ui-pages/index'));
};
