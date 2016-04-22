angular.module('backend.controller', ['backend.factory']).controller('IdentityController', function($rootScope, $scope, $state, IdentityFactory) {
    $scope.loginFormSubmit = function() {
        $scope.loginForm.$setPristine();

        IdentityFactory.login($scope.user)
            .then(function(response) {

            })
            .catch(function(response) {

            });
    };
});
