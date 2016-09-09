
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
        'branchDetailService',
        'stateTrackerService'
    ];
    /* @ngInject */
    function branchDetailCtrl( $stateParams, pageStateResolver, detectMobile, branchDetailService, stateTrackerService
    ) {
        var vm = this;
        vm.pageStateResolver = pageStateResolver;
        vm.detectMobile = detectMobile;
        vm.branchId = $stateParams.id;
        vm.branchDetailService = branchDetailService;
        vm.stateTrackerService = stateTrackerService;

        vm.branchDetailService.getBranchDetail(vm.branchId);

        if(vm.stateTrackerService.previousState.name == "main.advisorLocator.branchList"){
            vm.perviousStateIsLocationSearch = true;
        }
    }

})();





