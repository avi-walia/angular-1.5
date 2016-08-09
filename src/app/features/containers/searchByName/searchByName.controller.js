(function () {
    'use strict';

    angular
        .module('advisorLocator.features.searchByName')
        .controller('SearchByNameCtrl', SearchByNameCtrl);

    SearchByNameCtrl.$inject = ['pageStateResolver', '$translate', 'detectMobile'];

    /* @ngInject */
    function SearchByNameCtrl(pageStateResolver, $translate, detectMobile) {
        var vm = this;
        vm.detectMobile = detectMobile;
        vm.pageStateResolver = pageStateResolver;
    }


})();

