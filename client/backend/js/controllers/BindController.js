angular.module('backend.controller.bind', [])
    .controller('BindIndexController', function($scope, toasty, bindColors) {

        if (bindColors.length > 0) {
            $scope.bindColorListTitle = "顏色更新";
        } else {
            $scope.bindColorListTitle = "顏色新增";
        }

        $scope.bindColors = bindColors;

    })
    .controller('BindFormController', function($scope, $state, $stateParams, toasty, colors, bindColors, BindFactory) {

        var isNewRecord = true;
        if (bindColors.bind_colors) {
            isNewRecord = bindColors.bind_colors.length > 0 ? false : true;
        }

        $scope.availabeColors = colors;
        $scope.bind = {
            selectedColors: []
        };

        if (!isNewRecord) {

            $scope.formTitle = '滾邊顏色更新';
            $scope.bindFormBtnTitle = "更新";
            $scope.bind.selectedColors = bindColors.bind_colors;
        } else {
            $scope.formTitle = '滾邊顏色新增';
            $scope.bindFormBtnTitle = "新增";
        }

        $scope.toggle = function(color, selectedColors) {

            if ($scope.isColorChecked(color, selectedColors)) {

                $scope.bind.selectedColors = selectedColors.filter(function(selectedColor) {
                    return color._id !== selectedColor._id;
                });

            } else {

                $scope.bind.selectedColors.push(color);

            }

        };

        $scope.isColorChecked = function(color, selectedColors) {
            var isColorChecked = false;
            for (var i = 0; i < selectedColors.length; i++) {
                if (color._id === selectedColors[i]._id) {
                    isColorChecked = true;
                }
            }

            return isColorChecked;
        };

        $scope.bindFormSubmit = function() {

            BindFactory.submit($scope.bind, isNewRecord)
                .then(function(response) {

                    $state.go('backend.bind-index')
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
