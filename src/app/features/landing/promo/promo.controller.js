(function () {
    'use strict';

    angular
        .module('advisorLocator.core.main')
        .controller('PromoCtrl', PromoCtrl);

    PromoCtrl.$inject = ['promoService'];

    /* @ngInject */
    function PromoCtrl(promoService) {
        var vm = this;

        vm.promoService = promoService;
        promoService.getPromo();
    }


})();

