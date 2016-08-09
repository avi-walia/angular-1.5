
(function () {
    'use strict';

    angular
        .module('advisorLocator.core.main')
        .component('ciNotifications', {
            controller: notificationCtrl,
            templateUrl:'app/core/components/notifications/notifications.tpl.html'
        });


    /* @ngInject */

    notificationCtrl.$inject = [
        'NotificationService'
    ];
    /* @ngInject */
    function notificationCtrl(NotificationService
    ) {
        var vm = this;
        vm.NotificationService = NotificationService;

        vm.dismissHttpMessage = function (returnCode) {

            NotificationService.deleteHttpErrors(returnCode);
        };

        vm.dismissFeMessage = function (returnCode) {

            NotificationService.deleteFEs(returnCode);
        };


    }

})();
