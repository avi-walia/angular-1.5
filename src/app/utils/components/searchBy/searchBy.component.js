
(function () {
    'use strict';

    angular
        .module('advisorLocator.utils')
        .component('searchBy', {
            transpose: true,
            bindings: {
                service: '='
            },
            controller: searchByCtrl,
            templateUrl:'app/utils/components/searchBy/searchBy.tpl.html'
        });


    /* @ngInject */

    searchByCtrl.$inject = [
        '$state'
    ];
    /* @ngInject */
    function searchByCtrl(
        $state
    ) {
        console.log('searchBy loaded')
        var vm = this;
        vm.searchBy = $state.current.url === '/advisors' ? 'name' : 'location';
        vm.navigate = navigate;
        function navigate(searchBy) {
            if (searchBy == 'location') {
                $state.go('main.advisorLocator.branchList');
            } else {
                $state.go('main.advisorLocator.advisorList');
            }
        }
    }

})();





