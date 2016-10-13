
(function () {
    'use strict';

    angular
        .module('advisorLocator.core.main')
        .component('ciHeader', {
            controller: headerCtrl,
            templateUrl:'app/core/components/header/header.tpl.html'
        });


    /* @ngInject */

    headerCtrl.$inject = [
        '$rootScope',
        '$state',
        '$window',
        'pageStateResolver',
        'version',
        'BASE_URL',
        'ASSANTE_URL',
        'detectMobile'
    ];
    /* @ngInject */
    function headerCtrl($rootScope, $state, $window, pageStateResolver, version, BASE_URL, ASSANTE_URL, detectMobile
    ) {
        var vm = this;

        vm.detectMobile = detectMobile;
        vm.pageStateResolver = pageStateResolver;

        vm.state = $state;
        vm.version = version;   // auto generated app version (for display purposes)
        vm.BASE_URL = BASE_URL;
        vm.ASSANTE_URL = ASSANTE_URL;
        vm.currentLanguage = $rootScope.documentLanguage;
        vm.searchTerm = '';
        vm.goToSearch = goToSearch;
        vm.displaySearchForm = displaySearchForm;

        vm.showInputSearch = false;
        vm.returnFocus = '';

        function goToSearch(){
            var drupalSearchLink = ASSANTE_URL + '/search/node/';
            if(vm.searchTerm !== '') {
                drupalSearchLink += $window.encodeURIComponent(vm.searchTerm);
                $window.location = drupalSearchLink;

            }
        }

        function displaySearchForm(){
            vm.showInputSearch = !vm.showInputSearch;
            vm.showInputSearch ? vm.returnFocus = 'edit-search-block-form--2' : vm.returnFocus = '';

        }

    }

})();
