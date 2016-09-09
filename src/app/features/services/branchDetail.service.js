(function () {
    'use strict';

    angular
        .module('advisorLocator.features.searchByLocation')
        .service('branchDetailService', branchDetailService);

    branchDetailService.$inject = [
        'server',
        'BASE_URL',
        'ENDPOINT_URI',
        'branchListService'
    ];

    /* @ngInject */
    function branchDetailService(server, BASE_URL, ENDPOINT_URI, branchListService) {
        var service = this;


        service.advisorDetail = [];

        service.getBranchDetail = getBranchDetail;

        service.branchListService = branchListService;




        function getBranchDetail(branchID) {

            service.branches = service.branchListService.branchList;
            console.log("branch list", service.branches);
            console.log("branch id", branchID);
            _.forEach(service.branches, function(branch, index) {

                if(branch.id == branchID){
                    console.log("branch list with id", branch);
                    service.branchDetail = branch;
                    service.branchDetail.userMarker = {
                        geoLocation: {
                            lat: service.branchDetail.geoLocation.lat,
                            lng: service.branchDetail.geoLocation.lng},
                        zoom: 15
                    };

                    service.branchDetail.fullAddress =  (service.branchDetail.address1.concat( service.branchDetail.address2)).replace(/\s/g,'+');
                    service.branchDetail.branchManagers =[];
                    if(service.branchDetail.managerName){

                        service.branchDetail.branchManagers.push({
                                    name: service.branchDetail.managerName,
                                    email: service.branchDetail.managerEmail,
                                    phone: service.branchDetail.managerPhone
                                })
                    }

                    if(service.branchDetail.coManagerName){
                        service.branchDetail.branchManagers.push({
                            name: service.branchDetail.coManagerName,
                            email: service.branchDetail.coManagerEmail,
                            phone: service.branchDetail.coManagerPhone
                        })
                    }

                    if(service.branchDetail.coManager2Name){
                        service.branchDetail.branchManagers.push({
                            name: service.branchDetail.coManager2Name,
                            email: service.branchDetail.coManager2Email,
                            phone: service.branchDetail.coManager2Phone
                        })
                    }

                }


            });

        }


    }

})();


