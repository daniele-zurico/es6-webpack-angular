import Directive from 'directive';

/* @ngInject */
export default class LoginBoxDirective extends Directive {
    constructor() {
        super();

        this.template = require('./../tpl/login.html');
        this.restrict = 'AE';
        this.transclude = false;
        this.replace = false;
        this.controller = require('../controllers/login-controller');
        this.controllerAs = 'login';
        this.scope = {
            doLogin: '='
        };
    }

    link(scope, element, attrs) {
        this.tween.to(element, 0.0, {autoAlpha: 0, delay: 0});
        this.tween.to(element, 0.95, {autoAlpha: 1, delay: 0.5});
    }
}

module.exports = LoginBoxDirective;