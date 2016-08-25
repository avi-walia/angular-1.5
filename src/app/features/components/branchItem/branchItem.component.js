
(function () {
    'use strict';

    angular
        .module('advisorLocator.features.searchByLocation')
        .component('branchItem', {
            bindings:{
                item: '<'
            },
            controller: branchItemCtrl,
            templateUrl:'app/features/components/branchItem/branchItem.tpl.html'
        });


    /* @ngInject */

    branchItemCtrl.$inject = [
        '$rootScope',
        'pageStateResolver',
        'detectMobile'
    ];
    /* @ngInject */
    function branchItemCtrl( $rootScope, pageStateResolver, detectMobile
    ) {
        var vm = this;
        vm.pageStateResolver = pageStateResolver;
        vm.detectMobile = detectMobile;
        //vm.myMarker = {geoLocation: {lat: 43.6425662, lng: -79.3892455}, zoom: 15};
        //vm.address = 'CN Tower, Toronto, ON M5V, Canada';




    }

})();





