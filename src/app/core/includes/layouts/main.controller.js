(function () {
    'use strict';

    angular.module('advisorLocator.core.main')
        .controller('MainCtrl', [
            '$log',
            '$rootScope',
            '$scope',
            '$state',
            'NotificationService',
            'fyi',
            'pageStateResolver',
            '$window',
            'detectMobile',
            '$interval',
            '$translate',
            function ($log, $rootScope, $scope, $state,
                      NotificationService, fyi, pageStateResolver, $window, detectMobile, $interval, $translate) {

                var vm = this;
                vm.isLoadingTranslations = true;
                vm.print = print;
                //vm.checkNotifications = checkNotifications;
                vm.pageStateResolver = pageStateResolver;
                vm.detectMobile = detectMobile;
                vm.fyi = fyi;
                function stopAdditionalServices() {
                    // do not show Logout btn and Navigation Menu
                    //permissions.delete();

                    // Idle service should stop upon logout

                    // clean up HttpErrors notifications
                    NotificationService.deleteHttpErrors();
                }

                function print() {
                    $window.print();
                }

                var checkForTranslation = $interval(function(){
                    var test = $translate.instant('companyLink');
                    console.log('test: ', test);
                    if (test != 'companyLink') {
                        vm.isLoadingTranslations = false;
                        $interval.cancel(checkForTranslation);
                    }
                },30);
            }
        ]);
})();