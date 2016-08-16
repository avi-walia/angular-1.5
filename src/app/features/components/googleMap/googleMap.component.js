
(function () {
    'use strict';

    angular
        .module('advisorLocator')
        .component('googleMap', {
            controller: googleMapCtrl,
            bindings: {
                draggable: '<',
                zoomControl: '<',
                list: '<',
                onUpdateMarkers: '&?'
            },
            templateUrl:'app/features/components/googleMap/googleMap.tpl.html'
        });


    /* @ngInject */

    googleMapCtrl.$inject = [
        '$rootScope',
        'pageStateResolver',
        'detectMobile',
        'NgMap'
    ];
    /* @ngInject */
    function googleMapCtrl( $rootScope, pageStateResolver, detectMobile, NgMap
    ) {
        var vm = this;
        vm.pageStateResolver = pageStateResolver;
        vm.detectMobile = detectMobile;
        vm.loadParameters = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCwahusHkUZ-LOTVpawRSoKh-h2ktVbj2I&libraries=geometry,places&language='+$rootScope.documentLanguage;
        vm.ca = {center: [61.0, -99.0], zoom: 3, mapTypeControl: false, panControl: false, streetViewControl: false, zoomControl: vm.zoomControl, draggable: vm.draggable};
        NgMap.getMap().then(function(map){
            vm.map = map;
        });
    }

})();





