
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
                onUpdateMarkers: '&?',
                position: '<?'
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
        vm.mapPromise = NgMap.getMap().then(function(map){
            vm.map = map;
        });

        vm.$onChanges = function(changes){

            if(changes.position){
                vm.position = angular.copy(vm.position);
                vm.position = angular.copy(changes.position.currentValue);
              
                if(!_.isEmpty(vm.position)) {
                    vm.mapPromise.then(function () {
                        vm.map.panTo(vm.position);
                        vm.map.setZoom(13);
                    });
                }
            }
        };
    }

})();





