
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
        'stateTrackerService',
        'advisorService',
        'branchListService',
        'advisorDetailService'
    ];
    /* @ngInject */
    function branchDetailCtrl( $stateParams, pageStateResolver, detectMobile, branchDetailService, stateTrackerService, advisorService, branchListService, advisorDetailService
    ) {
        var vm = this;
        vm.pageStateResolver = pageStateResolver;
        vm.detectMobile = detectMobile;
        vm.branchId = $stateParams.id;
        vm.branchDetailService = branchDetailService;
        vm.stateTrackerService = stateTrackerService;
        vm.advisorService = advisorService;
        vm.branchListService = branchListService;
        vm.advisorDetailService = advisorDetailService;

        if(vm.stateTrackerService.previousState.name == "main.advisorLocator.branchList"){
            vm.perviousStateIsLocationSearch = true;
        }

        if(!vm.branchListService.branchListLoading){
            vm.branchListService.getBranchList().then(function(){
                vm.branchDetailService.getBranchDetail(vm.branchId);
            });
        }
        else{
            vm.branchDetailService.getBranchDetail(vm.branchId);
        }

        if(vm.advisorService.isLoading){
            vm.advisorService.init().then(function(){
                vm.advisorDetailService.getAdvisorDetail(vm.advisorID);
            });
        }
        else{
            vm.advisorDetailService.getAdvisorDetail(vm.advisorID);
        }


    }

})();





