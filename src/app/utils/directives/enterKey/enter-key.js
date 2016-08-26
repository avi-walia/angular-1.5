(function () {
    'use strict';

    angular
        .module('advisorLocator.utils')
        .directive('enterKey', enterKey);

    /* @ngInject */
    function enterKey() {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attr) {
            element.bind("keydown keypress", function (event) {
                if(event.which === 13) {
                    scope.$apply(function (){
                        scope.$eval(attr.enterKey);
                    });

                    event.preventDefault();
                }
            });
        }
    }

})();

