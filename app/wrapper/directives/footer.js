import Directive from 'directive';

/* @ngInject */
export default class FooterDirective extends Directive {
    constructor() {
        super();

        this.template = require('./../tpl/footer.html');
        this.restrict = 'AE';
        this.transclude = false;
        this.replace = false;
        this.controller = require('../controller/footer');
        this.controllerAs = 'fc';
    }

    link(scope, element, attrs) {
        this.tween.to(element, 0.0, {autoAlpha: 0.0, delay: 0.0});
        this.tween.to(element, 1.55, {autoAlpha: 1, delay: 0.0});
    }
}

module.exports = FooterDirective;