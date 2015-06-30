/**
 * @author Wael Jammal
 *
 * This is the main entry point for a module,
 * you should declare your modules dependencies here
 * and register your main directive.
 *
 * Importing your dependencies is important and saves
 * time when unit testing, it also makes the module
 * fully independent and reusable.
 */
require('./tpl/login.scss');

import LoginBoxDirective from './directives/login-box';

let moduleName = 'loginBoxModule';

// Make sure your module imports all it's own dependencies
// Remember they will not overlap, and only a single copy
// of the dependency will be compiled no mater how many modules
// you import them in.
require('toaster');
require('ngAnimate');
require('script!TweenMax');
require('../../common');

// Remember to initialize dependencies per module as well
angular.module(moduleName, ['toaster', 'ngAnimate'])

// Declare the modules main directive
.directive('loginBox', () => { return new LoginBoxDirective(); });

module.exports = moduleName;