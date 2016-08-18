(function () {
    'use strict';

    angular
        .module('advisorLocator.features.searchByLocation')
        .service('branchListService', branchListService);

    branchListService.$inject = [
        'server'
    ];

    /* @ngInject */
    function branchListService(server) {
        var service = this;

        service.branchListLoading = false;
        service.branchList = [];
        service.position = {};
        service.location = '';

        service.getBranchList = getBranchList;
        service.setPosition = setPosition;
        service.getPosition = getPosition;
        service.setLocation = setLocation;
        service.getLocation = getLocation;

        function getBranchList() {
            service.branchListLoading = true;

            return server.postSessionStorage('http://localhost:3001/branches', null)
                .then(function (result) {
                    service.branchList =result.data;
                    service.branchListLoading = false;

                    return result.data;
                });
        }

        function setPosition(position) {
            service.position = position;
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


    }

})();
