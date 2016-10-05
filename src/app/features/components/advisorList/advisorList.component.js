
(function () {
    'use strict';

    angular
        .module('advisorLocator.features.searchByName')
        .constant('AVAILABLE_FILTERS', [
            'lang',
            'province'
        ])
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
    function advisorListCtrl(advisorService, pageStateResolver, detectMobile) {
        var vm = this;
        vm.pageStateResolver = pageStateResolver;
        vm.detectMobile = detectMobile;
        vm.service = advisorService;
        if(vm.service.isLoading) {
            vm.service.init();
        }
    }

})();





