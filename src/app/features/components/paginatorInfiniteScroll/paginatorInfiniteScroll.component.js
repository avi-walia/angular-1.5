
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
        'envConfigService'
    ];
    /* @ngInject */
    function paginatorInfiniteScrollCtrl(
        detectMobile,
        envConfigService
    ) {
        var vm = this;
        vm.detectMobile = detectMobile;
        vm.PROFILE_PICTURE_BASE_PATH = envConfigService.PROFILE_PICTURE_BASE_PATH;
    }

})();





