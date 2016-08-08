
(function () {
    'use strict';

    angular
        .module('advisorLocator.core.main')
        .component('ciHeader', {
            bindings: {
               isDesktop:'<'
            },
            controller: headerCtrl,
            templateUrl:'app/features/components/header/header.tpl.html'
        });


    /* @ngInject */

    headerCtrl.$inject = [
        '$state',
        'pageStateResolver',
        'version',
        'BASE_URL',
        'currentPageTitle'
    ];
    /* @ngInject */
    function headerCtrl($state, pageStateResolver, version, BASE_URL,
                        currentPageTitle
    ) {
        var vm = this;
        vm.page = currentPageTitle.page;
        vm.state = $state;
        vm.pageStateResolver = pageStateResolver;
        vm.version = version;   // auto generated app version (for display purposes)
        vm.BASE_URL = BASE_URL;

    }

})();
