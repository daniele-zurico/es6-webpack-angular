/**
 * @test {ExampleModuleDirective}
 */
describe('Test Module 1 Directive', function() {
    var element, scope;

    // Module we are testing
    beforeEach(angular.mock.module('module1Module'));

    // Use inject to compile the directive so we can test it
    beforeEach(inject(function($rootScope, $compile) {
        scope = $rootScope.$new();

        element = '<login-box></login-box>';
        element = $compile(element)(scope);

        scope.$digest();
    }));

    /**
     * @test {ExampleModuleDirective}
     */
    it('Test Module 1 Here', function() {

    });
});