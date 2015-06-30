import Directive from 'directive';

/**
 * Exmaple Module Directive
 */
/* @ngInject */
export default class ExampleModuleDirective extends Directive {
    constructor() {
        super();

        this.template = require('./../tpl/example-module.html');
        this.restrict = 'AE';
        this.transclude = false;
        this.replace = false;
    }

    /**
     * Link Function
     *
     * @param scope Current Scope
     * @param element Element
     * @param attrs Attributes
     */
    link(scope, element, attrs) {
        this.tween.to(element, 0.0, {autoAlpha: 0, delay: 0});
        this.tween.to(element, 0.95, {autoAlpha: 1, delay: 0.5});
    }
}

module.exports = ExampleModuleDirective;