angular.module('common.factory', []).factory('ApiFactory', function($window, $q, $http) {
    var factory = {};

    factory.callApi = function(url, data, isRequiredAuth, okCallback, errorCallback) {
        if (isRequiredAuth) data.token = $window.localStorage[TOKEN_NAME];

        var defer = $q.defer();

        if (DEBUG_MODE) {
            var dataFromMockedServer = MOCKED_SERVER.takeRequest(url);

            if (okCallback) okCallback(dataFromMockedServer);
            defer.resolve(dataFromMockedServer);
        } else {
            $http.post(url, data).success(function(response) {
                if (response.status === 'ok') {
                    if (okCallback) okCallback(response);
                    defer.resolve(response);
                } else if (response.status === 'error') {
                    if (errorCallback) errorCallback(response);
                    defer.reject(response);
                }
            });
        }

        return defer.promise;
    };

    return factory;
});
