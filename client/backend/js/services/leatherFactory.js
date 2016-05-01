angular.module('backend.factory.leather', ['common.factory']).factory('LeatherFactory', function(ApiFactory) {
    var factory = {};

    factory.getById = function(_id) {
        return ApiFactory.callApi('/api/backend/leather/getById', {'_id': _id}, true);
    };

    factory.getAll = function() {
        return ApiFactory.callApi('/api/backend/leather/getAll', {}, true);
    };

    factory.delete = function(_id) {
        return ApiFactory.callApi('/api/backend/leather/delete', {'_id': _id}, true);
    };

    factory.submit = function(leather, isNewRecord) {

        if (isNewRecord) return ApiFactory.callApi('/api/backend/leather/create', leather, true);
        else return ApiFactory.callApi('/api/backend/leather/update', leather, true);
    };

    return factory;
});
