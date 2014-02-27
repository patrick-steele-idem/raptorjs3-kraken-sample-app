var foo = require('../foo');

function Widget(widgetConfig) {
    console.log('Initializing widget: ', __filename);
    this.$().click(function(event) {
        this.setBackgroundColor('red');

        event.stopPropagation();

        foo.render(
            {
                message: 'Rendered by widget ' + this.id
            })
            .appendTo(this.getEl('renderTarget'));

        this.publish('click', {
            widget: this,
            e: this.el
        });
    }.bind(this));
}

Widget.prototype = {
    setBackgroundColor: function(color) {
        this.$().css('background-color', color);
    }
};

module.exports = Widget;