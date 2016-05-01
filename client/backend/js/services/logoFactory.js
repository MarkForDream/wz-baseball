angular.module('backend.factory.logo', ['common.factory']).factory('LogoFactory', function(ApiFactory) {
    var factory = {};

    factory.getById = function(_id) {
        return ApiFactory.callApi('/api/backend/logo/getById', {'_id': _id}, true);
    };

    factory.getAll = function() {
        return ApiFactory.callApi('/api/backend/logo/getAll', {}, true);
    };

    factory.delete = function(_id) {
        return ApiFactory.callApi('/api/backend/logo/delete', {'_id': _id}, true);
    };

    factory.submit = function(logo, isNewRecord) {

        if (isNewRecord) return ApiFactory.callApi('/api/backend/logo/create', logo, true);
        else return ApiFactory.callApi('/api/backend/logo/update', logo, true);
    };

    return factory;
});
