/**
 * Created by waeljammal on 31/03/15.
 */
export default class UserLoginService {
    constructor(User, $timeout, $q, MsgBus) {
        this.user = User;
        this.$timeout = $timeout;
        this.$q = $q;
        this.bus = MsgBus;
    }

    requireLogin() {
        let d = this.$q.defer();

        // Show the login overlay
        // This route is always reached, even when you only access /
        // it will pause the rest of the paths until the user has logged in.
        if(!this.user.loggedIn) {
            // Wait for the logged in event to be dispatched
            this.bus.onMsg(this.user.USER_LOGGED_IN_EVENT, (user) => {
                // Resolve the / part of the path once the user is logged in
                // We use timeout because it should not resolve before the promise
                // is returned, so we resolve on the next frame.
                this.$timeout(() => {d.resolve(user);});
            });
        } else {
            // User is already logged in.
            // We use timeout because it should not resolve before the promise
            // is returned, so we resolve on the next frame.
            this.$timeout(() => {d.resolve(this.user.user);});
        }

        return d.promise;
    }
}

module.exports = UserLoginService;