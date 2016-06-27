angular.module('backend.controller.lace', [])
    .controller('LaceIndexController', function($scope, toasty, laceColors) {

        if (laceColors.length > 0) {
            $scope.laceColorListTitle = "顏色更新";
        } else {
            $scope.laceColorListTitle = "顏色新增";
        }
        console.log("laceColors::" + JSON.stringify(laceColors));
        $scope.generalLaceColors = [];
        $scope.whileLaceColors = [];
        laceColors.forEach(function(laceColor, index) {
            if (laceColor.laceType == 0) {
                $scope.generalLaceColors.push(laceColor);
            } else {
                $scope.whileLaceColors.push(laceColor);
            }
        });

    })
    .controller('LaceFormController', function($scope, $state, $stateParams, toasty, colors, laceColors, LaceFactory) {

        $scope.currentLaceType = 0;

        $scope.laceColorTypeTitle = "一般帶皮顏色";

        $scope.switchLaceType = function() {
            if ($scope.currentLaceType == 0) {
                $scope.laceColorTypeTitle = "一般帶皮顏色";
            } else {
                $scope.laceColorTypeTitle = "白芯帶皮顏色";
            }
        }

        var isNewRecord = true;
        if (laceColors.lace_colors) {
            isNewRecord = laceColors.lace_colors.length > 0 ? false : true;
        }

        $scope.availabeColors = colors;
        $scope.lace = {

            selectedColors: []
        };

        if (!isNewRecord) {

            $scope.formTitle = '帶皮顏色更新';
            $scope.laceFormBtnTitle = "更新";
            $scope.lace.selectedColors = laceColors.lace_colors;
        } else {
            $scope.formTitle = '帶皮顏色新增';
            $scope.laceFormBtnTitle = "新增";
        }

        $scope.toggle = function(color, selectedColors) {

            if ($scope.isColorChecked(color, selectedColors)) {
                c
                $scope.lace.selectedColors = selectedColors.filter(function(selectedColor) {
                    return !((color._id == selectedColor.color_id) &&
                    (selectedColor.laceType == $scope.currentLaceType));
                });


            } else {
                var newSelectedColor = {
                    color_id: color._id,
                    laceType: $scope.currentLaceType
                };

                $scope.lace.selectedColors.push(newSelectedColor);

            }

        };

        $scope.isColorChecked = function(color, selectedColors) {
            var isColorChecked = false;
            for (var i = 0; i < selectedColors.length; i++) {
                if ((selectedColors[i].laceType == $scope.currentLaceType) &&
                    (color._id === selectedColors[i].color_id) ) {

                    isColorChecked = true;

                }
            }

            return isColorChecked;
        };

        $scope.laceFormSubmit = function() {

            LaceFactory.submit($scope.lace, isNewRecord)
                .then(function(response) {

                    $state.go('backend.lace-index')
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
