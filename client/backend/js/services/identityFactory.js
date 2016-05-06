angular.module('backend.factory.identity', ['common.factory']).factory('IdentityFactory', function($window, $rootScope, ApiFactory) {
    var factory = {};

    factory.initialize = function() {
        var identity = {'status': false};
        var token = $window.localStorage[TOKEN_NAME];

        if (token) {
            var payload = JSON.parse($window.atob(token.split('.')[1]));

            if (payload.expiration > Date.now() / 1000) identity = {'status': true, 'email': payload.email};
            else factory.logout();
        }

        $rootScope.identity = identity;
    };

    factory.validate = function() {
        return $rootScope.identity.status;
    };

    factory.login = function(user) {
        return ApiFactory.callApi('/api/backend/login', user, false,
            function(response) {
                $window.localStorage[TOKEN_NAME] = response.result.token;
                $rootScope.identity = {'status': true, 'email': user.email};
            },
            function(error) {
                console.log(JSON.stringify(error));
            }
        );
    };

    factory.logout = function(callback) {
        $window.localStorage.removeItem(TOKEN_NAME);
        $rootScope.identity = {'status': false};

        callback();
    };

    return factory;
});
