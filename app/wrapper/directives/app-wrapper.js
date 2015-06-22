import Directive from 'directive';

/* @ngInject */
export default class ViewportDirective extends Directive {
    constructor() {
        super();

        this.template = require('./../tpl/app-wrapper.html');
        this.restrict = 'AE';
        this.transclude = false;
        this.replace = false;
        this.controller = require('../controller/app-wrapper');
        this.controllerAs = 'awc';
    }

    link(scope, element, attrs, ctrl) {

    }
}

module.exports = ViewportDirective;