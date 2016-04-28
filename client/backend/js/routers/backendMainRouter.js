angular.module('backend.router', ['ui.router', 'backend.factory.identity', 'backend.factory.color', 'backend.controller.layout', 'backend.controller.identity', 'backend.controller.color']).config(function($stateProvider, $urlRouterProvider) {
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
        })
        .state('backend.color-index', {
            url: '/backend/color/index',
            views: {
                'container@': {
                    controller: 'ColorIndexController',
                    templateUrl: '/backend/views/color/index.html'
                }
            },
            resolve: {
                logout: validateLogout,
                colors: function(ColorFactory) {
                    return ColorFactory.getAll()
                        .then(function(response) {
                            return response.result.colors;
                        })
                        .catch(function() {
                            return [];
                        });
                }
            }
        })
        .state('backend.color-create', {
            url: '/backend/color/create',
            views: {
                'container@': {
                    controller: 'ColorFormController',
                    templateUrl: '/backend/views/color/form.html'
                }
            },
            resolve: {
                logout: validateLogout,
                isNewRecord: function() {
                    return true;
                },
                color: function() {
                    return {};
                }
            }
        })
        .state('backend.color-update', {
            url: '/backend/color/update/:_id',
            views: {
                'container@': {
                    controller: 'ColorFormController',
                    templateUrl: '/backend/views/color/form.html'
                }
            },
            resolve: {
                logout: validateLogout,
                isNewRecord: function() {
                    return false;
                },
                color: function($stateParams, ColorFactory) {
                    return ColorFactory.getById($stateParams._id)
                        .then(function(response) {
                            return response.result.color;
                        })
                        .catch(function() {
                            return {};
                        });
                }
            }
        });
});
