angular.module('backend.controller.identity', ['backend.factory.identity']).controller('IdentityController', function($scope, $state, toasty, IdentityFactory) {
    $scope.loginFormSubmit = function() {
        $scope.loginForm.$setPristine();

        IdentityFactory.login($scope.user)
            .then(function(response) {
                $state.go('backend.home');
            })
            .catch(function(response) {
                toasty.error({
                    title: response.result.errorMsg,
                    timeout: false
                });
            });
    };
});
