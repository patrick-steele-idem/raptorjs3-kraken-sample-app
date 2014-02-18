function Widget(widgetConfig) {
    console.log('Initializing widget: ', __filename);
    this.$().click(function() {
        this.setBackgroundColor('red');

        require('./index').render({
            name: 'Client'
        }).appendTo(this.getEl('renderTarget'));

        this.publish('click', {
            widget: this,
            e: this.el
        });
    }.bind(this));
}

Widget.prototype ={
    setBackgroundColor: function(color) {
        this.$().css('background-color', color);
    }
};

module.exports = Widget;