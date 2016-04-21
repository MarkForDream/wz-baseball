angular.module('backend.factory', []).factory('LoginFactory', function($q, $http) {
    var factory = {};

    factory.login = function(user) {
        var defer = $q.defer();

        $http.post('/api/backend/login', user)
            .success(function(response) {
                if (response.status) {
                    IdentityFactory.process(response);

                    defer.resolve(response);
                } else {
                    defer.reject(response);
                }
            });

        return defer.promise;
    };

    return factory;
});
