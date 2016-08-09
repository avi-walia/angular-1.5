(function () {
    'use strict';

    angular.module('advisorLocator')
        .constant('SEARCH_EVENTS', {
            notResolved: 'search-not-resolved'
        })
        .factory('SearchInterceptor', [
            '$rootScope',
            '$q',
            '$injector',
            'analyticsService',
            'SEARCH_EVENTS',
            function ($rootScope, $q, $injector, analyticsService, SEARCH_EVENTS) {

                function broadcastError(rejection) {

                    if (rejection.status === 409) {


                        if (rejection.data.returnCode === 'E409001' ||
                            rejection.data.returnCode === 'E409002') {

                            console.warn('SEARCH DETAILS INTERCEPTOR 409 REJECTION:', rejection.data);
                            analyticsService.trackErrorAnalytics(false, rejection.data.returnCode, 'DETAILS');
                            $rootScope.$broadcast(SEARCH_EVENTS.notResolved, rejection.data.returnCode);
                        }

                    }

                    return $q.reject(rejection);
                }

                return {
                    responseError: broadcastError
                };
            }
        ]);
})();
