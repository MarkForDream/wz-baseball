angular.module('backend.controller.color', ['backend.factory.color'])
    .controller('ColorIndexController', function($scope, toasty, colors, ColorFactory) {
        $scope.colors = colors;

        $scope.delete = function(index, _id) {
            ColorFactory.delete(_id)
                .then(function(response) {
                    $scope.colors.splice(index, 1);

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
    .controller('ColorFormController', function($scope, $state, $stateParams, toasty, color, isNewRecord, ColorFactory) {
        if (!isNewRecord) {
            if ($.isEmptyObject(color)) $state.go('backend.color-create');

            $scope.formTitle = '顏色更新';
        } else {
            $scope.formTitle = '顏色新增';
        }

        $scope.color = color;

        $scope.colorFormSubmit = function() {
            $scope.colorForm.$setPristine();

            ColorFactory.submit($scope.color, isNewRecord)
                .then(function(response) {
                    $state.go('backend.color-index')
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
        };
    });
