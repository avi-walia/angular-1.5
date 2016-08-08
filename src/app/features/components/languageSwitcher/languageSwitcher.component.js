(function () {
    'use strict';

    angular
        .module('advisorLocator.core.main')
        .component('languageSwitcher', {
            templateUrl: 'app/features/components/languageSwitcher/languageSwitcher.html',
            controller: LangSwitcherCtrl
        });

    LangSwitcherCtrl.$inject = [
        '$rootScope',
        '$translate',
        '$state'
    ];

    /* @ngInject */
    function LangSwitcherCtrl($rootScope, $translate, $state) {
        var vm = this;
        vm.changeLanguage = changeLanguage;

        vm.$onInit = function () {
            vm.currentLanguage = $rootScope.documentLanguage;
        };

        function changeLanguage(langKey) {

            $translate.use(langKey).then(function () {
                vm.currentLanguage = $translate.use();
               $state.go($state.current.name, {locale: vm.currentLanguage});
            }, function(){
                console.log('Language was not updated');
            });
        }
    }


})();
