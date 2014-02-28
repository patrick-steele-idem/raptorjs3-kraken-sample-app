module.exports = function(app) {
    app.get('/dust', require('./src/ui-pages/dust'));
    app.get('/', require('./src/ui-pages/index'));
};
