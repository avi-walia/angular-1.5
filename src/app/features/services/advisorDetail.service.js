(function () {
    'use strict';

    angular
        .module('advisorLocator.features.searchByName')
        .service('advisorDetailService', advisorDetailService);

    advisorDetailService.$inject = [
        'server',
        'BASE_URL',
        'ENDPOINT_URI',
        'advisorService'
    ];

    /* @ngInject */
    function advisorDetailService(server, BASE_URL, ENDPOINT_URI, advisorService) {
        var service = this;


        service.advisorDetail = [];

        service.getAdvisorDetail = getAdvisorDetail;

        service.advisorService = advisorService;


        function getAdvisorDetail(advisorID){
            service.advisors = service.advisorService.allAdvisors;
            _.forEach(service.advisors, function(advisor, index) {

                if(advisor.id == advisorID){
                    service.advisorDetail = advisor;
                    service.advisorDetail.userMarker = {geoLocation: {lat: service.advisorDetail.partialBranchInfo.geoLocation.lat, lng: service.advisorDetail.partialBranchInfo.geoLocation.lng}, zoom: 15};
                    if(service.advisorDetail.partialBranchInfo.address1){service.advisorDetail.partialBranchInfo.address1.split(' ').join('+');}
                    if(service.advisorDetail.partialBranchInfo.address2){service.advisorDetail.partialBranchInfo.address2.split(' ').join('+');}
                    if(service.advisorDetail.partialBranchInfo.city){service.advisorDetail.partialBranchInfo.city.split(' ').join('+')}
                    service.advisorDetail.googleMapAddressArray =[service.advisorDetail.partialBranchInfo.address1, service.advisorDetail.partialBranchInfo.address2, service.advisorDetail.partialBranchInfo.city];
                    service.advisorDetail.googleMapJoinedAddress = service.advisorDetail.googleMapAddressArray.join("+");
                    service.titlesLength = service.advisorDetail.titlesEN;
                }


            });
        }


    }

})();


