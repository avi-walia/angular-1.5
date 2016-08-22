
(function () {
    'use strict';

    angular
        .module('advisorLocator.features.searchByLocation')
        .component('autocomplete', {
            bindings: {
                setPosition: '&',
                setLocation: '&',
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
        'branchListService'
    ];
    /* @ngInject */
    function autocompleteCtrl( $rootScope, pageStateResolver, detectMobile, branchListService
    ) {
        var vm = this;
        vm.pageStateResolver = pageStateResolver;
        vm.branchListService = branchListService;
        vm.detectMobile = detectMobile;
        vm.loadParameters = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCwahusHkUZ-LOTVpawRSoKh-h2ktVbj2I&libraries=geometry,places&language='+$rootScope.documentLanguage;
        //vm.restriction = {country: 'ca'};
        vm.validation = {};


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
            if(vm.place.geometry) {
                vm.updatePosition(vm.place.geometry.location);
                vm.updateLocation(vm.place.formatted_address);
            }
            else{
                vm.branchListService.setMessage({'cancel': 'branchList.validation.notValidAddress'});
            }

        }

        function updatePlace(){
            if(vm.location===''){
                vm.branchListService.setMessage({'cancel': 'branchList.validation.notValidAddress'});
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





