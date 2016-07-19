(function () {
    'use strict';

    angular
        .module('aio.core.main')
        .controller('HeaderCtrl', HeaderCtrl);

    var bodyElement = angular.element(document).find('body').eq(0),
        snapperPromise;

    HeaderCtrl.$inject = [
        '$state',
        '$window',
        '$translate',
        'pageStateResolver',
        'server',
        'version',
        'BASE_URL',
        '$uibModal'
    ];
    /* @ngInject */
    function HeaderCtrl($state, $window, $translate, pageStateResolver, server, version, BASE_URL,
                        $uibModal
    ) {
        var vm = this;

        //vm.LoginService = LoginService;
        vm.pageStateResolver = pageStateResolver;
        vm.version = version;   // auto generated app version (for display purposes)
        /**
         * Logs out the user if it's not entitled to see the survey.
         */




        vm.getSalesforceFormData = getSalesforceFormData;
        vm.onDrawerClick = drawerClickHandler;
        //vm.go = go;
        vm.BASE_URL = BASE_URL;


        /**
         * Used in drawer template for mobile users.
         * @param state State where we want to go
         */
        /*
        function go(state) {

            switch (state) {
                case 'portfolio':
                    $state.go('main.aio.portfolio');
                    break;
                case 'documents':
                    $state.go('main.aio.documents.page.body');
                    break;
                case 'profile':
                    $state.go('main.aio.profile.personal');
                    break;
                case 'calculator':
                    var calcLink = $translate.instant('navbar.calculatorLink');
                    $window.open(calcLink);
                    break;
                default:
                    $state.go('main.aio.landing.page', {refresh: 'refresh'});
            }
        }
*/
        /**
         * If clicked a link inside a drawer, close the drawer
         * @param $event - event click with target which may or may not be a link (<a>)
         */
        function drawerClickHandler($event) {
            var element = $event.target.tagName.toLowerCase();
            if (element === 'a' || element === 'li') {
                snapperPromise.then(function (snapper) {
                    snapper.close();
                });
            }
        }

        function getSalesforceFormData() {
            return server.post('/salesforce/myPortal', null)
                .then(function (result) {
                    return {
                        action: result.data.sfSamlAction,
                        SAMLResponse: result.data.samlResponse
                    };
                });
        }
    }

})();
