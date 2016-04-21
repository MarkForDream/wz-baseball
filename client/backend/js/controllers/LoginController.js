angular.module('backend.controller', ['backend.factory']).controller('LoginController', function($rootScope, $scope, $state, LoginFactory) {
    $scope.loginFormSubmit = function() {
        $scope.loginForm.$setPristine();

        LoginFactory.login($scope.user)
            .then(function(response) {

            })
            .catch(function(response) {

            });
    };
});
