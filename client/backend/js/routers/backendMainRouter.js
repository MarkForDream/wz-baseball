angular.module('backend.router', ['ui.router', 'backend.factory.identity', 'backend.factory.color', 'backend.factory.leather', 'backend.factory.logo', 'backend.controller.layout', 'backend.controller.identity', 'backend.controller.color', 'backend.controller.logo', 'backend.controller.leather']).config(function($stateProvider, $urlRouterProvider) {
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
        })
        .state('backend.logo-index', {
            url: '/backend/logo/index',
            views: {
                'container@': {
                    controller: 'LogoIndexController',
                    templateUrl: '/backend/views/logo/index.html'
                }
            },
            resolve: {
                logout: validateLogout,
                logos: function(LogoFactory) {
                    return LogoFactory.getAll()
                        .then(function(response) {
                            return response.result.logos;
                        })
                        .catch(function() {
                            return [];
                        });
                }
            }
        })
        .state('backend.logo-create', {
            url: '/backend/logo/create',
            views: {
                'container@': {
                    controller: 'LogoFormController',
                    templateUrl: '/backend/views/logo/create.html'
                }
            },
            resolve: {
                logout: validateLogout,
                isNewRecord: function() {
                    return true;
                },
                logo: function() {
                    return {};
                }
            }
        })
        .state('backend.logo-update', {
            url: '/backend/logo/update/:_id',
            views: {
                'container@': {
                    controller: 'LogoFormController',
                    templateUrl: '/backend/views/logo/update.html'
                }
            },
            resolve: {
                logout: validateLogout,
                isNewRecord: function() {
                    return false;
                },
                logo: function($stateParams, LogoFactory) {
                    return LogoFactory.getById($stateParams._id)
                        .then(function(response) {
                            return response.result.logo;
                        })
                        .catch(function() {
                            return {};
                        });
                }
            }
        })
        .state('backend.leather-index', {
            url: '/backend/leather/index',
            views: {
                'container@': {
                    controller: 'LeatherIndexController',
                    templateUrl: '/backend/views/leather/index.html'
                }
            },
            resolve: {
                logout: validateLogout,
                leathers: function(LeatherFactory) {
                    return LeatherFactory.getAll()
                        .then(function(response) {
                            return response.result.leathers;
                        })
                        .catch(function() {
                            return [];
                        });
                }
            }
        })
        .state('backend.leather-create', {
            url: '/backend/leather/create',
            views: {
                'container@': {
                    controller: 'LeatherFormController',
                    templateUrl: '/backend/views/leather/form.html'
                }
            },
            resolve: {
                logout: validateLogout,
                isNewRecord: function() {
                    return true;
                },
                colors: function(ColorFactory) {
                    return ColorFactory.getAll()
                        .then(function(response) {

                            return response.result.colors;
                        })
                        .catch(function(error) {

                            return [];
                        });

                    return true;
                },
                leather: function() {

                    return {};
                }
            }
        })
        .state('backend.leather-update', {
            url: '/backend/leather/update/:_id',
            views: {
                'container@': {
                    controller: 'LeatherFormController',
                    templateUrl: '/backend/views/leather/form.html'
                }
            },
            resolve: {
                logout: validateLogout,
                isNewRecord: function() {
                    return false;
                },
                colors: function(ColorFactory) {
                    return ColorFactory.getAll()
                        .then(function(response) {

                            return response.result.colors;
                        })
                        .catch(function(error) {

                            return [];
                        });

                    return true;
                },
                leather: function($stateParams, LeatherFactory) {
                    return LeatherFactory.getById($stateParams._id)
                        .then(function(response) {
                            return response.result.leather;
                        })
                        .catch(function() {
                            return {};
                        });
                }
            }
        });
});
