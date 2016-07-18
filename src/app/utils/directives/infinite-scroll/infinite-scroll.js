(function () {
    'use strict';

    angular
        .module('aio.utils')
        .directive('infiniteScroll', infiniteScroll);

    infiniteScroll.$inject = ['$rootScope', '$window', '$timeout'];

    /* @ngInject */
    function infiniteScroll($rootScope, $window, $timeout) {
        var directive = {
            link: link
        };
        return directive;

        function link(scope, elem, attrs) {
            var handler;
            $window = angular.element($window);

            handler = function () {
                var elementBottom, remaining, shouldScroll, windowBottom;
                windowBottom = $window[0].innerHeight + $window[0].pageYOffset;
                elementBottom = elem[0].offsetTop + elem[0].offsetHeight;
                remaining = elementBottom - windowBottom;
                shouldScroll = remaining <= $window[0].innerHeight;
                if (shouldScroll) {
                    if ($rootScope.$$phase) {
                        return scope.$eval(attrs.infiniteScroll);
                    } else {
                        return scope.$apply(attrs.infiniteScroll);
                    }
                }
            };

            $window.on('scroll', handler);
            scope.$on('$destroy', function () {
                return $window.off('scroll', handler);
            });

            return $timeout((function () {
                if (attrs.infiniteScrollImmediateCheck) {
                    if (scope.$eval(attrs.infiniteScrollImmediateCheck)) {
                        return handler();
                    }
                } else {
                    return handler();
                }
            }), 0);
        }
    }


})();


