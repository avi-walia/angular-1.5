
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
        'envConfigService',
        'branchListService',
        'stateTrackerService',
        '$stateParams',
        '$state'

    ];
    /* @ngInject */
    function branchListCtrl($rootScope, $scope, pageStateResolver, detectMobile, envConfigService, branchListService, stateTrackerService, $stateParams, $state
    ) {
        var vm = this;
        vm.pageStateResolver = pageStateResolver;
        vm.detectMobile = detectMobile;
        //vm.myMarker = {geoLocation: {lat: 43.6425662, lng: -79.3892455}, zoom: 15};
        //vm.address = 'CN Tower, Toronto, ON M5V, Canada';

        vm.googleMapsUrl = envConfigService.GOOGLE_MAPS_URL+$rootScope.documentLanguage;

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
        vm.locateMePosition = {};



        function parseLocation(location){

            return _.replace(location, new RegExp('\\+', 'g'), ' ');

        }
        //only do this if the route is main.advisorLocator.branchesQuery and this is the first time the user entered the application.
        //this is only if the user goes to the above route that passes a route parameter containing the query term
        if (stateTrackerService.previousState && stateTrackerService.previousState.name === '' && $state.current.name === "main.advisorLocator.branchesQuery") {
            vm.drupalQuery = parseLocation($stateParams.q);
            vm.branchListService.setLocation(vm.drupalQuery);
            if (!vm.drupalQuery) {
                vm.branchListService.setMessage({'cancel': 'branchList.validation.notValidAddress'});
            }
        }


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

    }

})();





