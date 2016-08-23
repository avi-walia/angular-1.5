
(function () {
    'use strict';

    angular
        .module('advisorLocator.features.searchByLocation')
        .component('branchDetail', {
            controller: branchDetailCtrl,
            templateUrl:'app/features/components/branchDetail/branchDetail.tpl.html'
        });


    /* @ngInject */

    branchDetailCtrl.$inject = [
        '$stateParams',
        'pageStateResolver',
        'detectMobile',
        'branchDetailService'
    ];
    /* @ngInject */
    function branchDetailCtrl( $stateParams, pageStateResolver, detectMobile, branchDetailService
    ) {
        var vm = this;
        vm.pageStateResolver = pageStateResolver;
        vm.detectMobile = detectMobile;
        vm.branchId = $stateParams.id;
        vm.branchDetailService = branchDetailService;

        vm.branchDetailService.getBranchDetail(1);
    }

})();





