
(function () {
    'use strict';

    angular
        .module('advisorLocator.features.searchByLocation')
        .component('branchList', {
            controller: branchListCtrl,
            templateUrl:'app/features/components/branchList/branchList.tpl.html'
        });


    /* @ngInject */

    branchListCtrl.$inject = [
        '$rootScope',
        '$scope',
        'pageStateResolver',
        'detectMobile',
        'branchListService'
    ];
    /* @ngInject */
    function branchListCtrl($rootScope, $scope, pageStateResolver, detectMobile, branchListService
    ) {
        var vm = this;
        vm.pageStateResolver = pageStateResolver;
        vm.detectMobile = detectMobile;
        //vm.myMarker = {geoLocation: {lat: 43.6425662, lng: -79.3892455}, zoom: 15};
        //vm.address = 'CN Tower, Toronto, ON M5V, Canada';

        vm.googleMapsUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCwahusHkUZ-LOTVpawRSoKh-h2ktVbj2I&libraries=geometry,places&region=CA&language='+$rootScope.documentLanguage;

        vm.branchListService = branchListService;
        vm.isCompiled = false;
        vm.mapIsInitialized = false;


        vm.setPosition = setPosition;
        vm.setLocation = setLocation;
        vm.setMessage = setMessage;
        vm.setMarkers = setMarkers;
        vm.openInfoWindow = openInfoWindow;


        var mapIsCompiled = $rootScope.$on('mapIsCompiled', function(event, param){
            console.log('Map is compiled');
            vm.isCompiled = true;
        });
        $scope.$on('$destroy', mapIsCompiled);

        var mapIsInitialized = $rootScope.$on('mapIsInitialized', function(event, param){
            console.log('map is initialized ');
            vm.map = param.map;
            vm.mapIsInitialized = true;
        });
        $scope.$on('$destroy', mapIsInitialized);


        function setPosition(position){
            vm.branchListService.setPosition(position);
        }


        function setLocation(location){
            vm.branchListService.setLocation(location);
        }

        function setMessage(message){
            vm.branchListService.setMessage(message);
        }

        function setMarkers(markers){
            vm.branchListService.setMarkers(markers);
        }


        function openInfoWindow(id){

            $scope.$emit('infoWindow', {id: id});
        }

        vm.branchListService.getBranchList();


    }

})();





