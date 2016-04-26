angular.module('backend.controller.layout', ['backend.factory']).controller('LayoutController', function($rootScope, $scope, $state, toasty, IdentityFactory) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        toasty.clear();
    });

    $scope.logout = function() {
        IdentityFactory.logout(function() {
            $state.go('backend.home');
        });
    };
});
