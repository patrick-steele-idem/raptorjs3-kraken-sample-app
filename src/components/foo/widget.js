function Widget(config) {
    var $el = this.$();

    $el.click(function(event) {
        $el.css('background-color', 'blue');
        event.stopPropagation();
    });
}

Widget.prototype = {

};

module.exports = Widget;