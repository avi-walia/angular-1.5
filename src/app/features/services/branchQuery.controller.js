
(function () {
    'use strict';


    angular
        .module('advisorLocator.features.searchByLocation')
        .controller('branchQueryCtrl', branchQueryCtrl);

    /* @ngInject */

    branchQueryCtrl.$inject = [
        '$state',
        '$stateParams',
        'branchListService',
        '$timeout'
    ];
    /* @ngInject */
    function branchQueryCtrl($state, $stateParams, branchListService, $timeout
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

        vm.drupalQuery = parseLocation($stateParams.q);
        vm.branchListService.setLocation( vm.drupalQuery);
        if (!vm.drupalQuery) {
            vm.branchListService.setMessage({'cancel': 'branchList.validation.notValidAddress'});
        }
        $timeout(function(){
            $state.go('main.advisorLocator.branchList');
        });


    }

})();





