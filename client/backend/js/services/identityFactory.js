angular.module('backend.factory', ['common.factory']).factory('IdentityFactory', function($window, ApiFactory) {
    var factory = {};

    factory.saveToken = function(token) {
        $window.localStorage['wz-baseball-token'] = token;
    };

    factory.removeToken = function() {
        $window.localStorage.removeItem('wz-baseball-token');
    };

    factory.getToken = function() {
        return $window.localStorage['wz-baseball-token'];
    };

    factory.checkIdentity = function() {
        var token = factory.getToken();

        if (token) {
            var payload = JSON.parse($window.atob(token.split('.')[1]));

            return payload.expiration > Date.now() / 1000;
        } else {
            return false;
        }
    };

    factory.getIdentity = function() {
        if (factory.checkIdentity()) {
            var token = factory.getToken();
            var payload = JSON.parse($window.atob(token.split('.')[1]));

            return payload.email;
        }
    };

    factory.login = function(user) {
        return ApiFactory.callApi('/api/backend/login', user,
            function(response) {
                factory.saveToken(response.token);
            }
        )
    };

    factory.logout = function() {
        factory.removeToken();
    };

    return factory;
});
