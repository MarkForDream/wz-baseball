angular.module('backend.controller.model', [])
    .controller('ModelIndexController', function($scope, toasty, models, ModelFactory) {
        $scope.models = models;

        $scope.delete = function(index, _id) {
            ModelFactory.delete(_id)
                .then(function(response) {
                    $scope.models.splice(index, 1);

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
    .controller('ModelFormController', function($scope, $state, $stateParams, Upload, toasty, model, colors, isNewRecord, ModelFactory) {
        if (!isNewRecord && $.isEmptyObject(model)) $state.go('backend.model-create');

        $scope.model = model;
        $scope.colors = colors;

        $scope.modelFormSubmit = function(imgModel) {
            $scope.modelForm.$setPristine();

            Upload.base64DataUrl(imgModel)
                .then(function(imgBase64DataUrl) {
                    if (imgBase64DataUrl) $scope.model.img = imgBase64DataUrl;

                    ModelFactory.submit($scope.model, isNewRecord)
                        .then(function(response) {
                            $state.go('backend.model-index')
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
