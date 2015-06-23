/**
 * @author Wael Jammal
 *
 * Bootstraps the application, brings in the glue containers that you
 * want to make available and requires global dependencies.
 *
 * Handles authentication as well.
 */
import RouteConfig from './config/route-config';
import PluginConfig from './config/plugin-config';
import PluginRun from './config/plugin-run';
import RouteValidator from './config/route-validator';
import HeaderDirective from './directives/header';
import FooterDirective from './directives/footer';
import ViewportDirective from './directives/app-wrapper';

let moduleName = 'wrapperModule';

angular.module(moduleName, [
    // These are third party dependencies
    'toaster',
    'ct.ui.router.extras',
    'ui.bootstrap',
    'ngAnimate',

    // These are module dependencies of the wrapper
    require('authentication'),

    // These are the containers you want to enable
    require('../containers/dashboard')
])

// Site Header
.directive('headerView', () => { return new HeaderDirective(); })
// Site Footer
.directive('footerView', () => { return new FooterDirective(); })
// Content view layout
.directive('appWrapper', () => { return new ViewportDirective(); })

// NG Animate classes
.animation('.fade-in-out', partialAnimation)

// Run Phase
.run(PluginRun)
.run(RouteValidator)

// Config Phase
.config(PluginConfig)
.config(RouteConfig);

/**
 * ng-hide animation using tween max instead of CSS, this is much more fluid and performant.
 *
 * @returns {{beforeAddClass: Function, removeClass: Function}}
 */
function partialAnimation() {
    return {
        beforeAddClass: function(element, className, done) {
            if (className !== 'ng-hide') {
                done();
                return;
            }

            window.TweenMax.to(element, 0.65, {autoAlpha: 0, delay: 0.1, onComplete: done});
        },
        removeClass: function(element, className, done) {
            if (className !== 'ng-hide') {
                done();
                return;
            }
            element.css('opacity',0);
            window.TweenMax.to(element, 0.65, {autoAlpha: 1, delay: 0.1, onComplete: done});
        }
    };
}

module.exports = moduleName;