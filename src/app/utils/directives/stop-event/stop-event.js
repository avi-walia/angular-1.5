(function () {
    'use strict';

    angular
        .module('advisorLocator.utils')
        .directive('stopEvent', stopEvent);

    /* @ngInject */
    function stopEvent() {
        var directive = {
            link: link,
            restrict: 'A',

        };
        return directive;

        function link (scope, element, attr) {
            if (attr && attr.stopEvent) {
                element.bind(attr.stopEvent, function (e) {
                    e.stopPropagation();
                });
            }
        }
    }


})();

