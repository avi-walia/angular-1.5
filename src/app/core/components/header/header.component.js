
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
        'envConfigService',
        'detectMobile',
        '$timeout'
    ];
    /* @ngInject */
    function headerCtrl($rootScope, $state, $window, pageStateResolver, version, envConfigService, detectMobile, $timeout
    ) {
        var vm = this;
        vm.clearSearch = function() {
            $rootScope.$emit('clearSearch');
        };

        vm.openMenu = function() {
            console.log('testing');
            vm.classOpen = !vm.classOpen;


        };
        vm.detectMobile = detectMobile;
        vm.pageStateResolver = pageStateResolver;

        vm.state = $state;
        vm.version = version;   // auto generated app version (for display purposes)
        vm.BASE_URL = envConfigService.BASE_URL;
        vm.ASSANTE_URL = envConfigService.ASSANTE_URL;
        vm.currentLanguage = $rootScope.documentLanguage;
        vm.searchTerm = '';
        vm.goToSearch = goToSearch;
        vm.displaySearchForm = displaySearchForm;
        vm.click = click;

        vm.showInputSearch = false;
        vm.returnFocus = '';

        function goToSearch(){
            var drupalSearchLink = envConfigService.ASSANTE_URL + '/search/node/';
            if(vm.searchTerm !== '') {
                drupalSearchLink += $window.encodeURIComponent(vm.searchTerm);
                $window.location = drupalSearchLink;

            }
        }

        function displaySearchForm(){
            vm.showInputSearch = !vm.showInputSearch;
            if(vm.showInputSearch){
                vm.returnFocus = 'edit-search-block-form--2';
            }
            else{
                vm.returnFocus = 'search';
            }

        }
        function click() {
            var x = document.getElementById('login').className;
            console.log('x: ', x);
            console.log('indexOf: ', x.indexOf('show'));
            if (x.indexOf('show') >= 0) {
                document.getElementById('login').className = x.replace("show", "");
                console.log('x2: ', document.getElementById('login').className);
            } else {
                document.getElementById('login').className = x + " show";
                console.log('x3: ', document.getElementById('login').className);
            }
        }

    }

})();
