import Directive from 'directive';

/* @ngInject */
export default class HeaderDirective extends Directive {
    constructor() {
        super();

        this.template = require('./../tpl/header.html');
        this.restrict = 'AE';
        this.transclude = false;
        this.replace = false;
        this.controller = require('../controller/header');
        this.controllerAs = 'hc';
    }

    link(scope, element, attrs, ctrl) {

        this.tween.to(element, 0.0, {autoAlpha: 0.0, delay: 0.0});
        this.tween.to(element, 1.55, {autoAlpha: 1, delay: 0.2});

        this.tween.to('#sub-navigation-bar', 0.4, {autoAlpha: 1, delay: 0.2, top: 49});

        this.tween.to('#sub-navigation-bar', 0.1, {autoAlpha: 0.0, delay: 0});
        this.tween.to(element, 0.0, {height: 50, delay: 0.1});
    }
}

module.exports = HeaderDirective;