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
        })
        .state('backend.newOrder', {
            url: '/newOrder',
            views: {
                'container@': {
                    controller: 'OrderController',
                    templateUrl: '/backend/views/newOrder.html'
                }
            }
        })
        .state('backend.newOrder.contact', {
            url: '/contact',
            templateUrl: '/backend/views/newOrder-contact.html'
        })
        .state('backend.newOrder.handers', {
            url: '/handers',
            templateUrl: '/backend/views/newOrder-handers.html'
        })
        .state('backend.newOrder.payment', {
            url: '/payment',
            templateUrl: '/backend/views/newOrder-payment.html'
        });
});
