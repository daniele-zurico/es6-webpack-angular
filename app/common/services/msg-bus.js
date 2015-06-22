import BaseClass from '../globals/base-class';

/* @ngInject */
export default class MsgBus extends BaseClass {
    constructor($rootScope) {
        super.info('Message Bus Ready');
        this.$rootScope = $rootScope;
    }

    emitMsg(msg, data) {
        data = data || {};
        this.$rootScope.$emit(msg, data);
    }

    onMsg(msg, func, scope) {
        var unbind = this.$rootScope.$on(msg, func);

        if (scope) {
            scope.$on('$destroy', unbind);
        }
    }
}

module.exports = MsgBus;