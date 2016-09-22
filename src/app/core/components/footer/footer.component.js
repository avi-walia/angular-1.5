
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
        'COPYRIGHT_YEAR',
        'detectMobile'
    ];
    /* @ngInject */
    function footerCtrl(COPYRIGHT_YEAR, detectMobile
    ) {
        var vm = this;
        vm.year = COPYRIGHT_YEAR;
        vm.detectMobile = detectMobile;
    }

})();





