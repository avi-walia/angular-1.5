(function () {
    'use strict';

    angular
        .module('aio.utils')
        .filter('htmlSafe', ['$sce', htmlSafeFilter]);

    //phoneFilter.$inject = ['$locale'];
    function htmlSafeFilter($sce) {
        return function(htmlCode){
            return $sce.trustAsHtml(htmlCode);
        };
    }
})();
