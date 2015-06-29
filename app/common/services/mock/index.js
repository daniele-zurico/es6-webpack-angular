// Reads in all the mocks
let moduleName = 'mocks';

angular.module(moduleName, []);
require('angular-mocks');

var testsContext = require.context('.', true, /mock.js$/);
testsContext.keys().forEach(testsContext);

module.exports = moduleName;