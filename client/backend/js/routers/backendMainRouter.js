angular.module('backend.router', ['ui.router', 'backend.factory', 'backend.controller.layout', 'backend.controller.identity']).config(function($stateProvider, $urlRouterProvider) {
    var validateLogin = function($q, $state, $timeout, IdentityFactory) {
        if (IdentityFactory.validate()) {
            $timeout(function() {
                $state.go('backend.home');
            });

            return $q.reject();
        } else {
            return $q.when();
        }
    }

    var validateLogout = function($q, $state, $timeout, IdentityFactory) {
        if (!IdentityFactory.validate()) {
            $timeout(function() {
                $state.go('backend.home');
            });

            return $q.reject();
        } else {
            return $q.when();
        }
    }

    $stateProvider
        .state('backend', {
            url: '',
            abstract: true,
            views: {
                'header': {
                    controller: 'LayoutController',
                    templateUrl: '/backend/views/header.html'
                },
                'footer': {
                    controller: 'LayoutController',
                    templateUrl: '/backend/views/footer.html'
                }
            },
            resolve: {
                layout: function(IdentityFactory) {
                    IdentityFactory.initialize();
                }
            }
        })
        .state('backend.home', {
            url: '/backend',
            views: {
                'container@': {
                    templateUrl: '/backend/views/home.html'
                }
            }
        })
        .state('backend.login', {
            url: '/backend/login',
            views: {
                'container@': {
                    controller: 'IdentityController',
                    templateUrl: '/backend/views/login.html'
                }
            },
            resolve: {
                login: validateLogin
            }
        });
});
