
(function () {
    'use strict';


    angular
        .module('advisorLocator.features.searchByLocation')
        .controller('branchQueryCtrl', branchQueryCtrl);

    /* @ngInject */

    branchQueryCtrl.$inject = [
        '$state',
        '$stateParams',
        'branchListService'
    ];
    /* @ngInject */
    function branchQueryCtrl($state, $stateParams, branchListService
    ) {
        var vm = this;


        vm.branchListService = branchListService;


        vm.setLocation = setLocation;


        function setLocation(location){
            vm.branchListService.setLocation(location);
        }

        function parseLocation(location){

            return _.replace(location, new RegExp('\\+', 'g'), ' ');

        }

        vm.branchListService.getBranchList().then(function(){
            vm.drupalQuery = parseLocation($stateParams.q);
            vm.setLocation(parseLocation(vm.drupalQuery));

        });



        $state.go('main.advisorLocator.branchList');

    }

})();





