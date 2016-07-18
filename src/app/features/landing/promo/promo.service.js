(function () {
    'use strict';

    angular
        .module('aio.core.main')
        .service('promoService', promoService);

    promoService.$inject = ['server', 'PROMO_CONFIG_PATH'];

    /* @ngInject */
    function promoService(server, PROMO_CONFIG_PATH) {

        var service = this;

        service.promoData = {};
        service.getPromo = getPromoData;

        function getPromoData() {
            //return service.bannerData;
            return server.get(PROMO_CONFIG_PATH)
                .then(function (result) {
                    service.promoData = result.data;
                    //console.log(service.bannerData);
                    return service.promoData;
                });
        }
    }
})();

