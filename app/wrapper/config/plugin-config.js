/**
 * Configures global plugins for this wrapper in the Configure phase.
 */
/* @ngInject */
export default class PluginConfig {
    constructor(ngClipProvider) {
        let document = window.document;

        // Copy to clipboard plugin
        if(document.domain === 'localhost') {
            ngClipProvider.setPath('../bower_components/zeroclipboard/dist/ZeroClipboard.swf');
        } else {
            ngClipProvider.setPath('bower_components/zeroclipboard/dist/ZeroClipboard.swf');
        }
    }
}

module.exports = PluginConfig;