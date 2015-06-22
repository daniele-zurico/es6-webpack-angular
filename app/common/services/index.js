const moduleName = 'services';

angular.module(moduleName, [])

.service('NavManager', require('./nav-manager'))
.service('Storage', require('./storage'))
.service('User', require('./user'))
.service('UserLogin', require('./user-login'))
.service('MsgBus', require('./msg-bus'));

module.exports = moduleName;