angular.module('backend.factory.web', ['common.factory']).factory('WebFactory', function(ApiFactory) {
    var factory = {};

    factory.getAll = function() {
        return ApiFactory.callApi('/api/backend/web/getAll', {}, true);
    };

    factory.delete = function(_id) {
        return ApiFactory.callApi('/api/backend/web/delete', {'_id': _id}, true);
    };

    factory.submit = function(web) {
        return ApiFactory.callApi('/api/backend/web/create', web, true);
    };

    return factory;
});
