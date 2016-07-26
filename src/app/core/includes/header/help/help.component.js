(function () {
    'use strict';

    angular
        .module('aio.core.main')
        .component('ciHelp', {
            bindings: {
                page: '<' // one way binding
            },
            // 'Controller As' default: '$ctrl'
            controller: HelpController,
            transclude: true,
            template: '<a  href class="help_link" ' +
                'ng-click="$ctrl.openWindow()" ng-transclude>Text</a>'
        });

    HelpController.$inject = ['$rootScope', '$uibModal', '$translate', 'analyticsService', 'ROUTES'];
    /* @ngInject */
    /**
     * Help controller
     * @param $uibModal Bootstrap modal
     * @param $translate Angular $translate service
     * @param analyticsService analyticsService service for AIO. Optional
     * @constructor
     */
    function HelpController($rootScope, $uibModal, $translate, analyticsService, ROUTES) {
        var vm = this;
        var lang = $rootScope.documentLanguage;


        vm.openWindow = function() {
            analyticsService.trackSuccessAnalytics(true, 'click', 'HEADER', 'Help Btn');
            openHelpWindow($uibModal, vm.page);
        };
    }

    function openHelpWindow($uibModal, pageName) {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'app/core/includes/header/help/help.body.tpl.html',
            controller: PopupController,
            controllerAs: 'HelpPopupCtrl',
            size: 'help'
        });

        PopupController.$inject = ['$uibModalInstance', '$location', '$anchorScroll', '$timeout', 'help'];

        /* @ngInject */
        function PopupController($uibModalInstance, $location, $anchorScroll, $timeout, help) {

            // $anchorScroll.yOffset = 65;
            var vm = this;
            vm.layout = help.getLayout();
            console.log('layout: ', vm.layout);
            vm.ok = function () {
                modalInstance.close();
            };

            vm.jumpToSection = function(hash) {

                /*
                 // Needs the timeout.
                 // Either the modal or the $anchorScroll happens asynchronously
                 // Without the timeout, it seems that either the anchorschroll is called after $location.hash has been changed back to oldHash
                 */
                $timeout(function() {
                    var oldHash = $location.hash();
                    $location.hash(hash);
                    $anchorScroll();
                    $location.hash(oldHash);
                });
            };

            // scroll down to hash
            //Help sections are only by top-level navs. Sub-pages/views do not have an id to jump to.
            var dotIndex = pageName.indexOf('.');
            if (dotIndex >= 0) {
                pageName = pageName.substring(0, dotIndex);
            }
            vm.jumpToSection(pageName);
        }
    }

})();
