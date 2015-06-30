import RouteConfig from './config/route-config';

let moduleName = 'dashboardModule';

angular.module(moduleName, [
    require('example-module')
])

.config(RouteConfig);

module.exports = moduleName;