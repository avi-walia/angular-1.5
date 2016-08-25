(function () {
    'use strict';

    angular
        .module('advisorLocator.features.searchByLocation')
        .service('branchListService', branchListService);

    branchListService.$inject = [
        'server',
        'BASE_URL',
        'ENDPOINT_URI'
    ];

    /* @ngInject */
    function branchListService(server, BASE_URL, ENDPOINT_URI) {
        var service = this;

        service.branchListLoading = false;
        service.branchList = [];
        service.position = {};
        service.location = '';
        service.filteredMarkers = [];
        service.sortedMarkers = [];
        service.markers = [];
        service.branchListView = [];
        service.message = {};

        service.getBranchList = getBranchList;
        service.setPosition = setPosition;
        service.getPosition = getPosition;
        service.setLocation = setLocation;
        service.getLocation = getLocation;

        service.setMessage = setMessage;
        service.setMarkers = setMarkers;



        function getBranchList() {
            service.branchListLoading = true;

            return server.get(BASE_URL + ENDPOINT_URI + '/branches', false, 'localStorage', false)
                .then(function (result) {
                    service.branchList =result.data;
                    service.branchListLoading = false;

                    service.branchListView = _(result.data)
                        .map(function(item){
                            var fullAddress = item.address1 + ', ' + item.address2 + ', ' +  item.city + ', ' + item.provinceAbbr + ' ' +item.postalCode;
                            return {id: item.id, geoLocation: item.geoLocation, address: fullAddress, distance: 0};
                        })
                        .value();
                    console.log(service.branchListView);
                    return result.data;

                });
        }

        function setPosition(position) {
            service.position = angular.copy(position);
            console.log('branch service updated: '+ position);
        }

        function getPosition(){
            return service.position;
        }

        function setLocation(location) {
            service.location = location;
            console.log('branch service updated: '+ location);
        }

        function getLocation(){
            return service.location;
        }

        function setMessage(message){
            service.message = angular.copy(message);
        }

        function setMarkers(markers){
            service.markers = [];
            service.markers = angular.copy(markers);
        }


    }

})();
