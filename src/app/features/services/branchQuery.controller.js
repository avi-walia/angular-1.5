
(function () {
    'use strict';


    angular
        .module('advisorLocator.features.searchByLocation')
        .controller('branchQueryCtrl', branchQueryCtrl);

    /* @ngInject */

    branchQueryCtrl.$inject = [
        '$state',
        '$stateParams',
        'branchListService',
        '$http'
    ];
    /* @ngInject */
    function branchQueryCtrl($state, $stateParams, branchListService, $http
    ) {
        var vm = this;


        vm.branchListService = branchListService;


        vm.setLocation = setLocation;


        function setLocation(location){
            vm.branchListService.setLocation(location);
        }

        function parseLocation(location){

            return _.replace(location, new RegExp('\\+', 'g'), ' ');

        }
/*
        vm.branchListService.getBranchList().then(function(){
            vm.drupalQuery = parseLocation($stateParams.q);
            vm.setLocation(parseLocation(vm.drupalQuery));

        });*/
            /*
            $http.jsonp("https://maps.googleapis.com/maps/api/place/js/PlaceService.GetPlaceDetails?2sen&8sChIJpTvG15DL1IkRd8S0KlBVNTI&10e3&key=AIzaSyCwahusHkUZ-LOTVpawRSoKh-h2ktVbj2I&callback=JSON_CALLBACK&token=119628").then(function (data) {
                console.log('data: ', data);
                $state.go('main.advisorLocator.branchList');
            }, function (data, error) {
                console.log('data: ', data);
                console.log('error: ', error);
            });
            */
            //$http.get('http://maps.google.com/maps/api/geocode/json?address=256+Doris+Ave,+North+York,+ON+M2N+6X8&sensor=false').success(function(mapData) {
        //var service = new google.maps.places.PlacesService(map);

        vm.drupalQuery = parseLocation($stateParams.q);

        $http.get('http://maps.google.com/maps/api/geocode/json?address=' + vm.drupalQuery + '&sensor=false').success(function(mapData) {
            console.log('mapData: ', mapData);
            if (mapData.results.length) {
                //vm.setLocation(parseLocation(vm.drupalQuery));
                var LatLng2 = new google.maps.LatLng(mapData.results[0].geometry.location.lat, mapData.results[0].geometry.location.lng)
                vm.branchListService.setPosition(LatLng2);
                vm.branchListService.setLocation(mapData.results[0].formatted_address);
                $state.go('main.advisorLocator.branchList');
            } else {
                $http.get('https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyD6y9w2sHNaVOAQN3ESPmYe_tSxCBE6d-Q&input='+ vm.drupalQuery).then(function(data) {
                    console.log('autocomplete data: ', data);
                    if (data.data.predictions.length) {
                        $http.get('https://maps.googleapis.com/maps/api/place/details/json?placeid=' + data.data.predictions[0].place_id + '&key=AIzaSyD6y9w2sHNaVOAQN3ESPmYe_tSxCBE6d-Q').then(function(placeData){
                            console.log('place data: ', placeData);
                            var LatLng2 = new google.maps.LatLng(placeData.data.result.geometry.location.lat, placeData.data.result.geometry.location.lng)
                            vm.branchListService.setPosition(LatLng2);
                            vm.branchListService.setLocation(placeData.data.result.formatted_address);
                            $state.go('main.advisorLocator.branchList');
                        });
                    }
                }, function(error){
                    console.log('autocomplete error: ', error);
                });
            }
        });


    }

})();





