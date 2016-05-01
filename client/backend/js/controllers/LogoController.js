angular.module('backend.controller.logo', ['backend.factory.logo'])
    .controller('LogoIndexController', function($scope, toasty, logos, LogoFactory) {
        $scope.logos = logos;

        $scope.delete = function(index, _id) {
            LogoFactory.delete(_id)
                .then(function(response) {
                    $scope.logos.splice(index, 1);

                    toasty.success({
                        title: response.result.msg
                    });
                })
                .catch(function(response) {
                    toasty.error({
                        title: response.result.errorMsg,
                        timeout: false
                    });
                });
        };
    })
    .controller('LogoFormController', function($scope, $state, $stateParams, Upload, toasty, logo, isNewRecord, LogoFactory) {
        if (!isNewRecord && $.isEmptyObject(logo)) $state.go('backend.logo-create');

        $scope.logo = logo;

        $scope.logoFormSubmit = function(imgModel) {
            $scope.logoForm.$setPristine();

            Upload.base64DataUrl(imgModel)
                .then(function(imgBase64DataUrl) {
                    if (imgBase64DataUrl) $scope.logo.img = imgBase64DataUrl;

                    LogoFactory.submit($scope.logo, isNewRecord)
                        .then(function(response) {
                            $state.go('backend.logo-index')
                                .then(function() {
                                    toasty.success({
                                        title: response.result.msg
                                    });
                                });
                        })
                        .catch(function(response) {
                            toasty.error({
                                title: response.result.errorMsg,
                                timeout: false
                            });
                        });
                });
        };
    });
