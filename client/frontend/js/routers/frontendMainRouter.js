angular.module('frontend.router', ['ngAnimate', 'ui.router', 'MainController'])
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