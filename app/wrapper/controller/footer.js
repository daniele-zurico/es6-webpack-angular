import EventListener from 'event-listener';

/* @ngInject */
export default class FooterController extends EventListener {
    constructor(User, toaster) {
        super();
        super.info('Loaded');

        this.user = User;
        this.toaster = toaster;
    }

    /**
     * @returns boolean if user is logged in
     */
    get isLoggedIn() {
        return this.user.loggedIn;
    }

    logout() {
        this.toaster.pop('error', 'Not Implemented', 'Logout is not currently implemented.');
    }
}

module.exports = FooterController;
