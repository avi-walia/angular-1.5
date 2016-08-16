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

        service.getBranchList = getBranchList;
        service.setPosition = setPosition;
        service.getPosition = getPosition;

        function getBranchList(account) {
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
        }

        function getPosition(){
            return service.position;
        }


    }

})();
