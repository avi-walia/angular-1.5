
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
        'detectMobile'
    ];
    /* @ngInject */
    function paginatorInfiniteScrollCtrl(
        detectMobile
    ) {
        var vm = this;
        vm.detectMobile = detectMobile;

    }

})();





