/**
 * Helps with boostraping, is currently used to bootstrap both the
 * main entry and the mock entry, you can use add to include extra
 * dependencies.
 *
 * @author Wael Jammal
 * @access public
 */
export default class Bootstrap {
    /**
     * Initializes the dependencies array
     */
    constructor() {
        this.dependencies = [

        ];

        this.add('ngResource');
        this.add('ui.router');
        this.add('ui.bootstrap');
        this.add(require('../services'));
        this.add(require('../../wrapper'));
    }

    /**
     * Add a dependency, you can use require() or just the module name such as ui.router.
     *
     * @param {Object} dependency
     * @returns {Bootstrap} Returns Self
     */
    add(dependency) {
        this.dependencies.push(dependency);
        return this;
    }

    /**
     * Starts the bootstrapping process.
     */
    start() {
        angular.element(document).ready(() => {
            angular.bootstrap(document.body, this.dependencies);
        });
    }
}

module.exports = Bootstrap;