export default class Bootstrap {
    constructor() {
        this.dependencies = [

        ];

        this.add('ngResource');
        this.add('ui.router');
        this.add('ui.bootstrap');
        this.add(require('../services'));
        this.add(require('../../wrapper'));
    }

    add(dependency) {
        this.dependencies.push(dependency);
        return this;
    }

    start() {
        angular.element(document).ready(() => {
            angular.bootstrap(document.body, this.dependencies);
        });
    }
}

module.exports = Bootstrap;