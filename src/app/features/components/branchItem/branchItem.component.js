
(function () {
    'use strict';

    angular
        .module('advisorLocator.features.searchByLocation')
        .component('listing', {
            bindings:{
                item: '<'
            },
            controller: listingCtrl,
            templateUrl:'app/features/components/branchItem/branchItem.tpl.html'
        });


    /* @ngInject */

    listingCtrl.$inject = [
        'pageStateResolver',
        'detectMobile',
        'branchListService'
    ];
    /* @ngInject */
    function listingCtrl( pageStateResolver, detectMobile, branchListService
    ) {
        var vm = this;
        vm.pageStateResolver = pageStateResolver;
        vm.detectMobile = detectMobile;
        //vm.myMarker = {geoLocation: {lat: 43.6425662, lng: -79.3892455}, zoom: 15};
        //vm.address = 'CN Tower, Toronto, ON M5V, Canada';

        vm.branchListService = branchListService;




    }

})();





