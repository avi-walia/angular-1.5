
(function () {
    'use strict';

    angular
        .module('advisorLocator')
        .component('googleMap', {
            controller: googleMapCtrl,
            bindings: {
                onUpdateMarkers: '&?', /*will be used only for branch locations search*/
                markerList: '<?', /*will be used only for branch locations search*/
                position: '<?', /*will be used only for branch location search*/
                userMarker: '<?', /*{geoLocation: {lat: number, lng: number}, zoom: number}*/
                address: '<?' /*physical address of the marker (separate values by comma followed by space)*/
            },
            templateUrl:'app/features/components/googleMap/googleMap.tpl.html'
        });


    /* @ngInject */

    googleMapCtrl.$inject = [
        '$rootScope',
        '$scope',
        'pageStateResolver',
        'detectMobile',
        'NgMap',
        '$timeout'
    ];
    /* @ngInject */
    function googleMapCtrl( $rootScope, $scope, pageStateResolver, detectMobile, NgMap, $timeout
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
        vm.isLoading = true;
        vm.mapPromise = NgMap.getMap().then(function(map){
            vm.map = map;

        },function(error){
            console.log('error: ', error);
        });

        vm.userLocationMarker = null;
        vm.markers = [];
        vm.infoWindow = new google.maps.InfoWindow({
            content: document.getElementById('info')
        });
        vm.markerInfo = {};
        vm.setUserLocationMarker = setUserLocationMarker;
        vm.createMarkers = createMarkers;
        vm.clearMarkers = clearMarkers;
        vm.setVisibility = setVisibility;

        vm.pathToIcon = 'assets/images/blue-marker.png';
        vm.showInfoWindow = showInfoWindow;

        vm.linkToMap = 'https://www.google.com/maps/dir/';

        vm.$onInit = function(){


                vm.mapPromise.then(function(){

                    if (vm.userMarker) {
                        var LatLng = new google.maps.LatLng(vm.userMarker.geoLocation.lat, vm.userMarker.geoLocation.lng);
                        vm.map.setCenter(LatLng);
                        vm.map.setZoom(vm.userMarker.zoom);
                        vm.setUserLocationMarker(LatLng);
                        if (vm.address) {
                            vm.address = vm.address.replace(/, /g, '+');
                            console.log(vm.address);
                        }
                    }
                    vm.isLoading = false;
                });
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
            if(changes.markerList){
                vm.clearMarkers();
                vm.markerList = angular.copy(vm.markerList);
                vm.markerList = angular.copy(changes.markerList.currentValue);
                if(!_.isEmpty(vm.markerList)){
                    vm.mapPromise.then(function(){
                        vm.createMarkers();
                       // vm.markerInfo = vm.markerList[0];
                    });
                }

            }
        };


        var infoWindow = $rootScope.$on('infoWindow', function(event, param){
            console.log('call info window', param.id);
            vm.markerInfo = _.find(vm.markers, {'id': param.id});
            console.log(vm.markerInfo);
            if(vm.markerInfo){
                google.maps.event.trigger(vm.markerInfo, 'click');
            }
        });
        $scope.$on('$destroy', infoWindow);



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


        function clearMarkers(){
            _.forEach(vm.markers, function(value, key){
                if(vm.markers[key]){
                    vm.markers[key].setMap(null);
                }

            });
            vm.markers = [];
        }

        function createMarkers(){
            _.forEach(vm.markerList, function(value, key){
                vm.markers[key] = new google.maps.Marker({
                    position: vm.markerList[key].geoLocation,
                    icon: vm.pathToIcon
                });
                vm.markers[key].customInfo = vm.markerList[key].address;
                vm.markers[key].id = vm.markerList[key].id;
                google.maps.event.addListener(vm.markers[key], 'click', vm.showInfoWindow);
                vm.markers[key].setMap(vm.map);
            });
        }

        function showInfoWindow(){
            vm.markerInfo = this;
            setVisibility();
            $timeout(function() {
                vm.infoWindow.open(vm.map, vm.markerInfo);
            });
        }

        function setVisibility(){
            _.forEach(vm.markers, function(value, key){
                vm.markers[key].visible = false;
            });
            vm.markerInfo.visible = true;
        }
    }

})();





