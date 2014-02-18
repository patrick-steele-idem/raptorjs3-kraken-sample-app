console.log("LOADED CUSTOM MIDDLEWARE");

module.exports = function() {
    return function(req, res, next) {
        console.log('CUSTOM MIDDLEWARE!');
        next();
    };
};