
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
        'NgMap',
        'branchListService'
    ];
    /* @ngInject */
    function autocompleteCtrl( $rootScope, pageStateResolver, detectMobile, NgMap, branchListService
    ) {
        var vm = this;
        vm.pageStateResolver = pageStateResolver;
        vm.detectMobile = detectMobile;
        vm.branchListService = branchListService;
        vm.loadParameters = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCwahusHkUZ-LOTVpawRSoKh-h2ktVbj2I&libraries=geometry,places&language='+$rootScope.documentLanguage;
        vm.restriction = {'country': 'ca'};

        vm.placeholder = $rootScope.documentLanguage === 'en' ? 'Enter a location' : 'French Enter a location';

        vm.onPlaceChanged = onPlaceChanged;

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





