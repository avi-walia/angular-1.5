
(function () {
    'use strict';

    angular
        .module('advisorLocator.utils')
        .component('paginatorInfiniteScroll', {
            transpose: true,
            bindings: {
              service: '='
            },
            controller: paginatorInfiniteScrollCtrl,
            templateUrl:'app/utils/components/paginatorInfiniteScroll/paginatorInfiniteScroll.tpl.html'
        });


    /* @ngInject */

    paginatorInfiniteScrollCtrl.$inject = [
        'detectMobile'
    ];
    /* @ngInject */
    function paginatorInfiniteScrollCtrl(
        detectMobile
    ) {
        var vm = this;
        console.log('vm.service: ', vm.service);
        vm.detectMobile = detectMobile;

    }

})();





