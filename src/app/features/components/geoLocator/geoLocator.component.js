
(function () {
    'use strict';

    angular
        .module('advisorLocator.features.searchByLocation')
        .component('geoLocator', {
            bindings: {
                setPosition: '&',
                setLocation: '&',
                setMessage: '&',
                resetMarkers: '&',
                currentPosition: '='
            },
            controller: geoLocatorCtrl,
            templateUrl:'app/features/components/geoLocator/geoLocator.tpl.html'
        });


    /* @ngInject */

    geoLocatorCtrl.$inject = [

        'pageStateResolver',
        'detectMobile',
        '$q'


    ];
    /* @ngInject */
    function geoLocatorCtrl( pageStateResolver, detectMobile, $q
    ) {
        var vm = this;
        vm.pageStateResolver = pageStateResolver;

        vm.detectMobile = detectMobile;

        vm.geocoder = new google.maps.Geocoder();

        vm.updatePlace = updatePlace;

        vm.updatePosition = updatePosition;
        vm.updateLocation = updateLocation;
        vm.loader = false;
        function updatePosition(pos){
            vm.setPosition({position: pos});
        }

        function updateLocation(loc){
            vm.setLocation({location: loc});
        }



        function updatePlace(){

            var options = {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 60000
            };
            if(navigator.geolocation){

                navigator.geolocation.getCurrentPosition(getGeo, handleGeoHighAccuracyError, options);

            }
            else{
                vm.setMessage({message: {'cancel': 'branchList.validation.geoNotSupported'}});
                handleLocationError();
            }


        }

        function geoCoderCall(currentPosition){
            var deferred = $q.defer();

            vm.geocoder.geocode({'location': currentPosition}, function(results, status){
                if(status === google.maps.GeocoderStatus.OK){
                    deferred.resolve(results[0]);
                }
                else{
                    deferred.reject(status);
                }

            });

            return deferred.promise;
        }

        function getGeo(position){
            vm.loader = true;
            var currentPosition = {
                lat: null,
                lng: null
            }
            if (vm.currentPosition.hasOwnProperty('location')) {
                currentPosition.lat = vm.currentPosition.location.lat();
                currentPosition.lng = vm.currentPosition.location.lng();
            }
            var newCurrentPosition = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            //console.log("oldPos === newPos: ", angular.equals(currentPosition, newCurrentPosition));
            //if (!angular.equals(currentPosition, newCurrentPosition)) {
            console.log('currentPosition1123: ', currentPosition.lat);
            console.log('currentPosition1123: ', newCurrentPosition.lat);
            console.log('currentPosition1123: ', currentPosition.lat !== newCurrentPosition.lat);
            if(currentPosition.lat !== newCurrentPosition.lat || currentPosition.lng !== newCurrentPosition.lng){
                console.log('testin1123');
                currentPosition = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };


                console.log('Accuracy ', position.coords.accuracy);
                geoCoderCall(currentPosition).then(function (result) {
                    if (result) {
                        vm.setMessage({message: {}});
                        vm.updatePosition(result.geometry);
                        vm.updateLocation(result.formatted_address);
                        vm.loader = false;
                    }
                    else {
                        vm.setMessage({message: {'cancel': 'branchList.validation.noResults'}});
                        handleLocationError();
                        vm.loader = false;
                    }

                }, function (status) {
                    console.log('error getting geolocation: ', status);
                    vm.setMessage({message: {'cancel': 'branchList.validation.geoFailed'}});
                    handleLocationError();
                    vm.loader = false;
                });
            } else {
                vm.loader = false;
            }

        }

        function handleLocationError(){
            console.log('broken1123');
            vm.resetMarkers({markers: []});
            vm.updatePosition({});
            vm.updateLocation('');
        }


        function handleGeoHighAccuracyError(error){
            var options = {
                enableHighAccuracy: false,
                timeout: Infinity,
                maximumAge: 60000
            };
            navigator.geolocation.getCurrentPosition(getGeo, handleGeoLowAccuracyError, options);

        }

        function handleGeoLowAccuracyError(error){
            if(error.code === 1){
                vm.setMessage({message: {'cancel': 'branchList.validation.geoPermissionsDenied'}});
            }
            else if(error.code === 2){
                vm.setMessage({message: {'cancel': 'branchList.validation.geoPositionUnavailable'}});
            }
            else if(error.code === 3){
                vm.setMessage({message: {'cancel': 'branchList.validation.geoTimeout'}});
            }
            else{
                vm.setMessage({message: {'cancel': 'branchList.validation.geoUnknown'}});
            }

            handleLocationError();
        }




    }

})();





