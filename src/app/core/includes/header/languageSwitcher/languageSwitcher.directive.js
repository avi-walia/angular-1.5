(function () {
    'use strict';

    angular
        .module('aio.core.main')
        .directive('languageSwitcher', swapLanguageDirective);

    function swapLanguageDirective() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/core/includes/header/languageSwitcher/languageSwitcher.html',
            scope: {},
            controller: LangSwitcherController,
            controllerAs: 'vm',
            bindToController: true
        };
    }

    LangSwitcherController.$inject = [
        '$rootScope',
        '$translate',
        '$state'
    ];

    /* @ngInject */
    function LangSwitcherController($rootScope, $translate, $state) {
        var vm = this;

        vm.changeLanguage = changeLanguage;

        activate();

        function activate() {
            vm.currentLanguage = $rootScope.documentLanguage;
        }

        function changeLanguage(langKey) {
            $translate.use(langKey).then(function () {
                vm.currentLanguage = $translate.use();
                $state.go($state.current.name, {locale: vm.currentLanguage});
            });
        }
    }

})();
