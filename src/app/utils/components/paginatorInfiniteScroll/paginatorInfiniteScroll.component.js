
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







        vm.totalItems = 300;
        vm.currentPage = 1;
        vm.size = 10;
        vm.pageChanged = function(x){
            console.log('changing page: ', x);
            vm.currentPage = x;
        };

        vm.pagination = {
            currentPage: 1,
            totalItems: 300,
            itemsPerPage: 10,
            maxSize:100
        };

    }

})();





