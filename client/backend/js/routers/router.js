angular.module('backend.router', ['ui.router', 'backend.main.controller']).config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/backend');

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
        });
});
