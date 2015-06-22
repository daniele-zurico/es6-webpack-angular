import EventListener from 'event-listener';

/* @ngInject */
export default class ViewportController extends EventListener {
    constructor($rootScope, toaster, User, $scope) {
        super.info('Loaded');

        this.toaster = toaster;
        this.userService = User;
        this.$rootScope = $rootScope;

        $rootScope.isLoggedIn = false;

        $scope.handleLogin = (data) => { this.doLogin(data);}
    }

    /**
     * Sets a cookie.
     *
     * @param cookieName
     * @param cookieValue
     * @param lifespanInDays
     */
    setCookie(cookieName, cookieValue, lifespanInDays) {
        var value;
        if (lifespanInDays === null) {
            lifespanInDays = 1;
        }
        value = cookieName + '=' + encodeURIComponent(cookieValue) + '; max-age=' + 60 * 60 * 24 * lifespanInDays;
        document.cookie = value + '; path=/app/';
        document.cookie = value + '; path=/accounts/';
    }

    /**
     * Handles post login.
     *
     * @param data
     */
    handleLoggedIn(data) {
        this.setCookie('SiteBuilder', data.token);

        this.toaster.pop(
            'success', 'Logged In', 'Welcome ' +
            data.user.firstName + ' ' + data.user.lastName
        );

        this.$rootScope.isLoggedIn = true;
        this.userService.emitLoggedInMsg(data);
    }

    /**
     * Handles login.
     *
     * @param user
     */
    doLogin(user) {
        this.userService.login(user.username, user.password, false)
            .then((data) => this.handleLoggedIn(data))
            .catch((er) => {
                if (er.status === 0) {
                    this.toaster.pop('error', 'Error Logging In', 'Server is offline.');
                } else {
                    this.toaster.pop('error', 'Error Logging In', er.statusText || er.message);
                }
            }
        );
    }
}

module.exports = ViewportController;
