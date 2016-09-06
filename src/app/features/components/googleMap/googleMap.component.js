
(function () {
    'use strict';

    angular
        .module('advisorLocator')
        .component('googleMap', {
            controller: googleMapCtrl,
            bindings: {
                //onUpdateMarkers: '&?', /*will be used only for branch locations search*/
               // markerList: '<?', /*will be used only for branch locations search*/
                locationList: '<?', /*will be used only for branch locations search*/
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
        '$timeout',
        'branchListService'
    ];
    /* @ngInject */
    function googleMapCtrl( $rootScope, $scope, pageStateResolver, detectMobile, NgMap, $timeout, branchListService
    ) {
        var vm = this;

        vm.pageStateResolver = pageStateResolver;
        vm.detectMobile = detectMobile;
        vm.loadParameters = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCwahusHkUZ-LOTVpawRSoKh-h2ktVbj2I&libraries=geometry,places&language='+$rootScope.documentLanguage;
        vm.pathToIcon = 'assets/images/blue-marker.png';
        vm.linkToMap = 'https://www.google.com/maps/dir/';
        vm.branchListService = branchListService;

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
        vm.markerInfo = null;
        vm.updateSearch = false;

        vm.updateMarkers = updateMarkers;
        vm.onUserEvent = onUserEvent;
        vm.setUserLocationMarker = setUserLocationMarker;
        vm.createMarkers = createMarkers;
        vm.clearMarkers = clearMarkers;
        vm.showInfoWindow = showInfoWindow;


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

                    if(vm.position){
                        vm.updateSearch = false;
                        vm.position = angular.copy(vm.position);
                        console.log('position on init', vm.position);
                        if(!_.isEmpty(vm.position)) {
                            vm.mapPromise.then(function () {
                                vm.map.panTo(vm.position);
                                vm.map.setZoom(13);
                                vm.setUserLocationMarker(vm.position);
                                search(vm.position);
                                vm.updateSearch = true;
                            });
                        }
                        else{
                            vm.setUserLocationMarker(null);
                        }

                    }

                    vm.map.addListener('dragend', vm.onUserEvent);
                    vm.map.addListener('zoom_changed', vm.onUserEvent);

                    vm.isLoading = false;
                });
        };
        vm.$onChanges = function(changes){

            if(changes.position ){
                vm.updateSearch = false;
                vm.position = angular.copy(changes.position.currentValue);
                console.log('position on change', vm.position);
                if(!_.isEmpty(vm.position)) {
                    vm.mapPromise.then(function () {
                        vm.map.panTo(vm.position);
                        vm.map.setZoom(13);
                        vm.setUserLocationMarker(vm.position);
                        search(vm.position);
                        vm.updateSearch = true;
                    });
                }
                else{
                    vm.setUserLocationMarker(null);
                }

            }
            if(changes.locationList){

                vm.locationList = angular.copy(changes.locationList.currentValue);
            }

        /*    if(changes.markerList){

                vm.markerList = angular.copy(changes.markerList.currentValue);

                changeMarkerList();

            }*/
        };

        vm.$onDestroy = function(){
            vm.infoWindow.close();
            if(vm.markerInfo){
                vm.markerInfo = null;
            }
            if (vm.userLocationMarker){
                vm.userLocationMarker.setMap(null);
                vm.userLocationMarker = null;
            }
            vm.clearMarkers();
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

       // function changeMarkerList(){

       // }


        function onUserEvent(){
            if(vm.userLocationMarker && vm.updateSearch){
                search(vm.userLocationMarker.getPosition());
            }
        }

        function updateMarkers(list){
           // vm.onUpdateMarkers({markers: list});

            //changeMarkerList();
            vm.branchListService.markers = [];
            angular.copy(list, vm.branchListService.markers);
            vm.clearMarkers();
            console.log('marker list update', vm.branchListService.markers);
            if(!_.isEmpty(vm.branchListService.markers)){
                vm.mapPromise.then(function(){
                    vm.createMarkers();

                });
            }
        }

        function setUserLocationMarker(LatLng){
            if (vm.userLocationMarker){
                vm.userLocationMarker.setMap(null);
                vm.userLocationMarker = null;
            }
            if(LatLng) {
                vm.userLocationMarker = new google.maps.Marker({
                    position: LatLng,
                    map: vm.map
                });
            }

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
            _.forEach(vm.branchListService.markers, function(value, key){
                vm.markers[key] = new google.maps.Marker({
                    position: vm.branchListService.markers[key].geoLocation,
                    icon: vm.pathToIcon
                });
                vm.markers[key].customInfo = vm.branchListService.markers[key].address;
                vm.markers[key].id = vm.branchListService.markers[key].id;
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


        function search(currentPosition){
            console.log('currentPosition lat', currentPosition.lat());
            console.log('currentPosition lng', currentPosition.lng());

            var filteredList = filterMarkers(currentPosition);
            vm.updateMarkers(filteredList);
        }

        function filterMarkers(currentPosition){

            var bounds = vm.map.getBounds();
            var counter = 0;

            var sortedList = sortMarkers(currentPosition);
            var filteredList = isContain(sortedList, bounds);

            if(filteredList.length === 0 && !vm.updateSearch){
                bounds.extend(sortedList[0].LatLng); //get the first closest
                vm.map.fitBounds(bounds);
                vm.map.setCenter(bounds.getCenter());
                filteredList = isContain(sortedList, vm.map.getBounds());
                console.log('newFilteredList');
                console.log(filteredList);
            }


            return filteredList;
        }

        function sortMarkers(currentPosition){
            var sortedList = [];
            var LatLng = {};

            _.forEach(vm.locationList, function(value, key){
                LatLng = new google.maps.LatLng(vm.locationList[key].geoLocation.lat, vm.locationList[key].geoLocation.lng);
                sortedList.push(vm.locationList[key]);

                sortedList[key].distance = _.round(google.maps.geometry.spherical.computeDistanceBetween(LatLng, currentPosition) / 1000, 1);
                sortedList[key].LatLng = LatLng;
            });

            sortedList = _(sortedList)
                .orderBy('distance', 'asc')
                .value();

            console.log('sortedList');
            console.log(sortedList);

            return sortedList;
        }

        function isContain(sortedList, bounds){
            var filteredList = [];

            _.forEach(sortedList, function(value, key){
                if(bounds.contains(sortedList[key].LatLng)){
                    filteredList.push(sortedList[key]);
                }
            });


            console.log('filteredList');
            console.log(filteredList);

            return filteredList;
        }
    }

})();





