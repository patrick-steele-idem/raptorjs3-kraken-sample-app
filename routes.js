module.exports = function(app) {
    app.get('/', require('./src/ui-pages/index'));
};
