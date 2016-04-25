angular.module('frontend.factory', ['common.factory']).factory('OrderFactory', function(ApiFactory) {
    var factory = {};

    factory.getOrderSteps = function() {
        console.log("enter getordersteps");
        return ApiFactory.callApi('/api/frontend/getOrderSteps', null, function(response) {
            console.log("orderFactory getOrdersteps");
        }, function() {
            console.log("error callback");
        });
    };

    return factory;
});
