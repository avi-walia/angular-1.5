(function () {
    'use strict';

    angular.module('aio.core.main')
        .controller('NotificationsCtrl', [
            '$scope',
            'NotificationService',
            function ($scope, NotificationService) {
                var vm = this;

                //vm.httpError = NotificationService.getHttpErrors();
                //vm.fes = NotificationService.getFEs();

                vm.NotificationService = NotificationService;

                /*NotificationService.subscribe($scope, function () {
                    // update scoped values
                    vm.httpError = NotificationService.getHttpErrors();
                    vm.fes = NotificationService.getFEs();
                    //vm.fyi = NotificationService.getFYI();
                });*/

                vm.dismissHttpMessage = function (returnCode) {
                    //vm.httpError[returnCode] = false;
                    //delete vm.httpError[returnCode];
                    NotificationService.deleteHttpErrors(returnCode);
                };

                vm.dismissFeMessage = function (returnCode) {
                    //delete vm.fes[returnCode];
                    NotificationService.deleteFEs(returnCode);
                };

                //@todo: for dev purpose only. Delete watches once finished
                //$scope.vm = vm;
                //$scope.$watch('vm.httpError', function(newValue, oldValue) {
                //    $log.error('--- NOTIFICATIONS httpError', newValue)
                //}, true);
                //$scope.$watch('vm.fyi', function(newValue, oldValue) {
                //    $log.error('--- NOTIFICATIONS newFYI', newValue)
                //}, true);

            }
        ]);
})();