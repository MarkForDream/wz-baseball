angular.module('backend.factory', ['common.factory']).factory('IdentityFactory', function($window, $rootScope, ApiFactory) {
    var factory = {};

    factory.getToken = function() {
        return $window.localStorage['wz-baseball-token'];
    };

    factory.saveToken = function(token) {
        $window.localStorage['wz-baseball-token'] = token;
    };

    factory.removeToken = function() {
        $window.localStorage.removeItem('wz-baseball-token');
    };

    factory.initialize = function() {
        var identity = {'status': false};
        var token = factory.getToken();

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
        return ApiFactory.callApi('/api/backend/login', user,
            function(response) {
                factory.saveToken(response.result.token);
                $rootScope.identity = {'status': true, 'email': user.email};
            }
        )
    };

    factory.logout = function(callback) {
        factory.removeToken();
        $rootScope.identity = {'status': false};

        callback();
    };

    return factory;
});
