angular.module('backend.factory.size', ['common.factory']).factory('SizeFactory', function(ApiFactory) {
    var factory = {};

    factory.getById = function(_id) {
        return ApiFactory.callApi('/api/backend/size/getById', {'_id': _id}, true);
    };

    factory.getAll = function() {
        return ApiFactory.callApi('/api/backend/size/getAll', {}, true);
    };

    factory.delete = function(_id) {
        return ApiFactory.callApi('/api/backend/size/delete', {'_id': _id}, true);
    };

    factory.submit = function(size, isNewRecord) {
        if (isNewRecord) return ApiFactory.callApi('/api/backend/size/create', size, true);
        else return ApiFactory.callApi('/api/backend/size/update', size, true);
    };

    return factory;
});
