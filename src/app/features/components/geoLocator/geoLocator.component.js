
(function () {
    'use strict';

    angular
        .module('advisorLocator.features.searchByLocation')
        .component('geoLocator', {
            bindings: {
                setPosition: '&',
                setLocation: '&',
                setMessage: '&',
                resetMarkers: '&'
            },
            controller: geoLocatorCtrl,
            templateUrl:'app/features/components/geoLocator/geoLocator.tpl.html'
        });


    /* @ngInject */

    geoLocatorCtrl.$inject = [

        'pageStateResolver',
        'detectMobile'


    ];
    /* @ngInject */
    function geoLocatorCtrl( pageStateResolver, detectMobile
    ) {
        var vm = this;
        vm.pageStateResolver = pageStateResolver;

        vm.detectMobile = detectMobile;

        vm.geocoder = new google.maps.Geocoder();

        vm.updatePlace = updatePlace;

        vm.updatePosition = updatePosition;
        vm.updateLocation = updateLocation;



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
                maximumAge: 600000
            };

            if(navigator.geolocation){

                navigator.geolocation.getCurrentPosition(getGeo, handleGeoHighAccuracyError, options);

            }
            else{
                vm.setMessage({message: {'cancel': 'branchList.validation.geoNotSupported'}});
                handleLocationError();
            }


        }

        function getGeo(position){
            var currentPosition = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            console.log('Accuracy ',position.coords.accuracy);
            vm.geocoder.geocode({'location': currentPosition}, function(results, status){
                if(status === google.maps.GeocoderStatus.OK){
                    if(results[0]){
                        vm.updatePosition(results[0].geometry.location);
                        vm.updateLocation(results[0].formatted_address);

                    }
                    else{
                        vm.setMessage({message: {'cancel': 'branchList.validation.noResults'}});
                        handleLocationError();
                    }
                }
                else{
                    vm.setMessage({message: {'cancel': 'branchList.validation.geoFailed'}});
                    handleLocationError();
                }

            });
        }

        function handleLocationError(){

            vm.resetMarkers({markers: []});
            vm.updatePosition({});
            vm.updateLocation('');
        }


        function handleGeoHighAccuracyError(error){
            var options = {
                enableHighAccuracy: false,
                timeout: Infinity,
                maximumAge: 600000
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





