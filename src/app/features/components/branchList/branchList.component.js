
(function () {
    'use strict';

    angular
        .module('advisorLocator.features.searchByLocation')
        .component('branchList', {
            controller: branchListCtrl,
            templateUrl:'app/features/components/branchList/branchList.tpl.html'
        });


    /* @ngInject */

    branchListCtrl.$inject = [
        'pageStateResolver',
        'detectMobile',
        'branchListService'
    ];
    /* @ngInject */
    function branchListCtrl( pageStateResolver, detectMobile, branchListService
    ) {
        var vm = this;
        vm.pageStateResolver = pageStateResolver;
        vm.detectMobile = detectMobile;

        vm.branchListService = branchListService;
        vm.setPosition = vm.branchListService.setPosition;
    }

})();





