/**
 * Directive to ensure the maxlength attribute of input fields is enforced(mainly for android).
 * This augments existing maxlength attributes. Does not alter it's functionality.
 * Future enhancement may increase proficiency by only enabling on android phones?
 */
(function () {
    'use strict';

    angular
        .module('advisorLocator.utils')
        .directive('errSrc', errSrc);

    // ciInputMatch.$inject = ['$element'];
    errSrc.$inject = ['advisorService', 'envConfigService'];

    /* @ngInject */
    function errSrc(advisorService, envConfigService) {
        return {
            link: function(scope, element, attrs) {

                element.bind('error', function() {
                    if (attrs.src !== attrs.errSrc) {
                        attrs.$set('src', attrs.errSrc);

                        if (envConfigService.promise === null) {
                            envConfigService.init();
                        }
                        envConfigService.promise.then(function() {
                            attrs.$set('src', attrs.errSrc);
                            var str = attrs.ngSrc;
                            var res = str.substring(envConfigService.PROFILE_PICTURE_BASE_PATH.length, str.length);
                            var slashIndex = res.indexOf('/');
                            var advisorId = res.substring(0, slashIndex);
                            advisorService.imageNotFound(advisorId);
                        });

                    }
                });
            }
        };
    }

})();
