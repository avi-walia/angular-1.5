(function () {
    'use strict';

    angular
        .module('advisorLocator.features.searchByName')
        .service('advisorDetailService', advisorDetailService);

    advisorDetailService.$inject = [
        'advisorService'
    ];

    /* @ngInject */
    function advisorDetailService(advisorService) {
        var service = this;


        service.advisorDetail = [];

        service.getAdvisorDetail = getAdvisorDetail;

        service.advisorService = advisorService;


        function getAdvisorDetail(advisorID){
            service.advisors = service.advisorService.allAdvisors;
            _.forEach(service.advisors, function(advisor, index) {

                if(advisor.id === advisorID){
                    service.advisorDetail = advisor;

                    if(service.advisorDetail.partialBranchInfo.geoLocation){
                        service.advisorDetail.userMarker = {
                            geoLocation: {
                                lat: service.advisorDetail.partialBranchInfo.geoLocation.lat,
                                lng: service.advisorDetail.partialBranchInfo.geoLocation.lng
                            },
                            zoom: 15
                        };
                    }


                    service.advisorDetail.fullAddress =  (service.advisorDetail.partialBranchInfo.address1 + ', ' + service.advisorDetail.partialBranchInfo.city + ', ' +service.advisorDetail.partialBranchInfo.provinceAbbr+ ', ' +service.advisorDetail.partialBranchInfo.postalCode);
                }


            });

            return service.advisorDetail;

        }


    }

})();


