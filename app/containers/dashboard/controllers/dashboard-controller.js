import EventListener from 'event-listener';

/**
 * Dashboard Controller
 */
/* @ngInject */
export default class DashboardController extends EventListener {
    constructor($scope, $state, Storage) {
        super.info('Loaded');
    }
}

module.exports = DashboardController;