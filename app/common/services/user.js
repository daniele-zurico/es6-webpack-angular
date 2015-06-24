import EventListener from 'event-listener';

/**
 * User Services.
 */
/* @ngInject */
export default class UserService extends EventListener {
    constructor($resource, $q, $http, $timeout, MsgBus, Storage) {
        super.info('Loaded');

        super();
        this.$resource = $resource;
        this.$q = $q;
        this._loggedIn = false;
        this.$http = $http;
        this.bus = MsgBus;
        this.storage = Storage;
        this._user = undefined;
        this.$timeout = $timeout;

        this.User = $resource('/user', {},
            { 'login': { method: 'POST', url: '/user/login' } }
        );
    }

    /**
     * Logged in event.
     *
     * @returns {string} userLoggedIn
     * @constructor
     */
    get USER_LOGGED_IN_EVENT() { return 'userLoggedIn'; }

    /**
     * @returns {boolean} true if logged in.
     */
    get loggedIn() {
        return this._loggedIn;
    }

    get user() {
        return this._user;
    }

    logout() {
        this._loggedIn = false;
    }

    /**
     * Calls the /user/login resource.
     *
     * @param username
     * @param password
     * @returns {d.promise|Function}
     */
    login(username, password, emit) {
        var d = this.$q.defer();
        var p = this.User.login({userName: username, userPassword: password}).$promise;

        p.then((user) => {
            d.resolve(user);
            this._loggedIn = true;

            if(emit) {
                this.emitLoggedInMsg(user);
            }

            this._user = user.user;
        });

        return d.promise;
    }

    emitLoggedInMsg(user) {
        this.bus.emitMsg(this.USER_LOGGED_IN_EVENT, user);
    }
}

module.exports = UserService;