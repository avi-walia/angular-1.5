
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
        vm.myMarker = {geoLocation: {lat: 43.6425662, lng: -79.3892455}, zoom: 15};
        vm.address = 'CN Tower, Toronto, ON M5V, Canada';

        vm.branchListService = branchListService;

        vm.setPosition = setPosition;
        vm.setLocation = setLocation;


        function setPosition(position){
            vm.branchListService.setPosition(position);
        }


        function setLocation(location){
            vm.branchListService.setLocation(location);
        }
    }

})();





