angular.module('backend.login.controller', [])
    .controller('LoginController', function($rootScope, $scope, $state) {
        $scope.loginFormSubmit = function() {
            $scope.loginForm.$setPristine();

            // LoginFactory.login($scope.user)
            //     .then(function(response) {

            //     })
            //     .catch(function(response) {

            //     });
        };
    });
