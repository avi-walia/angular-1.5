
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
        '$rootScope',
        '$stateParams',
        'pageStateResolver',
        'detectMobile',
        'envConfigService',
        'branchDetailService',
        'stateTrackerService',
        'advisorService',
        'branchListService',
        'advisorDetailService'
    ];
    /* @ngInject */
    function branchDetailCtrl($rootScope, $stateParams, pageStateResolver, detectMobile, envConfigService, branchDetailService, stateTrackerService, advisorService, branchListService, advisorDetailService
    ) {
        var vm = this;
        vm.pageStateResolver = pageStateResolver;
        vm.detectMobile = detectMobile;
        vm.googleMapsUrl = envConfigService.GOOGLE_MAPS_URL+$rootScope.documentLanguage;
        vm.branchId = parseInt($stateParams.id);
        vm.branchDetailService = branchDetailService;
        vm.stateTrackerService = stateTrackerService;
        vm.advisorService = advisorService;
        vm.branchListService = branchListService;
        vm.advisorDetailService = advisorDetailService;

        if(vm.stateTrackerService.previousState.name === "main.advisorLocator.branchList"){
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

        vm.location = vm.branchListService.getLocation();//set location for get direction link


    }

})();





