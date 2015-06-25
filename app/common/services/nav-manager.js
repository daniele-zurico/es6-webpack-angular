import EventListener from 'event-listener';

/**
 * Represents a navigation state
 */
/* @ngInject */
export class NavItem {
    constructor(label, path, root) {
        this.label = label;
        this.path = path;
        this.root = root;
        this._children = [];
        this.currentRoute = undefined;
    }

    /**
     * The children of this navigation item.
     *
     * @returns {Array<NavItem>}
     */
    get children() {
        return this._children;
    }

    /**
     * Adds a child to this nav item
     *
     * @param {string} label Label to display
     * @param {string} path Path to navigate to
     * @returns {NavItem} Self
     */
    sub(label, path, root) {
        let entry = new NavItem(label, path, root);
        this.children.push(entry);

        return this;
    }
}

/**
 * Provides utilities for managing navigation state and remembering parameters.
 */
export default class NavManagerService extends EventListener {
    /**
     * Sets up default paramater values
     *
     * @param {Object} $rootScope
     * @param {Storage} Storage
     */
    constructor($rootScope, Storage) {
        super();

        /** @private **/
        this.storage = Storage;
        /** @private **/
        this._mainNav = [];
        /** @private **/
        this.params = {};
        /** @private **/
        this._mainNavVisible = false;
        /** @private **/
        this._subNavVisible = false;
        /** @private **/
        this._enabled = true;
        /** @private **/
        this.$rootScope = $rootScope;
    }

    /**
     * Sets the logged in status on the root scope.
     *
     * @param {boolean} value True/False logged in state
     */
    set isLoggedIn(value) {
        this.$rootScope.isLoggedIn = value;
    }

    /**
     * Returns the current logged in state.
     *
     * @returns {boolean}
     */
    get isLoggedIn() {
        return this.$rootScope.isLoggedIn;
    }

    /**
     * Shows or hides the main navigation.
     *
     * @param {boolean} value
     */
    set mainNavVisible(value) {
        this._mainNavVisible = value;
    }

    /**
     * Returns the state of the main navigation
     *
     * @returns {boolean}
     */
    get mainNavVisible() {
        return this._mainNavVisible;
    }

    /**
     * Shows or hides the sub navigation
     *
     * @param {boolean} value
     */
    set subNavVisible(value) {
        this._subNavVisible = value;
    }

    /**
     * Returns the state of the sub navigation.
     *
     * @returns {boolean}
     */
    get subNavVisible() {
        return this._subNavVisible;
    }

    /**
     * Set to true to enable navigation.
     *
     * @param {boolean} value
     */
    set enabled(value) {
        this._enabled = value;
    }

    /**
     * Returns true if navigation is enabled.
     *
     * @returns {boolean}
     */
    get enabled() {
        return this._enabled;
    }

    /**
     * @returns {Array<NavItem>} Main navigation data
     */
    get mainNav() {
        return this._mainNav;
    }

    /**
     * Updates the last parameters for the given state
     *
     * @param {string} state State to update
     * @param {Object} params New parameters
     */
    updateParams(state, params) {
        this.params[state] = params;
    }

    /**
     * @param {Object} state State to get current parameters for
     * @returns {Object} Parameters
     */
    getParams(state) {
        return this.params[state];
    }

    /**
     * Registers a main navigation entry
     *
     * @param label Label to display
     * @param path Path to navigate to
     * @param root The root path this entry belongs to (top level parent)
     */
    registerMain(label, path, root) {
        let entry = new NavItem(label, path, root);
        this.mainNav.push(entry);

        return entry;
    }

    /**
     * Clears the main navigation array
     */
    clearMain() {
        this._mainNav.length = 0;
    }

    /**
     * Use this to capture parameters that you want to persist
     * across the entire site. You can use the Storage service
     * to persist them.
     *
     * @param {string} toState State that was requested
     * @param {Object} toParams The parameters of the requested state
     */
    captureDefaultParameters(toState, toParams) {

    }
}

module.exports = NavManagerService;