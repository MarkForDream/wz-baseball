angular.module('backend.controller.leather', [])
    .controller('LeatherIndexController', function($scope, toasty, leathers, LeatherFactory) {
        $scope.leathers = leathers;

        $scope.delete = function(index, _id) {
            LeatherFactory.delete(_id)
                .then(function(response) {
                    $scope.leathers.splice(index, 1);

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
    .controller('LeatherFormController', function($scope, $state, $stateParams, Upload, toasty, colors, leather, isNewRecord, LeatherFactory) {

        $scope.leather = leather;
        $scope.availabeColors = colors;
        $scope.leather.selectedColors = [];

        if (!isNewRecord) {
            if ($.isEmptyObject(leather)) $state.go('backend.leather-create');

            $scope.formTitle = '皮革更新';

        } else {
            $scope.formTitle = '皮革新增';
        }

        $scope.toggle = function(color, selectedColors) {
            var toggledColorId = selectedColors.indexOf(color);
            if (toggledColorId > -1) {
                selectedColors.splice(toggledColorId, 1);
            } else {
                selectedColors.push(color);
            }

        };

        $scope.isColorChecked = function(color, selectedColors) {
            return selectedColors.indexOf(color) > -1;
        };

        $scope.leatherFormSubmit = function(imgModel) {
            $scope.leatherForm.$setPristine();

            Upload.base64DataUrl(imgModel)
                .then(function(imgBase64DataUrl) {
                    if (imgBase64DataUrl) $scope.leather.img = imgBase64DataUrl;

                    LeatherFactory.submit($scope.leather, isNewRecord)
                        .then(function(response) {

                            $state.go('backend.leather-index')
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
