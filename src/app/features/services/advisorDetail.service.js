(function () {
    'use strict';

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


            server.get(BASE_URL + ENDPOINT_URI + '/advisors/' + advisorID, false, 'localStorage', false)
                .then(function(result) {
                    if(result.data){

                        service.advisorDetail =result.data;
                        service.advisorDetail.userMarker = {geoLocation: {lat: service.advisorDetail.partialBranchInfo.geoLocation.lat, lng: service.advisorDetail.partialBranchInfo.geoLocation.lng}, zoom: 15};
                        if(service.advisorDetail.partialBranchInfo.address1){service.advisorDetail.partialBranchInfo.address1.split(' ').join('+');}
                        if(service.advisorDetail.partialBranchInfo.address2){service.advisorDetail.partialBranchInfo.address2.split(' ').join('+');}
                        if(service.advisorDetail.partialBranchInfo.city){service.advisorDetail.partialBranchInfo.city.split(' ').join('+')}
                        service.advisorDetail.googleMapAddressArray =[service.advisorDetail.partialBranchInfo.address1, service.advisorDetail.partialBranchInfo.address2, service.advisorDetail.partialBranchInfo.city];
                        service.advisorDetail.googleMapJoinedAddress = service.advisorDetail.googleMapAddressArray.join("+");
                    }
                    else{
                        service.advisorDetail = false;
                    }

                    return service.advisorDetail;

                });
        }


    }

})();


