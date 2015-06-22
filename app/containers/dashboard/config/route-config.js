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
                // Preload's content for the / part of the navigation route, also enforces authentication.
                checkAuth: function(UserLogin, NavManager) {
                    // Setup your navigation paths here.
                    NavManager.registerMain('TOP LEVEL MENU', 'top.dashboard', 'top')
                        .sub('SUB LEVEL MENU', 'top.dashboard', 'top');

                    return UserLogin.requireLogin();
                }
            }
        });
    }
}

module.exports = RouteConfig;