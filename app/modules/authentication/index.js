import LoginBoxDirective from './directives/login-box';

let moduleName = 'loginBoxModule';

// Make sure module imports all it's own dependencies
// Remember they will not overlap, and only a single copy
// of the module will be compiled no mater how many modules
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