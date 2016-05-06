angular.module('backend.controller.bind', [])
    .controller('BindIndexController', function($scope, toasty, bindColors) {
        $scope.bindColors = bindColors;


    })
    .controller('BindFormController', function($scope, $state, $stateParams, toasty, colors, isNewRecord, BindFactory) {

        $scope.availabeColors = colors;
        $scope.bind = {
            selectedColors: []
        };

        if (!isNewRecord) {
            if ($.isEmptyObject(leather)) $state.go('backend.bind-create');

            $scope.formTitle = '滾邊顏色更新';

        } else {
            $scope.formTitle = '滾邊顏色新增';
        }

        $scope.toggle = function(color, selectedColors) {

            var toggledColorId = selectedColors.indexOf(color);
            if (toggledColorId > -1) {
                selectedColors.splice(toggledColorId, 1);
            } else {
                selectedColors.push(color);
                console.log(JSON.stringify(selectedColors));
            }

        };

        $scope.isColorChecked = function(color, selectedColors) {
            return selectedColors.indexOf(color) > -1;
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
