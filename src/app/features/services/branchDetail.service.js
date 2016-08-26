(function () {
    'use strict';

    angular
        .module('advisorLocator.features.searchByLocation')
        .service('branchDetailService', branchDetailService);

    branchDetailService.$inject = [
        'server',
        'BASE_URL',
        'ENDPOINT_URI'
    ];

    /* @ngInject */
    function branchDetailService(server, BASE_URL, ENDPOINT_URI) {
        var service = this;


        service.advisorDetail = [];

        service.getBranchDetail = getBranchDetail;


        function getBranchDetail(branchID) {


            server.get(BASE_URL + ENDPOINT_URI + '/branches/123456', false, 'localStorage', false)
                .then(function(result) {
                    if(result.data){

                        service.branchDetail =result.data;
                        service.branchDetail.userMarker = {geoLocation: {lat: service.branchDetail.geoLocation.lat, lng: service.branchDetail.geoLocation.lng}, zoom: 15};

                    }
                    else{
                        service.branchDetail = false;
                    }

                    return service.branchDetail;

                });
        }


    }

})();


