
(function () {
    'use strict';

    angular
        .module('advisorLocator')
        .component('searchBy', {
            transpose: true,
            controller: searchByCtrl,
            templateUrl:'app/features/components/searchBy/searchBy.tpl.html'
        });


    /* @ngInject */

    searchByCtrl.$inject = [
        '$state'
    ];
    /* @ngInject */
    function searchByCtrl(
        $state
    ) {
        console.log('searchBy loaded');
        var vm = this;
        //set the default value of the searchBy selector to the type of search of the current page based off route.
        vm.searchBy = $state.current.url === '/advisors' ? 'name' : 'location';
        vm.navigate = navigate;

        vm.isBranchesQuery = $state.current.name === "main.advisorLocator.branchesQuery";

        //function to navigate between search pages.
        function navigate(searchBy) {
            if (searchBy === 'location') {
                $state.go('main.advisorLocator.branchList');
            } else {
                $state.go('main.advisorLocator.advisorList');
            }
        }
    }

})();





