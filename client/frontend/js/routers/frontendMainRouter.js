angular.module('frontend.router', ['ngAnimate', 'ui.router', 'frontend.controller'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('frontend', {
                url: '',
                abstract: true,
                views: {
                    'header': {
                        controller: 'LayoutController',
                        templateUrl: '/frontend/views/header.html'
                    },
                    'footer': {
                        controller: 'LayoutController',
                        templateUrl: '/frontend/views/footer.html'
                    }
                }
            })
            .state('frontend.home', {
                url: '/',
                views: {
                    'container@': {
                        templateUrl: '/frontend/views/home.html'
                    }
                }
            })
            .state('frontend.newOrder', {
                url: '/newOrder',
                views: {
                    'container@': {
                        controller: 'OrderController',
                        templateUrl: '/frontend/views/newOrder.html'
                    }
                }
            })
            .state('frontend.newOrder.leatherType', {
                url: '/leatherType',
                templateUrl: '/frontend/views/newOrder-leatherType.html'
            })
            .state('frontend.newOrder.logo', {
                url: '/logo',
                templateUrl: '/frontend/views/newOrder-logo.html'
            })
            .state('frontend.newOrder.sportType', {
                url: '/sportType',
                templateUrl: '/frontend/views/newOrder-sportType.html'
            })
            .state('frontend.newOrder.size', {
                url: '/size',
                templateUrl: '/frontend/views/newOrder-size.html'
            })
            .state('frontend.newOrder.shellColor', {
                url: '/shellColor',
                templateUrl: '/frontend/views/newOrder-shellColor.html'
            })
            .state('frontend.newOrder.bindColor', {
                url: '/bindColor',
                templateUrl: '/frontend/views/newOrder-bindColor.html'
            })
            .state('frontend.newOrder.laceColor', {
                url: '/laceColor',
                templateUrl: '/frontend/views/newOrder-laceColor.html'
            })
            .state('frontend.newOrder.stitchingColor', {
                url: '/stitchingColor',
                templateUrl: '/frontend/views/newOrder-stitchingColor.html'
            })
            .state('frontend.newOrder.weltingColor', {
                url: '/weltingColor',
                templateUrl: '/frontend/views/newOrder-weltingColor.html'
            })
            .state('frontend.newOrder.fingerPadOrHood', {
                url: '/fingerPadOrHood',
                templateUrl: '/frontend/views/newOrder-fingerPadOrHood.html'
            })
            .state('frontend.newOrder.lining', {
                url: '/lining',
                templateUrl: '/frontend/views/newOrder-lining.html'
            })
            .state('frontend.newOrder.palmPadding', {
                url: '/palmPadding',
                templateUrl: '/frontend/views/newOrder-palmPadding.html'
            })
            .state('frontend.newOrder.specialRequirement', {
                url: '/specialRequirement',
                templateUrl: '/frontend/views/newOrder-specialRequirement.html'
            })
            .state('frontend.newOrder.webStyle', {
                url: '/webStyle',
                templateUrl: '/frontend/views/newOrder-webStyle.html'
            })
            .state('frontend.newOrder.liningText', {
                url: '/liningText',
                templateUrl: '/frontend/views/newOrder-liningText.html'
            })
            .state('frontend.newOrder.contact', {
                url: '/contact',
                templateUrl: '/frontend/views/newOrder-contact.html'
            })
            .state('frontend.newOrder.handers', {
                url: '/handers',
                templateUrl: '/frontend/views/newOrder-handers.html'
            })
            .state('frontend.newOrder.payment', {
                url: '/payment',
                templateUrl: '/frontend/views/newOrder-payment.html'
            });
    });
