angular.module('frontend.factory', ['common.factory'])
		.factory('OrderFactory', function(ApiFactory) {
			var factory = {};

			factory.getOrderSteps = function() {
				return ApiFactory.callApi('/api/frontend/getOrderSteps', null, function(response) {
					console.log("Successfully getOrderSteps");
				}, function(response) {
					console.log("Fail to getOrderSteps");
				});
			};
			return factory;
		});