
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
        'GOOGLE_MAPS_URL',
        'branchListService',
        'stateTrackerService'

    ];
    /* @ngInject */
    function branchListCtrl($rootScope, $scope, pageStateResolver, detectMobile, GOOGLE_MAPS_URL, branchListService, stateTrackerService
    ) {
        var vm = this;
        vm.pageStateResolver = pageStateResolver;
        vm.detectMobile = detectMobile;
        //vm.myMarker = {geoLocation: {lat: 43.6425662, lng: -79.3892455}, zoom: 15};
        //vm.address = 'CN Tower, Toronto, ON M5V, Canada';

        vm.googleMapsUrl = GOOGLE_MAPS_URL+$rootScope.documentLanguage;

        vm.branchListService = branchListService;
        vm.isCompiled = false;
        vm.mapIsInitialized = false;
        vm.stateTrackerService = stateTrackerService;
        vm.stateTrackerService.isNameSearch = false;
        vm.stateTrackerService.isLocationSearch = true;
        vm.setPosition = setPosition;
        vm.setLocation = setLocation;
        vm.setMessage = setMessage;
        vm.setMarkers = setMarkers;



        var mapIsCompiled = $rootScope.$on('mapIsCompiled', function(event, param){
            console.log('Map is compiled');
            vm.isCompiled = true;
        });
        $scope.$on('$destroy', mapIsCompiled);

        var mapIsInitialized = $rootScope.$on('mapIsInitialized', function(event, param){
            console.log('map is initialized ');
            vm.map = param.map;
            vm.mapIsInitialized = true;
            $scope.$broadcast('mapIsInitialized2');
        });
        $scope.$on('$destroy', function() {
            mapIsInitialized();
            mapIsCompiled();
        });


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



        vm.branchListService.getBranchList();

        $rootScope.$emit('noData');

    }

})();





