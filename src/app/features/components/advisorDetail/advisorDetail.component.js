
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
        '$stateParams',
        'pageStateResolver',
        'detectMobile',
        'advisorDetailService',
        'stateTrackerService',
        'advisorService'
    ];
    /* @ngInject */
    function advisorDetailCtrl( $stateParams, pageStateResolver, detectMobile, advisorDetailService, stateTrackerService, advisorService
    ) {
        var vm = this;
        vm.pageStateResolver = pageStateResolver;
        vm.detectMobile = detectMobile;
        vm.advisorID = parseInt($stateParams.id);
        vm.advisorDetailService = advisorDetailService;
        vm.stateTrackerService = stateTrackerService;
        vm.advisorService = advisorService;
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


    }

})();





