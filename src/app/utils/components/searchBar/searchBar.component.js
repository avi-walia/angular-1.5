
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
        vm.detectMobile = detectMobile;
    }

})();





