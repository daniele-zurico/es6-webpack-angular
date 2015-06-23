// Load the module that is to be tested
require('../index');

// Reads in all the unit tests
var testsContext = require.context('.', true, /spec.js$/);
testsContext.keys().forEach(testsContext);