angular.module('backend.factory.logo', ['common.factory', 'backend.factory.identity']).factory('LogoFactory', function(ApiFactory, IdentityFactory) {
    var factory = {};

    factory.getById = function(_id) {
        return ApiFactory.callApi('/api/backend/logo/getById', {'token': IdentityFactory.getToken(), '_id': _id});
    }

    factory.getAll = function() {
        return ApiFactory.callApi('/api/backend/logo/getAll', {'token': IdentityFactory.getToken()});
    }

    factory.delete = function(_id) {
        return ApiFactory.callApi('/api/backend/logo/delete', {'token': IdentityFactory.getToken(), '_id': _id});
    }

    factory.submit = function(logo, isNewRecord) {
        logo.token = IdentityFactory.getToken();

        if (isNewRecord) return ApiFactory.callApi('/api/backend/logo/create', logo);
        else return ApiFactory.callApi('/api/backend/logo/update', logo);
    };

    return factory;
});
