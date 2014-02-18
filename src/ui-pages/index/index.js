var meddleware = require('meddleware');
var express = require('express');
var raptorTemplates = require('raptor-templates');
var templatePath = require.resolve('./template.rhtml');

var app = express();

app.use(meddleware(require('./middleware.json')));

app.use(function(req, res, next) {
    var viewData = {
        name: 'John',
        count: 30
    };
    raptorTemplates.stream(templatePath, viewData).pipe(res);
});

module.exports = app;
