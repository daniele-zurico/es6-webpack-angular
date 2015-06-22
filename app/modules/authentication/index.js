import LoginBoxDirective from './directives/login-box';

let moduleName = 'userModule';

angular.module(moduleName, ['ui.router'])

.directive('loginBox', () => { return new LoginBoxDirective(); });

module.exports = moduleName;