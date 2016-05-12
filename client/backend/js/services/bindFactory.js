angular.module('backend.factory.bind', ['common.factory']).factory('BindFactory', function(ApiFactory) {
    var factory = {};

    factory.getAll = function() {
        return ApiFactory.callApi('/api/backend/bind/getAll', {}, true);
    };

    factory.submit = function(bindColors, isNewRecord) {

        if (isNewRecord) return ApiFactory.callApi('/api/backend/bind/create', bindColors, true);
        else return ApiFactory.callApi('/api/backend/bind/update', bindColors, true);
    };

    return factory;
});
