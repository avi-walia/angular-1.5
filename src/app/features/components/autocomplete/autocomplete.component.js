
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
        '$timeout'

    ];
    /* @ngInject */
    function autocompleteCtrl( $rootScope, pageStateResolver, detectMobile, $timeout
    ) {
        var vm = this;
        vm.pageStateResolver = pageStateResolver;

        vm.detectMobile = detectMobile;
        vm.loadParameters = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCwahusHkUZ-LOTVpawRSoKh-h2ktVbj2I&libraries=geometry,places&language='+$rootScope.documentLanguage;
        //vm.restriction = {country: 'ca'};

        vm.onPlaceChanged = onPlaceChanged;
        vm.updatePlace = updatePlace;

        vm.updatePosition = updatePosition;
        vm.updateLocation = updateLocation;


        vm.service = new google.maps.places.AutocompleteService();




        function updatePosition(pos){
            vm.setPosition({position: pos});
        }

        function updateLocation(loc){
            vm.setLocation({location: loc});
        }


        function getPredictions(place){

           return vm.service.getPlacePredictions({input: place}, function(predictions, status){
                if(status !== google.maps.places.PlacesServiceStatus.OK){
                    return;
                }

               if(predictions.length > 0){
                   selectFirstItem();
               }
               else{
                   vm.setMessage({message:{'cancel': 'branchList.validation.notValidAddress'}});
                   vm.resetMarkers({markers: []});
                   vm.updatePosition({});
                   vm.updateLocation('');
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
                vm.resetMarkers({markers: []});
                vm.updatePosition({});
                vm.updateLocation('');
            }
            else{
                var autocomplete = document.getElementById('place');

                google.maps.event.trigger(autocomplete, 'focus');
                google.maps.event.trigger(autocomplete, 'keydown', {
                    keyCode: 13
                });
            }

        }

       /*vm.$onChanges = function(changes){
            if(changes.location){
                if(changes.location.currentValue !== ''){
                    if(changes.location.currentValue != changes.location.previousValue){
                        vm.location = changes.location.currentValue;
                        updatePlace();
                    }



                    //$timeout(function() {}, 500);


                }

            }
        };*/
    }

})();





