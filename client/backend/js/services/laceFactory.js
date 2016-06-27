angular.module('backend.factory.lace', ['common.factory']).factory('LaceFactory', function(ApiFactory) {
    var factory = {};

    factory.getAll = function() {
        return ApiFactory.callApi('/api/backend/lace/getAll', {}, true);
    };

    factory.submit = function(laceColors, isNewRecord) {

        if (isNewRecord) return ApiFactory.callApi('/api/backend/lace/create', laceColors, true);
        else return ApiFactory.callApi('/api/backend/lace/update', laceColors, true);
    };

    return factory;
});
