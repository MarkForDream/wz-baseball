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
        if (!isNewRecord) {
            if ($.isEmptyObject(logo)) $state.go('backend.logo-create');

            $scope.formTitle = '布標更新';
        } else {
            $scope.formTitle = '布標新增';
        }

        $scope.logo = logo;

        $scope.logoFormSubmit = function(imgModel) {
            $scope.logoForm.$setPristine();

            Upload.base64DataUrl(imgModel)
                .then(function(imgBase64DataUrl) {
                    var logoObject = {};

                    if ($scope.logo.title) logoObject.title = $scope.logo.title;
                    if (imgBase64DataUrl) logoObject.img = imgBase64DataUrl;
                    if ($scope.logo.description) logoObject.description = $scope.logo.description;

                    LogoFactory.submit(logoObject, isNewRecord)
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
