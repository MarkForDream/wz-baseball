angular.module('common.factory', []).factory('ApiFactory', function($q, $http) {
    var factory = {};

    factory.callApi = function(url, data, okCallback, errorCallback) {
        var defer = $q.defer();

        $http.post(url, data).success(function(response) {
            if (response.status === 'ok') {
                okCallback(response);
                defer.resolve(response);
            } else if (response.status === 'error') {
                errorCallback(response);
                defer.reject(response);
            }
        });

        return defer.promise;
    };

    return factory;
});
