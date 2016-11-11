
(function () {
    'use strict';

    angular
        .module('advisorLocator')
        .component('paginatorInfiniteScroll', {
            transpose: true,
            bindings: {
              service: '='
            },
            controller: paginatorInfiniteScrollCtrl,
            templateUrl:'app/features/components/paginatorInfiniteScroll/paginatorInfiniteScroll.tpl.html'
        });


    /* @ngInject */

    paginatorInfiniteScrollCtrl.$inject = [
        'detectMobile',
        'PROFILE_PICTURE_BASE_PATH'
    ];
    /* @ngInject */
    function paginatorInfiniteScrollCtrl(
        detectMobile,
        PROFILE_PICTURE_BASE_PATH
    ) {
        var vm = this;
        vm.detectMobile = detectMobile;
        vm.PROFILE_PICTURE_BASE_PATH = PROFILE_PICTURE_BASE_PATH;
    }

})();





