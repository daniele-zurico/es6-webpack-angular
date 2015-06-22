import EventListener from 'event-listener';

/* @ngInject */
export default class DashboardController extends EventListener {
    constructor($scope, $state, Storage) {
        super.info('Loaded');
    }
}

module.exports = DashboardController;