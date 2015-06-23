/* @ngInject */
export default class RouteConfig {
    constructor($stateProvider, $urlRouterProvider, $stickyStateProvider) {
        // Enable to turn on state debugging
        //$stickyStateProvider.enableDebug(true);

        // The default path if an incorrect path is supplied by the user
        $urlRouterProvider.otherwise('/dashboard');

        // The root / path resolver & template loader
        // this uses named views so the templates can be switched out easily
        $stateProvider.state('top', {
            url: '/',
            sticky: true,
            deepStateRedirect: true,
            views: {
                'layout@': {
                    template: require('./../tpl/content-layout.html'),
                    controller: function ($state, $scope) {
                        $scope.$state = $state;
                    }
                },
                'header@': {
                    template: '<header-view></header-view>'
                },
                'footer@': {
                    template: '<footer-view></footer-view>'
                }
            },
            resolve: {
                // Preload's content for the / part of the navigation route, also enforces authentication.
                preLoad: function(NavManager) {
                    // Setup your navigation paths here.
                    NavManager.registerMain('TOP LEVEL MENU', 'top.dashboard', 'top')
                        .sub('SUB LEVEL MENU', 'top.dashboard', 'top');
                }
            }
        });
    }
}

module.exports = RouteConfig;