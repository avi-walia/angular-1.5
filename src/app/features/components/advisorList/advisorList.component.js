
(function () {
    'use strict';

    angular
        .module('advisorLocator.features.searchByName')
        .component('advisorList', {
            controller: advisorListCtrl,
            templateUrl:'app/features/components/advisorList/advisorList.tpl.html'
        });


    /* @ngInject */

    advisorListCtrl.$inject = [
        'advisorService',
        'pageStateResolver',
        'detectMobile'
    ];
    /* @ngInject */
    function advisorListCtrl(
        advisorService,
        pageStateResolver,
        detectMobile
    ) {
        var vm = this;
        vm.pageStateResolver = pageStateResolver;
        vm.detectMobile = detectMobile;
        advisorService.init();
        vm.service = advisorService;

    }

})();





