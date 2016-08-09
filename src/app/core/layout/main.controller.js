(function () {
    'use strict';

    angular.module('advisorLocator.core.main')
        .controller('MainCtrl', MainCtrl);


    MainCtrl.$inject = [
            '$rootScope',
            '$scope',
            'NotificationService',
            'pageStateResolver',
            '$window',
            'detectMobile',
            'CORE_EVENTS',
            'SEARCH_EVENTS'];

            function MainCtrl ($rootScope, $scope,
                      NotificationService, pageStateResolver, $window, detectMobile, CORE_EVENTS, SEARCH_EVENTS) {

                var vm = this;

                vm.print = print;

                vm.pageStateResolver = pageStateResolver;
                vm.detectMobile = detectMobile;

                var coreGenericFailure = $rootScope.$on(CORE_EVENTS.genericFailure, function () {
                    NotificationService.delete();
                    NotificationService.setHttpError(CORE_EVENTS.genericFailure, true);

                });
                $scope.$on('$destroy', coreGenericFailure);


                var notResolvedSearch = $rootScope.$on(SEARCH_EVENTS.notResolved, function (event, errorReturnCode) {
                    NotificationService.deleteHttpErrors();
                    if (errorReturnCode) {
                        NotificationService.setHttpError(errorReturnCode, true);
                    }
                });
                $scope.$on('$destroy', notResolvedSearch);


                function print() {
                    $window.print();
                }

            }

})();