
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
        'detectMobile'

    ];
    /* @ngInject */
    function autocompleteCtrl( $rootScope, pageStateResolver, detectMobile
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


        function updatePosition(pos){
            vm.setPosition({position: pos});
        }

        function updateLocation(loc){
            vm.setLocation({location: loc});
        }


        function onPlaceChanged(){
            vm.place = this.getPlace();
            vm.setMessage({message:{}});
            if(vm.place.geometry) {
                vm.updatePosition(vm.place.geometry.location);
                vm.updateLocation(vm.place.formatted_address);
            }
            else{
                vm.setMessage({message:{'cancel': 'branchList.validation.notValidAddress'}});
                vm.resetMarkers({markers: []});
                vm.updatePosition({});
                vm.updateLocation('');
            }

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
                //google.maps.event.trigger( /** @type {!HTMLInputElement} */ autocomplete, 'place_changed');

                google.maps.event.trigger(autocomplete, 'focus');
                google.maps.event.trigger(autocomplete, 'keydown', {
                    keyCode: 13
                });
            }

        }


        vm.$onChanges = function(changes){
            if(changes.location){
                if(changes.location.currentValue !== ''){
                    vm.location = changes.location.currentValue;
                }

            }
        };
    }

})();





