angular.module('backend.factory', []).factory('LoginFactory', function($q, $http) {
    var factory = {};

    factory.login = function(user) {
        var defer = $q.defer();

        $http.post('/api/backend/login', user)
            .success(function(response) {

            });

        return defer.promise;
    };

    return factory;
});
