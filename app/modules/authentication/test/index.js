require('angular');
require('angular-mocks');

// Load the module
require('../index');


var testsContext = require.context('.', true, /spec.js$/);
testsContext.keys().forEach(testsContext);