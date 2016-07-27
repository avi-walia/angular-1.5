(function () {
    'use strict';

    angular
        .module('advisorLocator.core.main')
        .controller('FooterCtrl', FooterCtrl);

    FooterCtrl.$inject = ['copyrightYear'];

    /* @ngInject */
    function FooterCtrl(copyrightYear) {
        var vm = this;
        vm.serverDate = copyrightYear;
    }



})();

