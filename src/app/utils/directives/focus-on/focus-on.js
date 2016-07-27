(function () {
    'use strict';

    angular
        .module('advisorLocator.utils')
        .directive('focusOn', focusOn);

    /* @ngInject */
    function focusOn() {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attr) {
            scope.$watch(attr.focusOn, function (value) {
                if (value === attr.id) {
                    console.log('value = ' + value);
                    element[0].focus();
                }
            });
        }
    }

})();

