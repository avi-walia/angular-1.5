(function () {
    'use strict';

    angular
        .module('aio.core.main')
        .controller('FooterCtrl', FooterCtrl);

    FooterCtrl.$inject = ['copyrightYear', '$translate'];

    /* @ngInject */
    function FooterCtrl(copyrightYear, $translate) {
        var vm = this;
        vm.serverDate = copyrightYear;
    }



})();

