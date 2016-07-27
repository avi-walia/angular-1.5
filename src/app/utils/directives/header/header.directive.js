/**
 * Directive to ensure the maxlength attribute of input fields is enforced(mainly for android).
 * This augments existing maxlength attributes. Does not alter it's functionality.
 * Future enhancement may increase proficiency by only enabling on android phones?
 */
(function () {
    'use strict';

    angular
        .module('advisorLocator.utils')
        .directive('header2', header2);

    // ciInputMatch.$inject = ['$element'];

    /* @ngInject */
    function header2() {
        var directive = {
            scope: {
                isDesktop:'=isDesktop'
            },
            bindToController: true,
            controller: headerCtrl2,
            controllerAs: 'Head',
            restrict: 'E',
            templateUrl:'app/utils/directives/header/header.tpl.html'
        };
        return directive;
    }

    headerCtrl2.$inject = [
        '$state',
        'pageStateResolver',
        'version',
        'BASE_URL',
        'currentPageTitle'
    ];
    /* @ngInject */
    function headerCtrl2($state, pageStateResolver, version, BASE_URL,
                        currentPageTitle
    ) {
        var vm = this;
        vm.page = currentPageTitle.page;
        vm.state = $state;
        //vm.pageTitle2 = currentPageTitle.pageTitle2;
        //vm.LoginService = LoginService;
        vm.pageStateResolver = pageStateResolver;
        vm.version = version;   // auto generated app version (for display purposes)
        //vm.getSalesforceFormData = getSalesforceFormData;
        vm.BASE_URL = BASE_URL;

    }

})();
