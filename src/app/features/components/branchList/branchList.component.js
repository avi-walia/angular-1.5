
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
        '$scope',
        'pageStateResolver',
        'detectMobile',
        'branchListService'
    ];
    /* @ngInject */
    function branchListCtrl($scope, pageStateResolver, detectMobile, branchListService
    ) {
        var vm = this;
        vm.pageStateResolver = pageStateResolver;
        vm.detectMobile = detectMobile;
        //vm.myMarker = {geoLocation: {lat: 43.6425662, lng: -79.3892455}, zoom: 15};
        //vm.address = 'CN Tower, Toronto, ON M5V, Canada';

        vm.branchListService = branchListService;

        vm.setPosition = setPosition;
        vm.setLocation = setLocation;
        vm.setMessage = setMessage;
        vm.setMarkers = setMarkers;
        vm.openInfoWindow = openInfoWindow;

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
        vm.test = function() {
            //vm.branchListService;
        }

    }

})();





