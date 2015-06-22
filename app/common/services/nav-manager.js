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

    get children() {
        return this._children;
    }

    /**
     * Adds a child to this nav item
     *
     * @param label Label to display
     * @param path Path to navigate to
     * @returns {NavItem} This
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
    constructor($rootScope, Storage) {
        super();
        super.info('Loaded');

        this.storage = Storage;
        this._mainNav = [];
        this.params = {};
        this._mainNavVisible = false;
        this._subNavVisible = false;
        this._enabled = true;

        this.$rootScope = $rootScope;
    }

    set showSetupWizard(value) {
        this.$rootScope.showSetupWizard = value;
    }

    get showSetupWizard() {
        return this.$rootScope.showSetupWizard;
    }

    set isLoggedIn(value) {
        this.$rootScope.isLoggedIn = value;
    }

    get isLoggedIn() {
        return this.$rootScope.isLoggedIn;
    }

    set mainNavVisible(value) {
        this._mainNavVisible = value;
    }

    get mainNavVisible() {
        return this._mainNavVisible;
    }

    set subNavVisible(value) {
        this._subNavVisible = value;
    }

    get subNavVisible() {
        return this._subNavVisible;
    }

    get enabled() {
        return this._enabled;
    }

    set enabled(value) {
        this._enabled = value;
    }

    /**
     * @returns {Array} Main navigation data
     */
    get mainNav() {
        return this._mainNav;
    }

    /**
     * Updates the last parameters for the given state
     *
     * @param state State to update
     * @param params New parameters
     */
    updateParams(state, params) {
        this.params[state] = params;
    }

    /**
     * @param state State to get current parameters for
     * @returns {*} Parameters
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
     * In order to prevent the wizard popping up when using a url
     * and it's the first time a user has opened the app we capture
     * the supported params and store them to prevent the wizard from appearing.
     *
     * @param toState State that was requested
     * @param toParams The parameters of the requested state
     */
    captureDefaultParameters(toState, toParams) {
        if(toParams) {
            let did, pid, pageId;

            if (this.storage.get('portal')) {
                pid = this.storage.get('portal');
            } else {
                pid = -1;
            }

            if (this.storage.get('domain')) {
                did = this.storage.get('domain');
            } else {
                did = -1;
            }

            if (this.storage.get('portal_' + pid)) {
                pageId = this.storage.get('portal_' + pid);
            } else {
                pageId = -1;
            }

            if(toParams.aid && did === -1) {
                this.storage.save('domain', toParams.aid);
            }

            if(toParams.pid && pid === -1) {
                this.storage.save('portal', toParams.pid);
            }

            if(toParams.page && pageId === -1) {
                this.storage.save('portal_' + toParams.pid, toParams.page);
            }
        }
    }
}

module.exports = NavManagerService;