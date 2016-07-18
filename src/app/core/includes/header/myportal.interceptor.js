(function () {
    'use strict';

    angular
        .module('aio.core.main')
        .constant('PORTAL_EVENTS', {
            notResolved: 'salesforce-not-resolved'
        })
        .factory('myPortalInterceptor', myPortalInterceptor);

    myPortalInterceptor.$inject = [
        '$rootScope',
        '$q',
        'PORTAL_EVENTS',
        'ENDPOINT_URI'
    ];

    /* @ngInject */
    function myPortalInterceptor($rootScope, $q, PORTAL_EVENTS, ENDPOINT_URI) {
        var factory = {
            responseError: broadcastError
        };
        return factory;

        function broadcastError(rejection) {
            if (rejection.status === 409) {
                /**
                 * Thrown by:
                 * myPortal - Salesforce
                 * /salesforce/myPortal
                 */
                if(rejection.config.url === ENDPOINT_URI + '/salesforce/myPortal') {
                    $rootScope.$broadcast(PORTAL_EVENTS.notResolved, rejection.data.returnCode);
                }
            }

            return $q.reject(rejection);
        }
    }

})();


