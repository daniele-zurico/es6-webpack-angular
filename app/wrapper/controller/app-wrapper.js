import EventListener from 'event-listener';

/**
 * The main view port for the app, handles authentication as well.
 */
/* @ngInject */
export default class ViewportController extends EventListener {
    /**
     * Injects dependencies.
     *
     * @param $rootScope Root scope
     * @param toaster Toaster
     * @param {UserService} User User Service
     * @param $scope Scope
     */
    constructor($rootScope, toaster, User, $scope) {
        super.info('Loaded');

        this.toaster = toaster;
        this.userService = User;
        this.$rootScope = $rootScope;

        $rootScope.isLoggedIn = false;

        $scope.handleLogin = (data) => { this.doLogin(data);};
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
    }

    /**
     * Handles post login.
     *
     * @param data
     */
    handleLoggedIn(data) {
        this.setCookie('MySitesCookie', data.token);

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
     * @param {Object} user
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
