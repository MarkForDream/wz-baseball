angular.module('backend.directive', []).directive('validateEmail', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attributes, ngModelController) {
            if (!ngModelController) return;

            ngModelController.$parsers.unshift(function(value) {
                var valid = true;

                if (value) {
                    valid = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i.test(value);
                    ngModelController.$setValidity('emailFormat', valid);
                }

                return valid ? value : undefined;
            });
        }
    };
});
