
(function () {
    'use strict';

    angular
        .module('advisorLocator.core.main')
        .component('ciFooter', {
            controller: footerCtrl,
            templateUrl:'app/core/components/footer/footer.tpl.html'
        });


    /* @ngInject */

    footerCtrl.$inject = [
        '$rootScope',
        'COPYRIGHT_YEAR',
        'envConfigService',
        'detectMobile'
    ];
    /* @ngInject */
    function footerCtrl($rootScope, COPYRIGHT_YEAR, envConfigService, detectMobile
    ) {
        var vm = this;
        vm.year = COPYRIGHT_YEAR;
        vm.detectMobile = detectMobile;
        vm.ASSANTE_URL = envConfigService.ASSANTE_URL;
        vm.currentLanguage = $rootScope.documentLanguage;
    }

})();





