angular.module('backend.controller.size', [])
    .controller('SizeIndexController', function($scope, toasty, sizesObject, SizeFactory) {
        $scope.sizesObject = sizesObject;
        $scope.recommendationLevel = RECOMMENDATION_LEVEL;

        $scope.delete = function(index, _id) {
            SizeFactory.delete(_id)
                .then(function(response) {
                    $scope.sizesObject.splice(index, 1);

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
    .controller('SizeFormController', function($scope, $state, $stateParams, Upload, toasty, sizeObject, modelsObject, isNewRecord, SizeFactory) {
        if (!isNewRecord) {
            if ($.isEmptyObject(sizeObject)) $state.go('backend.size-create');

            $scope.formTitle = '尺寸更新';
        } else {
            $scope.formTitle = '尺寸新增';
        }

        $scope.sizeObject = sizeObject;
        $scope.sizeObject.models = $scope.sizeObject.models || [];
        $scope.modelsObject = modelsObject;
        $scope.modelsToggle = false;
        $scope.recommendationLevel = RECOMMENDATION_LEVEL;

        $scope.exist = function(modelObject) {
            return $scope.sizeObject.models.indexOf(modelObject) > -1;
        };

        $scope.toggle = function(modelObject) {
            var index = $scope.sizeObject.models.indexOf(modelObject);

            if (index > -1) $scope.sizeObject.models.splice(index, 1);
            else $scope.sizeObject.models.push(modelObject);

            $scope.modelsToggle = true;
            $scope.sizeForm.$pristine = false;
        };

        $scope.sizeFormSubmit = function() {
            $scope.sizeForm.$setPristine();

            SizeFactory.submit($scope.sizeObject, isNewRecord)
                .then(function(response) {
                    $state.go('backend.size-index')
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
