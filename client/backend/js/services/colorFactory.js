angular.module('backend.factory.color', ['common.factory']).factory('ColorFactory', function(ApiFactory) {
    var factory = {};

    factory.getById = function(_id) {
        return ApiFactory.callApi('/api/backend/color/getById', {'_id': _id}, true);
    };

    factory.getAll = function() {
        return ApiFactory.callApi('/api/backend/color/getAll', {}, true);
    };

    factory.delete = function(_id) {
        return ApiFactory.callApi('/api/backend/color/delete', {'_id': _id}, true);
    };

    factory.submit = function(color, isNewRecord) {
        if (isNewRecord) return ApiFactory.callApi('/api/backend/color/create', color, true);
        else return ApiFactory.callApi('/api/backend/color/update', color, true);
    };

    return factory;
});
