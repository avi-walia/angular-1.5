
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
        vm.advisorID = $stateParams.id;
        vm.advisorDetailService = advisorDetailService;
        vm.stateTrackerService = stateTrackerService;
        vm.advisorService = advisorService;

        vm.advisorDetailService.getAdvisorDetail(vm.advisorID);

        vm.previousState = vm.stateTrackerService;

    }

})();





