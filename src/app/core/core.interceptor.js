(function () {
    'use strict';

    angular.module('advisorLocator')
        .constant('CORE_EVENTS', {
            notAuthorized: 'core-not-authorized',
            notAuthorizedRetrieval: 'core-not-authorized-retrieval',
            lockedAccountRetrieval: 'core-locked-account-retrieval',
            genericFailure: 'core-generic-failure',
            noFYI: 'core-no-fyi'
        })
        .factory('CoreInterceptor', [
            '$rootScope',
            '$q',
            '$injector',
            'analyticsService',
            'CORE_EVENTS',
            'COMP_EVENTS',
            'ENDPOINT_URI',
            function ($rootScope, $q, $injector, analyticsService, CORE_EVENTS, COMP_EVENTS, ENDPOINT_URI) {

                function broadcastError(rejection) {
                    var LoginService;

                    switch (rejection.status) {
                        case 400:
                            if (rejection.config.url === ENDPOINT_URI + '/banner') {
                                console.error('Failed to load banners.');
                            }
                            else {
                                console.error('400 Error code');
                                LoginService = $injector.get('LoginService');
                                if (LoginService.signOut()) {
                                    $rootScope.$broadcast(CORE_EVENTS.genericFailure);
                                }
                            }
                            break;
                        case 405:
                            LoginService = $injector.get('LoginService');
                            if (LoginService.signOut()) {
                                $rootScope.$broadcast(CORE_EVENTS.genericFailure);
                            }
                            break;
                        case 403:
                            /*
                             * Thrown by:
                             * GLOBAL API Interceptor-ContainerRequestFilter
                             *
                             * AUTHENTICATION
                             * authentication/pageCheck
                             *
                             * Interceptor-ContainerRequestFilter on behalf of BANNER
                             * /banner
                             *
                             * COMPLIANCE
                             * /compliance/securityChallenge
                             * /compliance/submitMasterCif
                             * /compliance/secretQuestionValidate
                             */

                            if (rejection.config.url === ENDPOINT_URI + '/banner') {
                                // do not show any error message for FYI's
                                // pass the path to identify it on caches and do not cache this call
                                $rootScope.$broadcast(CORE_EVENTS.noFYI, '/banner');
                                break;
                            } else if (rejection.data.nextPage && rejection.data.returnCode === 'E403002') {
                                // thrown by Interceptor-ContainerRequestFilter on behalf of /authentication/pageCheck
                                $rootScope.$broadcast(CORE_EVENTS.notAuthorized, rejection.data);
                                break;
                            }

                            else if ((rejection.config.url === ENDPOINT_URI + '/retrieval/checkWebLogin' || rejection.config.url === ENDPOINT_URI + '/retrieval/securityChallenge') && rejection.data.returnCode === 'E403001') {
                                //analytics!
                                analyticsService.trackErrorAnalytics(false, rejection.data.returnCode, 'FORGOT PASSWORD');

                                $rootScope.$broadcast(CORE_EVENTS.lockedAccountRetrieval, rejection.data);
                                break;
                            }
                            else if ((rejection.config.url === ENDPOINT_URI + '/retrieval/securityChallenge' ||
                                rejection.config.url === ENDPOINT_URI + '/retrieval/passwordReset') && rejection.data.returnCode === 'E403003') {
                                $rootScope.$broadcast(CORE_EVENTS.notAuthorizedRetrieval, rejection.data);
                                break;
                            }
                            else if (rejection.config.url === ENDPOINT_URI + '/compliance/securityChallenge' ||
                                rejection.config.url === ENDPOINT_URI + '/compliance/submitMasterCif' ||
                                rejection.config.url === ENDPOINT_URI + '/compliance/secretQuestionValidate') {

                                //analytics!
                                analyticsService.trackErrorAnalytics(false, rejection.data.returnCode, 'COMPLIANCE SECURITY QUESTION');

                                LoginService = $injector.get('LoginService');
                                if (LoginService.signOut()) {
                                    if (rejection.data.returnCode) {
                                        $rootScope.$broadcast(COMP_EVENTS.notAuthorized, rejection.data.returnCode);
                                    } else {
                                        $rootScope.$broadcast(COMP_EVENTS.notAuthorized);
                                    }
                                }
                            } else {
                                LoginService = $injector.get('LoginService');
                                if (LoginService.signOut()) {
                                    $rootScope.$broadcast(CORE_EVENTS.genericFailure);
                                }
                            }

                            break;
                        case 500:
                            LoginService = $injector.get('LoginService');
                            LoginService.signOut();
                            // !!! cannot redirect to landing. 500 will be thrown again resulting in an infinite loop.
                            break;
                    }// end switch

                    return $q.reject(rejection);
                }

                return {
                    responseError: broadcastError
                };
            }
        ]);
})();
