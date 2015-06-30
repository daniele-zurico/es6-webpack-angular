/**
 * @author Wael Jammal
 *
 * This is the main entry point for a module,
 * you should declare your modules dependencies here
 * and register your main directive.
 *
 * Importing your dependencies is important and saves
 * time when unit testing, it also makes the module
 * fully independent and reusable.
 */
require('./tpl/example-module.scss');

import ExampleModuleDirective from './directives/example-module';

let moduleName = 'module1Module';

// Remember to initialize dependencies per module as well
angular.module(moduleName, [])

// Declare the modules main directive
.directive('moduleOne', () => { return new ExampleModuleDirective(); });

module.exports = moduleName;