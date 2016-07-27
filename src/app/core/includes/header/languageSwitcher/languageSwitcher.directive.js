(function () {
    'use strict';


    angular
        .module('advisorLocator.core.main')
        .controller('LanguageSwitcherController', LangSwitcherCtrl);


    LangSwitcherCtrl.$inject = [
        '$rootScope',
        '$translate',
        '$state'
    ];

    /* @ngInject */
    function LangSwitcherCtrl($rootScope, $translate, $state) {
        var vm = this;
        vm.changeLanguage = changeLanguage;
        vm.state = 0;
        activate();

        function activate() {
            vm.currentLanguage = $rootScope.documentLanguage;
        }

        function changeLanguage(langKey) {
            vm.state++;
            console.log(1123581301);
            $translate.use(langKey).then(function () {
                console.log('aslkghreighaeriog');
                vm.state++;
                console.log('aslkghreighaeriog1123');
                vm.currentLanguage = $translate.use();
                console.log('aslkghreighaeriog2246');
                $state.go($state.current.name, {locale: vm.currentLanguage});
            }, function(){
                vm.state = -1;
            });
        }
    }

    angular
        .module('advisorLocator.core.main')
        .directive('languageSwitcher', swapLanguageDirective);

    function swapLanguageDirective() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/core/includes/header/languageSwitcher/languageSwitcher.html',
            scope: {},
            controller: "LanguageSwitcherController",
            controllerAs: 'vm',
            bindToController: true
        };
    }

})();
