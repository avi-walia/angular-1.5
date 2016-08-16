
(function () {
    'use strict';

    angular
        .module('advisorLocator.features.searchByLocation')
        .component('autocomplete', {
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

        vm.onPlaceChanged = onPlaceChanged;

        function onPlaceChanged(){
            vm.place = this.getPlace();
            vm.branchListService.position = vm.place.geometry.location;

        }
    }

})();





