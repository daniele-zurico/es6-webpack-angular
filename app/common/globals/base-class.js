/**
 * Created by waeljammal on 01/04/15.
 */

export default class BaseClass {

    constructor() {
        this.tween = window.TweenMax;
    }

    debug(message) {
        console.debug(this.parseMessage(message));
    }

    info(message) {
        console.info(this.parseMessage(message));
    }

    warn(message) {
        console.warn(this.parseMessage(message));
    }

    error(message) {
        console.error(this.parseMessage(message));
    }

    parseMessage(message) {
        var cName = this.getClassName();
        return '[' + cName + ']: ' + message;
    }

    getClassName() {
        return this.constructor.name;
    }
}

module.exports = BaseClass;