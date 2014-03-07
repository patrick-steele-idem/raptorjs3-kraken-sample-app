module.exports = function(app) {
    app.get('/dust', require('./src/pages/dust'));
    app.get('/', require('./src/pages/index'));
};
