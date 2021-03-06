
(function () {
    'use strict';

    angular
        .module('advisorLocator.features.searchByName')
        .component('advisorDetail', {
            controller: advisorDetailCtrl,
            templateUrl:'app/features/components/advisorDetail/advisorDetail.tpl.html'
        });


    /* @ngInject */

    advisorDetailCtrl.$inject = [
        '$rootScope',
        '$stateParams',
        'pageStateResolver',
        'detectMobile',
        'envConfigService',
        'advisorDetailService',
        'stateTrackerService',
        'advisorService',
        'branchListService',
    ];
    /* @ngInject */
    function advisorDetailCtrl($rootScope, $stateParams, pageStateResolver, detectMobile, envConfigService, advisorDetailService, stateTrackerService, advisorService, branchListService
    ) {
        var vm = this;
        vm.googleMapsUrl = envConfigService.GOOGLE_MAPS_URL+$rootScope.documentLanguage;
        vm.pageStateResolver = pageStateResolver;
        vm.detectMobile = detectMobile;
        vm.advisorID = parseInt($stateParams.id);
        vm.advisorDetailService = advisorDetailService;
        vm.stateTrackerService = stateTrackerService;
        vm.advisorService = advisorService;
        vm.branchListService = branchListService;
        vm.PROFILE_PICTURE_BASE_PATH = envConfigService.PROFILE_PICTURE_BASE_PATH;
        if(vm.advisorService.isLoading){
            vm.advisorService.init().then(function(){
                vm.advisorDetailService.getAdvisorDetail(vm.advisorID);
            });
        }
        else {
            vm.advisorDetailService.getAdvisorDetail(vm.advisorID);
        }

        if(vm.stateTrackerService.previousState.name === "main.advisorLocator.advisorList"){
            vm.perviousStateIsNameSearch = true;
        }

        vm.location = vm.branchListService.getLocation();//set location for get direction link
        //strip out http:// from advisor's website display
        //vm.advisorDetailService.advisorDetail.websiteDisplay = vm.advisorDetailService.advisorDetail.website.replace(/^http:\/\//, '');
    }

})();





