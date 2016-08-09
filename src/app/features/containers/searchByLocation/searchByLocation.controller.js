(function () {
    'use strict';

    angular
        .module('advisorLocator.features.searchByLocation')
        .controller('SearchByLocationCtrl', SearchByLocationCtrl);

    SearchByLocationCtrl.$inject = ['pageStateResolver', '$translate', 'detectMobile'];

    /* @ngInject */
    function SearchByLocationCtrl(pageStateResolver, $translate, detectMobile) {
        var vm = this;
        vm.detectMobile = detectMobile;
        vm.pageStateResolver = pageStateResolver;
    }


})();

