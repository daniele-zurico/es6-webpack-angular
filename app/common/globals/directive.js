import BaseClass from './base-class';

/**
 * The base class for all directives.
 *
 * @access public
 */
export default class Directive extends BaseClass {
    /**
     * Calls base constructor.
     */
    constructor() {
        base();
    }

    /**
     * Binds the link.
     *
     * @returns {function(scope: Object, element: Object, attrs: Object)} Link function
     */
    compile() {
        return this.link.bind(this);
    }

    /**
     * The link entry point for the directive.
     *
     * @param scope
     * @param element
     * @param attrs
     */
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