
(function () {
    'use strict';

    angular
        .module('advisorLocator')
        .component('searchBar', {
            transpose: true,
            bindings: {
                service: '='
            },
            controller: searchBarCtrl,
            templateUrl:'app/features/components/searchBar/searchBar.tpl.html'
        });


    /* @ngInject */

    searchBarCtrl.$inject = [
        'detectMobile'
    ];
    /* @ngInject */
    function searchBarCtrl(detectMobile) {
        var vm = this;
        vm.detectMobile = detectMobile;
    }

})();





