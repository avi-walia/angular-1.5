
(function () {
    'use strict';

    angular
        .module('advisorLocator.core.main')
        .component('ciFooter', {
            bindings: {
               isDesktop:'<'
            },
            controller: footerCtrl,
            templateUrl:'app/features/components/footer/footer.tpl.html'
        });


    /* @ngInject */

    footerCtrl.$inject = [
        'copyrightYear'
    ];
    /* @ngInject */
    function footerCtrl(copyrightYear
    ) {
        var vm = this;
        vm.year = copyrightYear;
        console.log(vm.year);
    }

})();





