/**
 * @author Wael Jammal
 *
 * The main entry point for the app.
 */

const angular = require('angular');

angular.element(document).ready(function() {
    angular.bootstrap(document.body, [
        // Global dependencies
        'ngResource',
        'ui.router',
        'ui.bootstrap',
        // Common library
        require('./common'),
        // The container wrapper
        require('./wrapper')
    ]);
});