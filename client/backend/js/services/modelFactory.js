angular.module('backend.factory.model', ['common.factory']).factory('ModelFactory', function(ApiFactory) {
    var factory = {};

    factory.getById = function(_id) {
        return ApiFactory.callApi('/api/backend/model/getById', {'_id': _id}, true);
    };

    factory.getAll = function() {
        return ApiFactory.callApi('/api/backend/model/getAll', {}, true);
    };

    factory.delete = function(_id) {
        return ApiFactory.callApi('/api/backend/model/delete', {'_id': _id}, true);
    };

    factory.submit = function(model, isNewRecord) {
        if (isNewRecord) return ApiFactory.callApi('/api/backend/model/create', model, true);
        else return ApiFactory.callApi('/api/backend/model/update', model, true);
    };

    return factory;
});
