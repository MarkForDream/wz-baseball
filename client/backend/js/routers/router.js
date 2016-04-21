angular.module('backend.router', ['ngAnimate', 'ui.router', 'backend.main.controller', 'backend.login.controller']).config(function($stateProvider, $urlRouterProvider) {
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
                    controller: 'LoginController',
                    templateUrl: '/backend/views/login.html'
                }
            }
        });
        
});
