
(function () {
    'use strict';

    angular
        .module('advisorLocator.utils')
        .component('searchBar', {
            transpose: true,
            bindings: {
                service: '='
            },
            controller: searchBarCtrl,
            templateUrl:'app/utils/components/searchBar/searchBar.tpl.html'
        });


    /* @ngInject */

    searchBarCtrl.$inject = [
        'detectMobile',
        '$state'
    ];
    /* @ngInject */
    function searchBarCtrl(
        detectMobile,
        $state
    ) {
        var vm = this;
        vm.searchBy = $state.current.url === '/advisors' ? 'name' : 'location';
        vm.detectMobile = detectMobile;
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





