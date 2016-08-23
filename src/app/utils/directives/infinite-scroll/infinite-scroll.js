(function () {
    'use strict';

    angular
        .module('advisorLocator.utils')
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
                elementBottom = elem[0].offsetTop + elem[0].offsetHeight - $window[0].pageYOffset;
                remaining = elementBottom - windowBottom;
                if (elem[0].children[0].children[0].children[0]) {
                    var heightOfFirstChild = elem[0].children[0].children[0].children[0].offsetHeight;// this is the height of the first row/element in the list of rows/elements to infinitely scroll through.

                    //the larger the left side is, the sooner it will load more elements into the infinite-scroll.
                    //ie. $window[0].innerHeight * 1.3 will load more items when the crollbar is about 30%  from the bottom of the page.
                    shouldScroll = elem[0].getBoundingClientRect().bottom <= $window[0].innerHeight * 1.05 + heightOfFirstChild;
                    if (shouldScroll) {
                        console.log('scrolling');
                        if ($rootScope.$$phase) {
                            return scope.$eval(attrs.infiniteScroll);
                        } else {
                            return scope.$apply(attrs.infiniteScroll);
                        }
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


