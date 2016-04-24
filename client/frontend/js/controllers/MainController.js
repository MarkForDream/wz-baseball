angular.module('MainController', ['frontend.factory'])
	.controller('LayoutController', function($rootScope, $scope) {

	})
	.controller('OrderController', function($rootScope, $scope, OrderFactory) {
        
        OrderFactory.getOrderSteps()
        	.then(function(response) {
                console.log("Got response");
        		// $scope.orderSteps = response.result.orderSteps;
        	})
        	.catch(function(response) {
        		alert("Error: " + JSON.stringify(response.result));
        	});

        $scope.formData = {};

        $scope.processForm = function() {
        	alert(JSON.stringify($scope.formData));
        };
    });