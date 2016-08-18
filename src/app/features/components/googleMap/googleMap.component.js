
(function () {
    'use strict';

    angular
        .module('advisorLocator')
        .component('googleMap', {
            controller: googleMapCtrl,
            bindings: {
                onUpdateMarkers: '&?', /*will be used only for branch locations search*/
                position: '<?', /*will be used only for branch location search*/
                userMarker: '<?', /*{geoLocation: {lat: number, lng: number}, zoom: number}*/
                address: '<?' /*physical address of the marker (separate values by comma followed by space)*/
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
        vm.ca = {
            center: [61.0, -99.0],
            zoom: 3,
            mapTypeControl: false,
            panControl: false,
            streetViewControl: false,
            zoomControl: true,
            draggable: true
        };
        vm.mapPromise = NgMap.getMap().then(function(map){
            vm.map = map;
        });

        vm.userLocationMarker = null;

        vm.setUserLocationMarker = setUserLocationMarker;

        vm.linkToMap = 'https://www.google.com/maps/dir/';

        vm.$onInit = function(){

        if (vm.userMarker){

                vm.mapPromise.then(function(){
                    var LatLng = new google.maps.LatLng(vm.userMarker.geoLocation.lat, vm.userMarker.geoLocation.lng);
                    vm.map.setCenter(LatLng);
                    vm.map.setZoom(vm.userMarker.zoom);
                    vm.setUserLocationMarker(LatLng);
                    if(vm.address){
                        vm.address = vm.address.replace(/, /g, '+');
                        console.log(vm.address);
                    }
                });
            }
        };
        vm.$onChanges = function(changes){

            if(changes.position){
                vm.position = angular.copy(vm.position);
                vm.position = angular.copy(changes.position.currentValue);

                if(!_.isEmpty(vm.position)) {
                    vm.mapPromise.then(function () {
                        vm.map.panTo(vm.position);
                        vm.map.setZoom(13);
                        vm.setUserLocationMarker(vm.position);
                    });
                }
            }
        };

        function setUserLocationMarker(LatLng){
            if (vm.userLocationMarker){
                vm.userLocationMarker.setMap(null);
                vm.userLocationMarker = null;
            }
            vm.userLocationMarker = new google.maps.Marker({
                position: LatLng,
                map: vm.map
            });

        }
    }

})();





