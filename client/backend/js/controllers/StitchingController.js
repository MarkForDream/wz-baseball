angular.module('backend.controller.stitching', [])
    .controller('StitchingIndexController', function($scope, toasty, stitchingColors) {

        if (stitchingColors.length > 0) {
            $scope.stitchingColorListTitle = "顏色更新";
        } else {
            $scope.stitchingColorListTitle = "顏色新增";
        }

        $scope.stitchingColors = stitchingColors;

    })
    .controller('StitchingFormController', function($scope, $state, $stateParams, toasty, colors, stitchingColors, StitchingFactory) {

        var isNewRecord = true;
        if (stitchingColors.stitching_colors) {
            isNewRecord = stitchingColors.stitching_colors.length > 0 ? false : true;
        }

        $scope.availabeColors = colors;
        $scope.stitching = {
            selectedColors: []
        };

        if (!isNewRecord) {

            $scope.formTitle = '車縫顏色更新';
            $scope.stitchingFormBtnTitle = "更新";
            $scope.stitching.selectedColors = stitchingColors.stitching_colors;
        } else {
            $scope.formTitle = '車縫顏色新增';
            $scope.stitchingFormBtnTitle = "新增";
        }

        $scope.toggle = function(color, selectedColors) {

            if ($scope.isColorChecked(color, selectedColors)) {

                $scope.stitching.selectedColors = selectedColors.filter(function(selectedColor) {
                    return color._id !== selectedColor._id;
                });

            } else {

                $scope.stitching.selectedColors.push(color);

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

        $scope.stitchingFormSubmit = function() {

            StitchingFactory.submit($scope.stitching, isNewRecord)
                .then(function(response) {

                    $state.go('backend.stitching-index')
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
