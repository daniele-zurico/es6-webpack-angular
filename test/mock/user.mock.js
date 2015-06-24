/**
 * Created by waeljammal on 24/06/15.
 */
angular.module('user-mocks', ['ngMockE2E'])
    .run(function($httpBackend) {
        var user = {
            'token' : 'your-token-here',
            'user' : {
                'id': 1,
                'userName': 'admin',
                'firstName': 'admin',
                'lastName': 'admin',
                'password': 'admin'
            }
        };
        console.log('MOCK LOADED');
        $httpBackend.whenPOST('/user/login').respond(200, user);
    });

angular.module('wrapperModule').requires.push('user-mocks');