import Directive from 'directive';

/* @ngInject */
export default class OnFinishRenderDirective extends Directive {
    constructor($timeout) {
        super();

        this.restrict = 'A';
        this.transclude = false;
        this.replace = false;
        this.$timeout = $timeout;
    }

    link(scope, element, attrs) {
        if (scope.$last === true) {
            this.$timeout(() => {

            });
        }
    }
}

module.exports = OnFinishRenderDirective;