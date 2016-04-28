angular.module('frontend.controller', ['frontend.factory'])
	.controller('LayoutController', function($rootScope, $scope) {

	})
	.controller('OrderController', function($state, $timeout, $rootScope, $scope, OrderFactory) {

        OrderFactory.getOrderSteps()
        	.then(function(response) {
                console.log("Got response:" + JSON.stringify(response));
        		// $scope.orderSteps = response.result.orderSteps;
        	})
        	.catch(function(response) {
        		alert("Error: " + JSON.stringify(response.result));
        	});

        $scope.formData = {};

        $scope.processForm = function() {
        	alert(JSON.stringify($scope.formData));
        };

        $scope.nextStep = function(nextPageState) {
            $scope.swapAnimation = "form-view-animation";
            $timeout(function(){$state.go(nextPageState);});


        };

        $scope.previousStep = function(previousPageState) {
            $scope.swapAnimation = "form-view-animation-reverse";

            $timeout(function(){$state.go(previousPageState);});

        };
    });
