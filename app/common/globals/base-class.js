/**
 *
 * A base class with some helpers, it's not mandatory but you can use this
 * to share code accross all your classes, things such as tweening etc.
 *
 * @access public
 */
export default class BaseClass {

    constructor() {

    }

    /**
     * Tween Max
     *
     * @returns {TweenMax} Tween Max instance from the window
     * @see http://greensock.com/gsap
     */
    get tween() {
        return window.TweenMax;
    }

    /**
     * Debug log to the console
     *
     * @param {Object} message
     */
    debug(message) {
        console.debug(this.parseMessage(message));
    }

    /**
     * Info log to the console
     *
     * @param {Object} message
     */
    info(message) {
        console.info(this.parseMessage(message));
    }

    /**
     * Warn log to the console
     *
     * @param {Object} message
     */
    warn(message) {
        console.warn(this.parseMessage(message));
    }

    /**
     * Error log to the console
     *
     * @param {Object} message
     */
    error(message) {
        console.error(this.parseMessage(message));
    }

    /**
     * @private
     *
     * @param message
     * @returns {string}
     */
    parseMessage(message) {
        var cName = this.getClassName();
        return '[' + cName + ']: ' + message;
    }

    /**
     * @private
     *
     * @param message
     * @returns {string}
     */
    getClassName() {
        return this.constructor.name;
    }
}

module.exports = BaseClass;