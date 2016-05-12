angular.module('backend.router', ['ui.router', 'backend.factory.identity', 'backend.factory.color', 'backend.factory.logo', 'backend.factory.leather', 'backend.factory.model', 'backend.factory.size', 'backend.factory.web', 'backend.factory.bind', 'backend.factory.stitching', 'backend.controller.layout', 'backend.controller.identity', 'backend.controller.color', 'backend.controller.logo', 'backend.controller.leather', 'backend.controller.model', 'backend.controller.size', 'backend.controller.web', 'backend.controller.bind', 'backend.controller.stitching']).config(function($stateProvider, $urlRouterProvider) {
    var validateLogin = function($q, $state, $timeout, IdentityFactory) {
        if (IdentityFactory.validate()) {
            $timeout(function() {
                $state.go('backend.home');
            });

            return $q.reject();
        } else {
            return $q.when();
        }
    };

    var validateLogout = function($q, $state, $timeout, IdentityFactory) {
        if (!IdentityFactory.validate()) {
            $timeout(function() {
                $state.go('backend.home');
            });

            return $q.reject();
        } else {
            return $q.when();
        }
    };

    var getColors = function(ColorFactory) {
        return ColorFactory.getAll()
            .then(function(response) {
                return response.result.colors;
            })
            .catch(function(error) {
                return [];
            });
    };

    var getModels = function(ModelFactory) {
        return ModelFactory.getAll()
            .then(function(response) {
                return response.result.models;
            })
            .catch(function(error) {
                return [];
            });
    };

    var getWebs = function(WebFactory) {
        return WebFactory.getAll()
            .then(function(response) {
                return response.result.webs;
            })
            .catch(function() {
                return [];
            });
    };

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
                leather: function() {
                    return {};
                },
                colors: getColors
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
                leather: function($stateParams, LeatherFactory) {
                    return LeatherFactory.getById($stateParams._id)
                        .then(function(response) {
                            return response.result.leather;
                        })
                        .catch(function() {
                            return {};
                        });
                },
                colors: getColors
            }
        })
        .state('backend.model-index', {
            url: '/backend/model/index',
            views: {
                'container@': {
                    controller: 'ModelIndexController',
                    templateUrl: '/backend/views/model/index.html'
                }
            },
            resolve: {
                logout: validateLogout,
                models: function(ModelFactory) {
                    return ModelFactory.getAll()
                        .then(function(response) {
                            return response.result.models;
                        })
                        .catch(function() {
                            return [];
                        });
                }
            }
        })
        .state('backend.model-create', {
            url: '/backend/model/create',
            views: {
                'container@': {
                    controller: 'ModelFormController',
                    templateUrl: '/backend/views/model/create.html'
                }
            },
            resolve: {
                logout: validateLogout,
                isNewRecord: function() {
                    return true;
                },
                model: function() {
                    return {};
                },
                colors: getColors
            }
        })
        .state('backend.model-update', {
            url: '/backend/model/update/:_id',
            views: {
                'container@': {
                    controller: 'ModelFormController',
                    templateUrl: '/backend/views/model/update.html'
                }
            },
            resolve: {
                logout: validateLogout,
                isNewRecord: function() {
                    return false;
                },
                model: function($stateParams, ModelFactory) {
                    return ModelFactory.getById($stateParams._id)
                        .then(function(response) {
                            return response.result.model;
                        })
                        .catch(function() {
                            return {};
                        });
                },
                colors: getColors
            }
        })
        .state('backend.size-index', {
            url: '/backend/size/index',
            views: {
                'container@': {
                    controller: 'SizeIndexController',
                    templateUrl: '/backend/views/size/index.html'
                }
            },
            resolve: {
                logout: validateLogout,
                sizesObject: function(SizeFactory) {
                    return SizeFactory.getAll()
                        .then(function(response) {
                            return response.result.sizes;
                        })
                        .catch(function() {
                            return [];
                        });
                }
            }
        })
        .state('backend.size-create', {
            url: '/backend/size/create',
            views: {
                'container@': {
                    controller: 'SizeFormController',
                    templateUrl: '/backend/views/size/form.html'
                }
            },
            resolve: {
                logout: validateLogout,
                isNewRecord: function() {
                    return true;
                },
                sizeObject: function() {
                    return {};
                },
                modelsObject: getModels
            }
        })
        .state('backend.size-update', {
            url: '/backend/size/update/:_id',
            views: {
                'container@': {
                    controller: 'SizeFormController',
                    templateUrl: '/backend/views/size/form.html'
                }
            },
            resolve: {
                logout: validateLogout,
                isNewRecord: function() {
                    return false;
                },
                sizeObject: function($stateParams, SizeFactory) {
                    return SizeFactory.getById($stateParams._id)
                        .then(function(response) {
                            return response.result.size;
                        })
                        .catch(function() {
                            return {};
                        });
                },
                modelsObject: getModels
            }
        })
        .state('backend.web-index', {
            url: '/backend/web/index',
            views: {
                'container@': {
                    controller: 'WebIndexController',
                    templateUrl: '/backend/views/web/index.html'
                }
            },
            resolve: {
                logout: validateLogout,
                webs: getWebs
            }
        })
        .state('backend.web-priority', {
            url: '/backend/web/priority',
            views: {
                'container@': {
                    controller: 'WebPriorityController',
                    templateUrl: '/backend/views/web/priority.html'
                }
            },
            resolve: {
                logout: validateLogout,
                webs: getWebs
            }
        })
        .state('backend.web-create', {
            url: '/backend/web/create',
            views: {
                'container@': {
                    controller: 'WebFormController',
                    templateUrl: '/backend/views/web/form.html'
                }
            },
            resolve: {
                logout: validateLogout
            }
        })
        .state('backend.bind-index', {
            url: '/backend/bind/index',
            views: {
                'container@': {
                    controller: 'BindIndexController',
                    templateUrl: '/backend/views/bind/index.html'
                }
            },
            resolve: {
                logout: validateLogout,
                bindColors: function(BindFactory) {
                    return BindFactory.getAll()
                        .then(function(response) {
                            if (response.result.bindColors) return response.result.bindColors.bind_colors;
                            else return [];
                        })
                        .catch(function() {
                            return [];
                        });
                }
            }
        })
        .state('backend.bind-create', {
            url: '/backend/bind/create',
            views: {
                'container@': {
                    controller: 'BindFormController',
                    templateUrl: '/backend/views/bind/form.html'
                }
            },
            resolve: {
                logout: validateLogout,
                bindColors: function(BindFactory) {
                    return BindFactory.getAll()
                        .then(function(response) {
                            if (response.result.bindColors) return response.result.bindColors;
                            else return [];
                        })
                        .catch(function() {
                            return [];
                        });
                },
                colors: getColors
            }
        })
        .state('backend.stitching-index', {
            url: '/backend/stitching/index',
            views: {
                'container@': {
                    controller: 'StitchingIndexController',
                    templateUrl: '/backend/views/stitching/index.html'
                }
            },
            resolve: {
                logout: validateLogout,
                stitchingColors: function(StitchingFactory) {
                    return StitchingFactory.getAll()
                        .then(function(response) {
                            if (response.result.stitchingColors) return response.result.stitchingColors.stitching_colors;
                            else return [];
                        })
                        .catch(function() {
                            return [];
                        });
                }
            }
        })
        .state('backend.stitching-create', {
            url: '/backend/stitching/create',
            views: {
                'container@': {
                    controller: 'StitchingFormController',
                    templateUrl: '/backend/views/stitching/form.html'
                }
            },
            resolve: {
                logout: validateLogout,
                stitchingColors: function(StitchingFactory) {
                    return StitchingFactory.getAll()
                        .then(function(response) {
                            if (response.result.stitchingColors) return response.result.stitchingColors;
                            else return [];
                        })
                        .catch(function() {
                            return [];
                        });
                },
                colors: getColors
            }
        });
});
