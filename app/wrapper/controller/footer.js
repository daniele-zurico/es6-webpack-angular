/**
 * The global footer controller for the site.
 */
/* @ngInject */
export default class FooterController {
    constructor(User, toaster, $rootScope) {
        this.user = User;
        this.toaster = toaster;
        this.$rootScope = $rootScope;
    }

    /**
     * @returns boolean if user is logged in
     */
    get isLoggedIn() {
        return this.user.loggedIn;
    }

    /**
     * Logs the user out.
     */
    logout() {
        this.user.logout();
        this.$rootScope.isLoggedIn = false;
        this.toaster.pop('success', 'Logged out', 'Thank you for visiting.');
    }
}

module.exports = FooterController;
