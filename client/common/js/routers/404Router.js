angular.module('404.router', ['ui.router']).config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/404');

    $stateProvider
        .state('404', {
            url: '/404',
            views: {
                'container': {
                    templateUrl: '/common/views/404.html'
                }
            }
        });
});
