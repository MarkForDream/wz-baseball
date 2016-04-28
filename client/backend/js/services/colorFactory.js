angular.module('backend.factory.color', ['common.factory', 'backend.factory.identity']).factory('ColorFactory', function(ApiFactory, IdentityFactory) {
    var factory = {};

    factory.getById = function(_id) {
        return ApiFactory.callApi('/api/backend/color/getById', {'token': IdentityFactory.getToken(), '_id': _id});
    }

    factory.getAll = function() {
        return ApiFactory.callApi('/api/backend/color/getAll', {'token': IdentityFactory.getToken()});
    }

    factory.delete = function(_id) {
        return ApiFactory.callApi('/api/backend/color/delete', {'token': IdentityFactory.getToken(), '_id': _id});
    }

    factory.submit = function(color, isNewRecord) {
        color.token = IdentityFactory.getToken();

        if (isNewRecord) return ApiFactory.callApi('/api/backend/color/create', color);
        else return ApiFactory.callApi('/api/backend/color/update', color);
    };

    return factory;
});
