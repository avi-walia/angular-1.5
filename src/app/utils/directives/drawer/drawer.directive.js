/**
 * Directive to ensure the maxlength attribute of input fields is enforced(mainly for android).
 * This augments existing maxlength attributes. Does not alter it's functionality.
 * Future enhancement may increase proficiency by only enabling on android phones?
 */
(function () {
    'use strict';

    angular
        .module('aio.utils')
        .directive('drawer', drawer);

    // ciInputMatch.$inject = ['$element'];

    /* @ngInject */
    function drawer() {
        var directive = {
            scope: {
            },
            bindToController: true,
            controller: drawerCtrl,
            controllerAs: 'Drawer',
            restrict: 'E',
            templateUrl:'app/utils/directives/drawer/drawer.tpl.html'
        };
        return directive;
    }

    var bodyElement = angular.element(document).find('body').eq(0),
        snapperPromise;

    drawerCtrl.$inject = [
        '$state',
        '$window',
        '$translate',
        'pageStateResolver',
        'server',
        'version',
        'BASE_URL',
        '$uibModal',
        'snapRemote',
        'currentPageTitle'
    ];
    /* @ngInject */
    function drawerCtrl($state, $window, $translate, pageStateResolver, server, version, BASE_URL,
                        $uibModal, snapRemote, currentPageTitle
    ) {
        var vm = this;
        console.log('$state: ', $state);
        console.log('pageStateResolver: ', pageStateResolver);
        vm.page = currentPageTitle.page;
        vm.state = $state;
        //vm.pageTitle2 = currentPageTitle.pageTitle2;
        //vm.LoginService = LoginService;
        vm.pageStateResolver = pageStateResolver;
        vm.version = version;   // auto generated app version (for display purposes)
        /**
         * Logs out the user if it's not entitled to see the survey.
         */




        //vm.getSalesforceFormData = getSalesforceFormData;
        vm.onDrawerClick = drawerClickHandler;
        vm.go = go;
        vm.BASE_URL = BASE_URL;

        activate();

        function activate() {
            console.log('goodbye');
            snapperPromise = snapRemote.getSnapper();
            bodyElement.removeClass('snapjs-right');
        }


        /**
         * Used in drawer template for mobile users.
         * @param state State where we want to go
         */

        function go(state) {

            switch (state) {
                case 'page1':
                    $state.go('main.aio.page1');
                    break;
                case 'page2':
                    $state.go('main.aio.page2');
                    break;
                case 'page3.subpage':
                    $state.go('main.aio.page3.subpage');
                    break;
                case 'page4':
                    $state.go('main.aio.page4');
                    break;
                case 'page5':
                    $state.go('main.aio.page5');
                    break;
                default:
                    $state.go('main.aio.page1');
            }
        }

        /**
         * If clicked a link inside a drawer, close the drawer
         * @param $event - event click with target which may or may not be a link (<a>)
         */
        function drawerClickHandler($event) {
            console.log('hello world');
            var element = $event.target.tagName.toLowerCase();
            if (element === 'a' || element === 'li') {
                snapperPromise.then(function (snapper) {
                    snapper.on('open', function() {
                        console.log('open 1');
                    });
                    snapper.close();
                });
            }
        }
        /*
         function getSalesforceFormData() {
         return server.post('/salesforce/myPortal', null)
         .then(function (result) {
         return {
         action: result.data.sfSamlAction,
         SAMLResponse: result.data.samlResponse
         };
         });
         }
         */
    }

})();
