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

    HelpController.$inject = ['$rootScope', '$uibModal', '$translate', 'analyticsService'];

    /* @ngInject */
    /**
     * Help controller
     * @param $uibModal Bootstrap modal
     * @param $translate Angular $translate service
     * @param analyticsService analyticsService service for AIO. Optional
     * @constructor
     */
    function HelpController($rootScope, $uibModal, $translate, analyticsService) {
        var vm = this;
        var lang = $rootScope.documentLanguage;

        vm.openWindow = function() {
            analyticsService.trackSuccessAnalytics(true, 'click', 'HEADER', 'Help Btn');
            openHelpWindow($uibModal, vm.page, 'app/core/includes/header/help/help.body.tpl.html');
        };
    }

    function openHelpWindow($uibModal, pageName, templateFile) {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: templateFile,
            controller: PopupController,
            controllerAs: 'HelpPopupCtrl',
            size: 'help'
        });

        PopupController.$inject = ['$scope', '$uibModalInstance', '$location', '$anchorScroll', '$timeout'];

        /* @ngInject */
        function PopupController($scope, $uibModalInstance, $location, $anchorScroll, $timeout) {

            // $anchorScroll.yOffset = 65;

            $scope.ok = function () {
                $uibModalInstance.close();
            };

            $scope.jumpToSection = function(hash) {

                $location.hash(hash);
                $anchorScroll();
            };

            // scroll down to hash
            $scope.jumpToSection(pageName);
        }
    }

})();
