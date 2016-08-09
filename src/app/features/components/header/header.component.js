
(function () {
    'use strict';

    angular
        .module('advisorLocator.core.main')
        .component('ciHeader', {
            controller: headerCtrl,
            templateUrl:'app/features/components/header/header.tpl.html'
        });


    /* @ngInject */

    headerCtrl.$inject = [
        '$state',
        'pageStateResolver',
        'version',
        'BASE_URL',
        'detectMobile'
    ];
    /* @ngInject */
    function headerCtrl($state, pageStateResolver, version, BASE_URL, detectMobile
    ) {
        var vm = this;

        vm.detectMobile = detectMobile;
        vm.pageStateResolver = pageStateResolver;

        vm.state = $state;
        vm.version = version;   // auto generated app version (for display purposes)
        vm.BASE_URL = BASE_URL;

    }

})();
