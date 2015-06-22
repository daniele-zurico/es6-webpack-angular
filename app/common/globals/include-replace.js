import Directive from 'directive';

export default class IncludeReplaceDirective extends Directive {
    constructor() {
        super();

        this.restrict = 'AE';
        this.transclude = false;
        this.replace = false;
    }

    link(scope, element, attrs) {
        element.replaceWith(element.children());
    }
}

module.exports = IncludeReplaceDirective;