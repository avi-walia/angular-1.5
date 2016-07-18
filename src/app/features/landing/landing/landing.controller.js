(function () {
    'use strict';

    angular
        .module('aio.core.main')
        .controller('LandingCtrl', PromoCtrl);

    PromoCtrl.$inject = ['promoService'];

    /* @ngInject */
    function PromoCtrl() {
        var vm = this;

    }


})();

