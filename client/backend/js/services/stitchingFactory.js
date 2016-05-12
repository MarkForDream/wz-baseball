angular.module('backend.factory.stitching', ['common.factory']).factory('StitchingFactory', function(ApiFactory) {
    var factory = {};

    factory.getAll = function() {
        return ApiFactory.callApi('/api/backend/stitching/getAll', {}, true);
    };

    factory.submit = function(stitchingColors, isNewRecord) {

        if (isNewRecord) return ApiFactory.callApi('/api/backend/stitching/create', stitchingColors, true);
        else return ApiFactory.callApi('/api/backend/stitching/update', stitchingColors, true);
    };

    return factory;
});
