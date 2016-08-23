(function () {
    'use strict';
//referencing branch list service
    angular
        .module('advisorLocator.features.searchByName')
        .service('advisorDetailService', advisorDetailService);

    advisorDetailService.$inject = [
        'server',
        'BASE_URL',
        'ENDPOINT_URI'
    ];

    /* @ngInject */
    function advisorDetailService(server, BASE_URL, ENDPOINT_URI) {
        var service = this;


        service.advisorDetail = [];

        service.getAdvisorDetail = getAdvisorDetail;


        function getAdvisorDetail(advisorID) {


            server.get(BASE_URL + ENDPOINT_URI + '/advisors/30610', false, 'localStorage', false)
                .then(function(result) {
                    if(result.data){

                        service.advisorDetail =result.data;
                        service.advisorDetail.userMarker = {geoLocation: {lat: service.advisorDetail.partialBranchInfo.geoLocation.lat, lng: service.advisorDetail.partialBranchInfo.geoLocation.lng}, zoom: 15};

                    }
                    else{
                        service.advisorDetail = false;
                    }

                    return service.advisorDetail;

                });
        }


    }

})();


