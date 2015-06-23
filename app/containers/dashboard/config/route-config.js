/* @ngInject */
export default class RouteConfig {
    constructor($stateProvider) {
        $stateProvider.state('top.dashboard', {
            url: 'dashboard',
            sticky: false,
            deepStateRedirect: true,
            views: {
                'dashboard@top': {
                    template: require('./../tpl/dashboard.html'),
                    controller: require('./../controllers/dashboard-controller'),
                    controllerAs: 'dc'
                }
            },
            resolve: {
                // Set up dashboard entry point
                setupDashboard: function(UserLogin, preLoad) {
                    return UserLogin.requireLogin();
                }
            }
        });
    }
}

module.exports = RouteConfig;