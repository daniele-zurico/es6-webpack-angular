const angular = require('angular');

angular.element(document).ready(function() {
    console.log("READY");
    angular.bootstrap(document.body, [
        require('./common/services'),
        'ngResource',
        'ui.router',
        'ui.bootstrap',
        require('./wrapper')
    ]);
});