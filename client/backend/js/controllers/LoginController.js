angular.module('backend.controller', ['LoginFactory']).controller('LoginController', function($rootScope, $scope, $state, LoginFactory) {
    $scope.loginFormSubmit = function() {
        $scope.loginForm.$setPristine();

        LoginFactory.login($scope.user)
            .then(function(response) {

            })
            .catch(function(response) {

            });
    };
});
