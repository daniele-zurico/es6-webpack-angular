/**
 * Configures routes for the wrapper.
 */
export default class RouteConfig {
    /**
     * Sets up the routes.
     *
     * @param $stateProvider Current state provider
     * @param $urlRouterProvider Url route provider
     * @param $stickyStateProvider Stick state provider
     */
    constructor($stateProvider, $urlRouterProvider, $stickyStateProvider) {
        // Enable to turn on state debugging
        //$stickyStateProvider.enableDebug(true);

        // The default path if an incorrect path is supplied by the user
        $urlRouterProvider.otherwise('/dashboard');

        // The root / path resolver & template loader
        // this uses named views so the templates can be switched out easily
        $stateProvider.state('top', {
            url: '/',
            sticky: true, // Stops controllers reloading on navigation
            deepStateRedirect: true,
            abstract: true, // Makes the view non navigable, will default to /dashboard
            views: {
                'layout@': {
                    template: require('./../tpl/content-layout.html')
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
                    NavManager.registerMain('Dashboard', 'top.dashboard', 'top')
                        .sub('Module 1', 'top.dashboard', 'top');
                }
            }
        });
    }
}

module.exports = RouteConfig;