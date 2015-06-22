import Directive from 'directive';

/* @ngInject */
export default class ScrollIfDirective extends Directive {
    constructor() {
        super();

        this.restrict = 'A';
        this.transclude = false;
        this.replace = false;
    }

    link(scope, element, attrs) {

        let getScrollingParent = (element) => {
            element = element.parentElement;
            while (element) {
                if (element.scrollHeight !== element.clientHeight) {
                    return element;
                }
                element = element.parentElement;
            }
            return null;
        };

        scope.$watch(attrs.scrollIf, function(value) {
            if (value) {
                var sp = getScrollingParent(element[0]);
                var topMargin = parseInt(attrs.scrollMarginTop) || 0;
                var bottomMargin = parseInt(attrs.scrollMarginBottom) || 0;
                var elemOffset = element[0].offsetTop;
                var elemHeight = element[0].clientHeight;

                if (elemOffset - topMargin < sp.scrollTop) {
                    sp.scrollTop = elemOffset - topMargin;
                } else if (elemOffset + elemHeight + bottomMargin > sp.scrollTop + sp.clientHeight) {
                    sp.scrollTop = elemOffset + elemHeight + bottomMargin - sp.clientHeight;
                }
            }
        });
    }
}

module.exports = ScrollIfDirective;