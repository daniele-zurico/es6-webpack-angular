/**
 * Configures global plugins for this wrapper in the Run phase
 */
/* @ngInject */
export default class PluginRun {
    constructor(toaster) {
        toaster.options = {
            'closeButton': true,
            'debug': false,
            'newestOnTop': false,
            'progressBar': false,
            'positionClass': 'toast-top-right',
            'preventDuplicates': false,
            'onclick': null,
            'showDuration': '300',
            'hideDuration': '1000',
            'timeOut': '5000',
            'extendedTimeOut': '1000',
            'showEasing': 'swing',
            'hideEasing': 'linear',
            'showMethod': 'fadeIn',
            'hideMethod': 'fadeOut'
        };

        $(function() {
            return $('[data-toggle="tooltip"]').tooltip();
        });

        $(function() {
            return $('[data-toggle="popover"]').popover();
        });
    }
}

module.exports = PluginRun;