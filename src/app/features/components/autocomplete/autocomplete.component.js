
(function () {
    'use strict';

    angular
        .module('advisorLocator.features.searchByLocation')
        .component('autocomplete', {
            bindings: {
                setPosition: '&',
                setLocation: '&',
                setMessage: '&',
                resetMarkers: '&',
                location: '<'
            },
            controller: autocompleteCtrl,
            templateUrl:'app/features/components/autocomplete/autocomplete.tpl.html'
        });


    /* @ngInject */

    autocompleteCtrl.$inject = [
        '$rootScope',
        'pageStateResolver',
        'detectMobile',
        '$http'

    ];
    /* @ngInject */
    function autocompleteCtrl( $rootScope, pageStateResolver, detectMobile, $http
    ) {
        var vm = this;
        vm.pageStateResolver = pageStateResolver;

        vm.detectMobile = detectMobile;
        vm.loadParameters = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD6y9w2sHNaVOAQN3ESPmYe_tSxCBE6d-Q&libraries=geometry,places&language='+$rootScope.documentLanguage;
        //vm.restriction = {country: 'ca'};

        vm.onPlaceChanged = onPlaceChanged;
        vm.updatePlace = updatePlace;

        vm.updatePosition = updatePosition;
        vm.updateLocation = updateLocation;


        vm.service = new google.maps.places.AutocompleteService();


        function updatePosition(pos){
            console.log('update pos: ', pos);
            vm.setPosition({position: pos});
        }

        function updateLocation(loc){
            console.log('update loc: ', loc);
            vm.setLocation({location: loc});
        }


        function getPredictions(place){
            return vm.service.getPlacePredictions({input: place}, function (predictions, status) {
                if (status !== google.maps.places.PlacesServiceStatus.OK) {
                    return;
                }

                if (predictions.length > 0) {
                    selectFirstItem();
                }
                else {
                    vm.setMessage({message: {'cancel': 'branchList.validation.geoPositionUnavailable'}});
                    handleLocationError();
                }
            });
        }

        function onPlaceChanged(){
            vm.place = this.getPlace();
            vm.setMessage({message:{}});
            if(vm.place.geometry) {
                vm.updatePosition(vm.place.geometry.location);
                vm.updateLocation(vm.place.formatted_address);
            }
            else{
                getPredictions(vm.place.name);
            }

        }

        function selectFirstItem(){
            var autocomplete = document.getElementById('place');
            //google.maps.event.trigger( /** @type {!HTMLInputElement} */ autocomplete, 'place_changed');

            google.maps.event.trigger(autocomplete, 'focus');
            google.maps.event.trigger(autocomplete, 'places_changed');
            google.maps.event.trigger(autocomplete, 'keydown', {
                     keyCode: 40
            });
            google.maps.event.trigger(autocomplete, 'keydown', {
                keyCode: 13
            });
        }

        function updatePlace(){
            if(vm.location===''){
                vm.setMessage({message: {'cancel': 'branchList.validation.notValidAddress'}});
                handleLocationError();
            }
            else{
                var autocomplete = document.getElementById('place');

                google.maps.event.trigger(autocomplete, 'focus');
                google.maps.event.trigger(autocomplete, 'keydown', {
                    keyCode: 13
                });
            }

        }

        function handleLocationError(){
            vm.resetMarkers({markers: []});
            vm.updatePosition({});
            vm.updateLocation('');
        }



        vm.$onInit = function(){

                if(vm.location !== '' && vm.location !== undefined){

                        $http.get('https://maps.google.com/maps/api/geocode/json?address=' + vm.location + '&components=country:CA&sensor=false').success(
                            function(mapData) {
                                console.log('mapData: ', mapData);
                                if (mapData.results.length) {

                                    var LatLng2 = new google.maps.LatLng(mapData.results[0].geometry.location.lat, mapData.results[0].geometry.location.lng);
                                    updatePosition(LatLng2);
                                    updateLocation(mapData.results[0].formatted_address);

                                } else {
                                    $http.get('https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyD6y9w2sHNaVOAQN3ESPmYe_tSxCBE6d-Q&components=country:CA&input='+ vm.location).then(
                                        function(data) {
                                            console.log('autocomplete data: ', data);
                                            if (data.data.predictions.length) {
                                                $http.get('https://maps.googleapis.com/maps/api/place/details/json?placeid=' + data.data.predictions[0].place_id + '&key=AIzaSyD6y9w2sHNaVOAQN3ESPmYe_tSxCBE6d-Q').then(
                                                    function(placeData){
                                                        console.log('place data: ', placeData);
                                                        var LatLng2 = new google.maps.LatLng(placeData.data.result.geometry.location.lat, placeData.data.result.geometry.location.lng);
                                                        updatePosition(LatLng2);
                                                        updateLocation(placeData.data.result.formatted_address);
                                                    },
                                                    function(errorData) {
                                                        console.log('error retrieving place: ', errorData);
                                                        vm.setMessage({message: {'cancel': 'branchList.validation.geoPositionUnavailable'}});
                                                        handleLocationError();
                                                    }
                                                );
                                            }
                                        }, function(error){
                                            console.log('autocomplete error: ', error);
                                            vm.setMessage({message: {'cancel': 'branchList.validation.geoPositionUnavailable'}});
                                            handleLocationError();
                                        }
                                    );
                                }
                            },
                            function(errorData) {
                                console.log('Error looking up address: ', errorData);
                                vm.setMessage({message: {'cancel': 'branchList.validation.geoPositionUnavailable'}});
                                handleLocationError();
                            }

                        );



                }

        };
    }

})();





