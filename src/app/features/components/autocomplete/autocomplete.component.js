
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
                location: '<',
                map: '<'
            },
            controller: autocompleteCtrl,
            templateUrl:'app/features/components/autocomplete/autocomplete.tpl.html'
        });


    /* @ngInject */

    autocompleteCtrl.$inject = [
        '$rootScope',
        'pageStateResolver',
        'detectMobile',
        '$http',
        '$q',
        '$scope',
        '$timeout'

    ];
    /* @ngInject */
    function autocompleteCtrl( $rootScope, pageStateResolver, detectMobile, $http, $q, $scope, $timeout
    ) {
        var vm = this;
        var updateWhenReady = false;
        vm.pageStateResolver = pageStateResolver;

        vm.detectMobile = detectMobile;
        vm.loadParameters = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD6y9w2sHNaVOAQN3ESPmYe_tSxCBE6d-Q&libraries=geometry,places&language='+$rootScope.documentLanguage;
        vm.restriction = {country: 'ca'};


        vm.onPlaceChanged = onPlaceChanged;
        vm.updatePlace = updatePlace;
        vm.clearPlace = clearPlace;

        vm.updatePosition = updatePosition;
        vm.updateLocation = updateLocation;
        vm.onBlur = onBlur;
        vm.onFocus = onFocus;


        document.getElementById('place').focus();
/*
        $timeout(function() {
            document.getElementById('helpLine').setAttribute('aria-hidden', 'false');
        });*/
        function onBlur() {
            document.getElementById('place').setAttribute('aria-live', "off");
        }
        function onFocus() {
            document.getElementById('place').setAttribute('aria-live', "polite");
        }
        $timeout(function() {

            document.getElementById('noSearchCriteriaBranch').setAttribute('aria-hidden', "false");
        })

        var mapIsInitialized = $scope.$on('mapIsInitialized2', function(event, param){
            console.log('map is initialized from geolocator');
            if (updateWhenReady) {
                updateWhenReady = false;
                updatePlace();
            }
        });

        $scope.$on('$destroy', function() {
            mapIsInitialized();
        });

        function updatePosition(pos){
            console.log('update pos: ', pos);
            vm.setPosition({position: pos});
        }

        function updateLocation(loc){
            console.log('update loc: ', loc);
            vm.setLocation({location: loc});
        }


        function getPredictions(place){
        var deferred = $q.defer();
         vm.service.getPlacePredictions({input: place, componentRestrictions: {country: 'ca'}}, function (predictions, status) {

             if (status !== google.maps.places.PlacesServiceStatus.OK) {

                    deferred.reject(status);
                }
                else {
                    deferred.resolve(predictions);

                }
            });
            return deferred.promise;
        }

        function getPlace(){
            var deferred = $q.defer();
            vm.place = vm.autocomplete.getPlace();
            deferred.resolve(vm.place);
            return deferred.promise;
        }

        function onPlaceChanged(){
            getPlace().then(function(){
                vm.setMessage({message:{}});
                if(vm.place.geometry) {
                    vm.updatePosition(vm.place.geometry);
                    vm.updateLocation(vm.place.formatted_address);
                }
                else if(vm.place.name === ''){
                    vm.setMessage({message: {'cancel': 'branchList.validation.notValidAddress'}});
                    handleLocationError();
                }
                else{
                    getPredictions(vm.place.name).then(function(predictions){
                        selectFirstItem(predictions[0].place_id).then(function(place){
                                vm.updatePosition(place.geometry);
                                vm.updateLocation(place.formatted_address);

                        }, function(status){
                            console.log('error retrieving place: ', status);
                            vm.setMessage({message: {'cancel': 'branchList.validation.geoPositionUnavailable'}});
                            handleLocationError();
                        });
                    }, function(status){
                        console.log('error retrieving predictions: ', status);
                        vm.setMessage({message: {'cancel': 'branchList.validation.notValidAddress'}});
                        handleLocationError();
                    });

                }
            });


        }

        function selectFirstItem(place_id){

            var deferred = $q.defer();
            vm.placeService.getDetails({placeId: place_id}, function(place, status){
                if(status !== google.maps.places.PlacesServiceStatus.OK){
                    deferred.reject(status);
                }
                else{
                    deferred.resolve(place);
                }
            });
            return deferred.promise;

        }

        function updatePlace(){
            updateWhenReady = true;
            var autocompleteEl = document.getElementById('place');
            if(vm.location===''){
                vm.setMessage({message: {'cancel': 'branchList.validation.notValidAddress'}});
                handleLocationError();
            }
            else{
                google.maps.event.trigger(autocompleteEl, 'focus');

                google.maps.event.trigger(autocompleteEl, 'keydown', {
                    keyCode: 13
                });
                //google.maps.event.trigger(vm.autocomplete, 'place_changed');
            }

        }

        function clearPlace(){
            vm.location = '';
            vm.setMessage({message: {}});
            handleLocationError();
        }

        function handleLocationError(){
            vm.resetMarkers({markers: []});
            vm.updatePosition({});
            vm.updateLocation(vm.location);
        }

        function initializeAutocomplete(){

            var deferred = $q.defer();
            if(!vm.autocomplete) {
                vm.autocomplete = new google.maps.places.Autocomplete(document.getElementById('place'), {componentRestrictions: vm.restriction});
                vm.autocomplete.bindTo('bounds', vm.map);
                vm.autocomplete.addListener('place_changed', vm.onPlaceChanged);
            }
            if(!vm.service){
                vm.service = new google.maps.places.AutocompleteService();
            }
            if(!vm.placeService){
                vm.placeService = new google.maps.places.PlacesService(vm.map);
            }

            deferred.resolve(vm.autocomplete);
            return deferred.promise;

        }
        //instead of rendering the autocomplete component after the map is rendered, render the component first, but initialize the google related functionality after the map is initialized.
        var waitForMapToInitialize = null;
        waitForMapToInitialize = $scope.$on('mapIsInitialized2', function () {
            $timeout(function() {
                initializeAutocomplete().then(function() {
                    if (vm.location !== '' && vm.location !== undefined) {

                        getPredictions(vm.location).then(function (predictions) {
                            selectFirstItem(predictions[0].place_id).then(function (place) {

                                vm.updatePosition(place.geometry);
                                vm.updateLocation(place.formatted_address);

                            }, function (status) {
                                console.log('error retrieving place: ', status);
                                vm.setMessage({message: {'cancel': 'branchList.validation.geoPositionUnavailable'}});
                                handleLocationError();
                            });
                        }, function (status) {
                            console.log('error retrieving predictions: ', status);
                            vm.setMessage({message: {'cancel': 'branchList.validation.notValidAddress'}});
                            handleLocationError();
                        });

                    }
                });
            });
            waitForMapToInitialize();
        });
        $scope.$on('$destroy', function() {
           if (waitForMapToInitialize){
               waitForMapToInitialize();
           }
        });
    }
})();





