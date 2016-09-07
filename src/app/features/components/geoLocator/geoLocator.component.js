
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

            //var autocomplete = document.getElementById('place');

            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(function(position){
                    var currentPosition = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    vm.geocoder.geocode({'location': currentPosition}, function(results, status){
                        if(status === google.maps.GeocoderStatus.OK){
                            if(results[0]){
                                vm.updatePosition(results[0].geometry.location);
                                vm.updateLocation(results[0].formatted_address);
                            }
                        }
                    });
                }, function(){
                    handleLocationError();
                });
            }
            else{
                handleLocationError();
            }


        }

        function handleLocationError(){
            vm.setMessage({message: {'cancel': 'branchList.validation.notValidAddress'}});
            vm.resetMarkers({markers: []});
            vm.updatePosition({});
            vm.updateLocation('');
        }


    }

})();





