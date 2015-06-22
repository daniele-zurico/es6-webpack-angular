/**
 * This is the main application wrapper, it imports and makes available
 * all the glue containers that you want to enable in this application.
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
    'ngClipboard',
    'ngAnimate',

    // These are module dependencies of the wrapper
    require('authentication'),

    // These are the containers you want to enable, they will
    // each register their own navigation structure
    require('../containers/dashboard')
])

.directive('headerView', () => { return new HeaderDirective(); })
.directive('footerView', () => { return new FooterDirective(); })
.directive('appWrapper', () => { return new ViewportDirective(); })

.run(PluginRun)
.run(RouteValidator)
.animation('.fade-in-out', partialAnimation)
.config(PluginConfig)
.config(RouteConfig);

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