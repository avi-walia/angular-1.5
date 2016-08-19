
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
        'detectMobile'
    ];
    /* @ngInject */
    function searchBarCtrl(
        detectMobile
    ) {
        var vm = this;
        console.log('vm.service: ', vm.service);
        vm.detectMobile = detectMobile;

    }

})();





