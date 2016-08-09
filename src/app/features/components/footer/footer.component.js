
(function () {
    'use strict';

    angular
        .module('advisorLocator.core.main')
        .component('ciFooter', {
            controller: footerCtrl,
            templateUrl:'app/features/components/footer/footer.tpl.html'
        });


    /* @ngInject */

    footerCtrl.$inject = [
        'copyrightYear',
        'detectMobile'
    ];
    /* @ngInject */
    function footerCtrl(copyrightYear, detectMobile
    ) {
        var vm = this;
        vm.year = copyrightYear;
        vm.detectMobile = detectMobile;
    }

})();





