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


            server.get(BASE_URL + ENDPOINT_URI + '/advisors', false, 'localStorage', false)
                .then(function(result) {
                    if(result.data){
                        service.advisorDetail =result.data;
                        console.log('service to get advisor details', service.advisorDetail);
                        service.advisorDetail;
                    }
                    else{
                        service.advisorDetail = false;
                    }

                    return service.advisorDetail;

                });
        }


    }

})();


