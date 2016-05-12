angular.module('backend.controller.web', [])
    .controller('WebIndexController', function($scope, toasty, webs, WebFactory) {
        $scope.webs = webs;

        $scope.delete = function(index, _id) {
            WebFactory.delete(_id)
                .then(function(response) {
                    $scope.webs.splice(index, 1);

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
    .controller('WebPriorityController', function($scope, toasty, webs, WebFactory) {
        $scope.webs = webs;
    })
    .controller('WebFormController', function($scope, $state, $stateParams, Upload, toasty, WebFactory) {
        $scope.web = {'imgs': []};

        $scope.webFormSubmit = function(imgsModel) {
            $scope.webForm.$setPristine();

            Upload.base64DataUrl(imgsModel)
                .then(function(imgsBase64DataUrl) {
                    if (imgsBase64DataUrl) $scope.web.imgs = imgsBase64DataUrl;

                    WebFactory.submit($scope.web)
                        .then(function(response) {
                            $state.go('backend.web-index')
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
