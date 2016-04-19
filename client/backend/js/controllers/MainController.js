angular.module('backend.main.controller', [])
    .controller('LayoutController', function($rootScope, $scope) {

    })
    .controller('OrderController', function($rootScope, $scope) {
        $scope.formData = {};
        $scope.processForm = function() {
        	alert(JSON.stringify($scope.formData));
        };
    });

