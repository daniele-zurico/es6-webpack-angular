describe('Test User Login Box Directive', function() {
    var element, scope;

    // Module we are testing
    beforeEach(angular.mock.module('loginBoxModule'));

    // Use inject to compile the directive so we can test it
    beforeEach(inject(function($rootScope, $compile) {
        scope = $rootScope.$new();

        element = '<login-box></login-box>';
        element = $compile(element)(scope);

        scope.$digest();
    }));

    // Tests
    it('Login button should be disabled by default', function() {
        let button = $(element.find('#login-button'));
        expect(button.eq(0)).toHaveAttr('disabled', 'disabled');
    });
});