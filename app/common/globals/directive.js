class Directive {
    constructor() {
        this.tween = window.TweenMax;
    }

    compile() {
        return this.link.bind(this);
    }

    link (scope, element, attrs) {
        this.$ = scope;
        this.element = element;
        this.attrs = attrs;

        for (var prop in this) {
            if (typeof this[prop] === 'function' && prop !== 'link') {
                this.$[prop] = this[prop].bind(this);
            }
        }
    }
}

module.exports = Directive;