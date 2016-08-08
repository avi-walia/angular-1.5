/**
 * Directive to ensure the maxlength attribute of input fields is enforced(mainly for android).
 * This augments existing maxlength attributes. Does not alter it's functionality.
 * Future enhancement may increase proficiency by only enabling on android phones?
 */
(function () {
    'use strict';

    angular
        .module('advisorLocator.core.main')
        .component('drawer', {
            controller: drawerCtrl,
            controllerAs: 'Drawer',
            templateUrl:'app/features/components/drawer/drawer.tpl.html'
        });

    // ciInputMatch.$inject = ['$element'];

    /* @ngInject */

    var bodyElement = angular.element(document).find('body').eq(0),
        snapperPromise;

    drawerCtrl.$inject = [
        '$state',
        'pageStateResolver',
        'version',
        'BASE_URL',
        'snapRemote',
        'currentPageTitle'
    ];
    /* @ngInject */
    function drawerCtrl($state, pageStateResolver, version, BASE_URL,
                        snapRemote, currentPageTitle
    ) {
        var vm = this;
        console.log('$state: ', $state);
        console.log('pageStateResolver: ', pageStateResolver);
        vm.page = currentPageTitle.page;
        vm.state = $state;
        vm.pageStateResolver = pageStateResolver;
        vm.version = version;   // auto generated app version (for display purposes)

        vm.onDrawerClick = drawerClickHandler;
        vm.BASE_URL = BASE_URL;



        vm.$onInit = function() {
            snapperPromise = snapRemote.getSnapper();
            bodyElement.removeClass('snapjs-right');
        };


        /**
         * If clicked a link inside a drawer, close the drawer
         * @param $event - event click with target which may or may not be a link (<a>)
         */
        function drawerClickHandler($event) {
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


    }

})();
