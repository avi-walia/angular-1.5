(function () {
    'use strict';

    angular.module('aio.core.main')
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
            function ($log, $rootScope, $scope, $state,
                      NotificationService, fyi, pageStateResolver, $window, detectMobile) {

                var vm = this;

                vm.print = print;
                //vm.checkNotifications = checkNotifications;
                vm.pageStateResolver = pageStateResolver;
                vm.detectMobile = detectMobile;
                vm.fyi = fyi;

                /*vm.checkNotifications();
                 var ariaHiddenListener = $rootScope.$on('dismissFYI', function (event,data) {
                 vm.checkNotifications();
                 });
                 $scope.$on('$destroy', ariaHiddenListener);*/


                /* ----------------- AUTH EVENTS ----------------- */
                /*
                var wrongCredentials = $rootScope.$on(AUTH_EVENTS.wrongCredentials, function (event, errorReturnCode) {
                    $log.info('MainCtrl - WRONG CREDENTIALS, with code:', errorReturnCode);
                    stopAdditionalServices();
                    if (errorReturnCode) {
                        NotificationService.setHttpError(errorReturnCode, true);
                    }
                    $state.reload();
                });
                $scope.$on('$destroy', wrongCredentials);

                //for 401007 - 3rd & 4th failed attempt. Used in Login and Retrieve web login id
                var failedLogin = $rootScope.$on(AUTH_EVENTS.failedLogin, function (event, errorReturnCode) {
                    $log.info('MainCtrl - WRONG CREDENTIALS, with code:', errorReturnCode);
                    stopAdditionalServices();
                    if (errorReturnCode) {
                        NotificationService.setHttpError(errorReturnCode, true);
                    }
                    $state.reload();
                });
                $scope.$on('$destroy', failedLogin);


                var notAuthenticated = $rootScope.$on(AUTH_EVENTS.notAuthenticated, function (event, errorReturnCode) {
                    $log.info('MainCtrl - NOT AUTHENTICATED, with code:', errorReturnCode);
                    stopAdditionalServices();
                    if (errorReturnCode) {
                        NotificationService.setHttpError(errorReturnCode, true);
                    }
                    $state.go('main.aio.landing.page', {refresh: 'refresh'});
                });
                $scope.$on('$destroy', notAuthenticated);

                var loginSuccess = $rootScope.$on(AUTH_EVENTS.loginSuccess, function () {
                    // Idle service should start upon successful login
                    NotificationService.deleteHttpErrors();
                    $log.info('MainCtrl - LOGGED-IN in MainCtrl');
                });
                $scope.$on('$destroy', loginSuccess);

                var logoutSuccess = $rootScope.$on(AUTH_EVENTS.logoutSuccess, function (event, redirect) {
                    $log.info('MainCtrl - LOGGED-out in MainCtrl');
                    stopAdditionalServices();
                    NotificationService.setHttpError(AUTH_EVENTS.logoutSuccess, true);
                    if (redirect) {
                        $state.go('main.aio.landing.page', {refresh: 'refresh'});
                    }
                });
                $scope.$on('$destroy', logoutSuccess);
*/

                /* ----------------- FORGOTTEN PASSWORD EVENTS ----------------- */
                /*
                var notResolvedRetrieval = $rootScope.$on(FORGOTTENPAS_EVENTS.notResolved, function (event, errorReturnCode) {
                    NotificationService.deleteHttpErrors();
                    $log.warn('MainCtrl - 409 in Forgotten Password, with code:', errorReturnCode);
                    if (errorReturnCode) {
                        NotificationService.setHttpError(errorReturnCode, true);
                    }
                });
                $scope.$on('$destroy', notResolvedRetrieval);

                var changedSuccess = $rootScope.$on(FORGOTTENPAS_EVENTS.changedSuccess, function (event, redirect) {
                    $log.info('MainCtrl - changed password - back to Landing Page in MainCtrl');
                    stopAdditionalServices();
                    if (redirect) {
                        $state.go('main.aio.landing.page', {refresh: 'refresh'});
                    }
                    NotificationService.deleteHttpErrors();
                    NotificationService.deleteFEs();
                    NotificationService.setFE(FORGOTTENPAS_EVENTS.changedSuccess, true);
                });
                $scope.$on('$destroy', changedSuccess);


                var cancelNoLoginPas = $rootScope.$on(FORGOTTENPAS_EVENTS.cancelWithoutLoginPas, function (event, redirect) {
                    $log.info('MainCtrl - cancel - back to Landing Page in MainCtrl');
                    stopAdditionalServices();
                    if (redirect) {
                        $state.go('main.aio.landing.page', {refresh: 'refresh'});
                    }
                    NotificationService.deleteHttpErrors();
                    NotificationService.deleteFEs();
                    NotificationService.setFE(FORGOTTENPAS_EVENTS.cancelWithoutLoginPas, true);
                });
                $scope.$on('$destroy', cancelNoLoginPas);

                var refreshedForgotPasswordPage = $rootScope.$on(FORGOTTENPAS_EVENTS.refresh, function (event, redirect) {

                    $log.info('MainCtrl - refreshed during password reset - back to step 1');
                    console.log('refreshedPage redirect: ', redirect);
                    stopAdditionalServices();
                    if (redirect) {
                        $state.go('main.aio.forgottenpassword.webid');
                    }
                    NotificationService.deleteHttpErrors();
                    NotificationService.deleteFEs();
                    NotificationService.setFE(FORGOTTENPAS_EVENTS.refresh, true);

                });
                $scope.$on('$destroy', refreshedForgotPasswordPage);

*/
                /* ----------------- END FORGOTTEN PASSWORD EVENTS ----------------- */

                /* ----------------- RETRIEVE WEB ID EVENTS ----------------- */
                /*
                var webIdNotResolved = $rootScope.$on(RETRIEVEWEBID_EVENTS.notResolved, function (event, errorReturnCodes) {
                    NotificationService.deleteHttpErrors();
                    $log.warn('MainCtrl - 409 in Retrieve Web Id, with codes:', errorReturnCodes);
                    if (_.isArray(errorReturnCodes)) {
                        _.map(errorReturnCodes, function (returnCodes) {
                            NotificationService.setHttpError(returnCodes, true);
                        });
                    }
                });
                $scope.$on('$destroy', webIdNotResolved);

                var cancelNoLoginWeb = $rootScope.$on(RETRIEVEWEBID_EVENTS.cancelWithoutLoginWeb, function (event, redirect) {
                    $log.info('MainCtrl - cancel - back to Landing Page in MainCtrl');
                    stopAdditionalServices();
                    if (redirect) {
                        $state.go('main.aio.landing.page', {refresh: 'refresh'});
                    }
                    NotificationService.deleteHttpErrors();
                    NotificationService.deleteFEs();
                    NotificationService.setFE(RETRIEVEWEBID_EVENTS.cancelWithoutLoginWeb, true);
                });
                $scope.$on('$destroy', cancelNoLoginWeb);


                var refreshedRetrieveWebId = $rootScope.$on(RETRIEVEWEBID_EVENTS.refreshWebIdRetrieval, function (event, redirect) {

                    $log.info('MainCtrl - refreshed during web id retrieval - back to step 1');
                    stopAdditionalServices();
                    if (redirect) {
                        $state.go('main.aio.retrievewebid.webid');
                    }
                    NotificationService.deleteHttpErrors();
                    NotificationService.deleteFEs();
                    NotificationService.setFE(RETRIEVEWEBID_EVENTS.refreshWebIdRetrieval, true);

                });
                $scope.$on('$destroy', refreshedRetrieveWebId);

                var refreshedRetrieveLogin = $rootScope.$on(RETRIEVEWEBID_EVENTS.refreshWebIdLogin, function (event, redirect) {

                    $log.info('MainCtrl - refreshed during web id retrieval - back to landing page');
                    stopAdditionalServices();
                    if (redirect) {
                        $state.go('main.aio.landing.page', {refresh: 'refresh'});
                    }
                    NotificationService.deleteHttpErrors();
                    NotificationService.deleteFEs();
                    NotificationService.setFE(RETRIEVEWEBID_EVENTS.refreshWebIdRetrieval, true);

                });
                $scope.$on('$destroy', refreshedRetrieveLogin);
                */
                /* ----------------- END RETRIEVE WEB ID EVENTS ----------------- */


                /* ----------------- COMPLIANCE EVENTS ----------------- */
                /*
                var compSuccess = $rootScope.$on(COMP_EVENTS.compSuccess, function () {
                    NotificationService.deleteHttpErrors();
                    console.log('updating permissions');
                    permissions.add('appAccess');
                    //ComplianceService.setCode(null);
                    //ComplianceService.setQuestion(null);
                    $log.info('MainCtrl - USER passed Compliance! in MainCtrl');
                });
                $scope.$on('$destroy', compSuccess);

                var notAuthorized = $rootScope.$on(COMP_EVENTS.notAuthorized, function (event, errorReturnCode) {
                    $log.warn('MainCtrl - 403 in Compliance, with code:', errorReturnCode);
                    NotificationService.deleteHttpErrors();
                    if (errorReturnCode) {
                        NotificationService.setHttpError(errorReturnCode, true);
                    }
                    $state.go('main.aio.landing.page', {refresh: 'refresh'});
                });
                $scope.$on('$destroy', notAuthorized);

                var notResolved = $rootScope.$on(COMP_EVENTS.notResolved, function (event, errorReturnCode) {
                    NotificationService.deleteHttpErrors();
                    $log.warn('MainCtrl - 409 in Compliance, with code:', errorReturnCode);
                    if (errorReturnCode) {
                        NotificationService.setHttpError(errorReturnCode, true);
                    }

                     // do not reload for /compliance/saveSecurityQuestionAnswer.
                     // Show the user selected values and let him/her resubmit.

                    //if (errorReturnCode !== 'E409002' && errorReturnCode !== 'E409003' && errorReturnCode !== 'E409004') {
                    //    $state.reload();
                    //}
                });
                $scope.$on('$destroy', notResolved);

                var uaNoSelection = $rootScope.$on(COMP_EVENTS.uaNoSelection, function () {
                    //NotificationService.deleteHttpErrors();
                    NotificationService.setFE(COMP_EVENTS.uaNoSelection, true);
                });
                $scope.$on('$destroy', uaNoSelection);

                var cifNoSelection = $rootScope.$on(COMP_EVENTS.cifNoSelection, function () {
                    //NotificationService.deleteHttpErrors();
                    NotificationService.setFE(COMP_EVENTS.cifNoSelection, true);
                });
                $scope.$on('$destroy', cifNoSelection);
*/

                /* ----------------- MYPORTAL / SALESFORCE EVENTS ----------------- */
                /*
                var myPortalNotResolved = $rootScope.$on(PORTAL_EVENTS.notResolved, function (event, errorReturnCode) {
                    NotificationService.deleteHttpErrors();
                    $log.warn('MainCtrl - 409 in myPortal, with code:', errorReturnCode);
                    if (errorReturnCode) {
                        NotificationService.setHttpError(errorReturnCode, true);
                    }
                });
                $scope.$on('$destroy', myPortalNotResolved);

                */
                /* ----------------- REGISTRATION EVENTS ----------------- */
                /*
                var regNotResolved = $rootScope.$on(REG_EVENTS.notResolved, function (event, errorReturnCodes) {
                    NotificationService.deleteHttpErrors();
                    $log.warn('MainCtrl - 409 in Registration, with codes:', errorReturnCodes);

                    if (_.isArray(errorReturnCodes)) {
                        _.forEach(errorReturnCodes, function (returnCode) {
                            NotificationService.setHttpError(returnCode, true);
                        });
                    }
                });
                $scope.$on('$destroy', regNotResolved);

                var regAlreadyRegistered = $rootScope.$on(REG_EVENTS.alreadyRegistered, function (event, errorReturnCode) {
                    NotificationService.deleteHttpErrors();
                    $log.warn('MainCtrl - 409 in Registration, with codes:', errorReturnCode);
                    if (errorReturnCode) {
                        NotificationService.setHttpError(errorReturnCode, true);
                    }
                    $state.go('main.aio.landing.page', {refresh: 'refresh'});
                });
                $scope.$on('$destroy', regAlreadyRegistered);

                var registeredSuccess = $rootScope.$on(REG_EVENTS.registeredSuccess, function (event, redirect) {
                    $log.info('MainCtrl - registration success - back to Landing Page in MainCtrl');
                    stopAdditionalServices();
                    if (redirect) {
                        $state.go('main.aio.landing.page', {refresh: 'refresh'});
                    }
                });
                $scope.$on('$destroy', registeredSuccess);

                var cancelNoLoginReg = $rootScope.$on(REG_EVENTS.cancelWithoutLoginReg, function (event, redirect) {
                    $log.info('MainCtrl - cancel registration - back to Landing Page in MainCtrl');
                    stopAdditionalServices();
                    if (redirect) {
                        $state.go('main.aio.landing.page', {refresh: 'refresh'});
                    }
                    NotificationService.deleteHttpErrors();
                    NotificationService.deleteFEs();
                    NotificationService.setFE(REG_EVENTS.cancelWithoutLoginReg, true);
                });
                $scope.$on('$destroy', cancelNoLoginReg);


                var refreshedRegistrationPage = $rootScope.$on(REG_EVENTS.refresh, function (event, redirect) {

                    $log.info('MainCtrl - refreshed during registration - back to step 1');
                    console.log('refreshedPage redirect: ', redirect);
                    stopAdditionalServices();
                    if (redirect) {
                        $state.go('main.aio.registration.info');
                    }
                    NotificationService.deleteHttpErrors();
                    NotificationService.deleteFEs();
                    NotificationService.setFE(REG_EVENTS.refresh, true);
                });
                $scope.$on('$destroy', refreshedRegistrationPage);

*/
                /* ----------------- ACCOUNT EVENTS ----------------- */
                /*
                var accountNotResolved = $rootScope.$on(ACCOUNT_EVENTS.notResolved, function (event, errorReturnCode) {
                    NotificationService.deleteHttpErrors();
                    $log.warn('MainCtrl - 409 in Account, with codes:', errorReturnCode);
                    if (errorReturnCode) {
                        NotificationService.setHttpError(errorReturnCode, true);
                    }
                });
                $scope.$on('$destroy', accountNotResolved);

                /*var accountnoTransactions = $rootScope.$on(ACCOUNT_EVENTS.noTransactions, function () {
                 NotificationService.setFE(ACCOUNT_EVENTS.noTransactions, true);
                 });
                 $scope.$on('$destroy', accountnoTransactions);*/


                /* ----------------- CORE EVENTS ----------------- */
                /*
                var coreGenericFailure = $rootScope.$on(CORE_EVENTS.genericFailure, function () {
                    NotificationService.delete();
                    NotificationService.setHttpError(CORE_EVENTS.genericFailure, true);

                    $state.go('main.aio.landing.page', {refresh: 'refresh'});
                });
                $scope.$on('$destroy', coreGenericFailure);

                var coreNotAuthorized = $rootScope.$on(CORE_EVENTS.notAuthorized, function (event, data) {
                    $log.warn('MainCtrl - 403 Forbidden in Compliance, with data:', data);
                    NotificationService.deleteHttpErrors();
                    NotificationService.setHttpError(data.returnCode, true);
                    pageStateResolver.resolve(data.nextPage, function (stateName) {
                        if (stateName) {
                            $state.go(stateName);
                        } else {
                            $rootScope.$broadcast(CORE_EVENTS.genericFailure);
                        }
                    });
                });
                $scope.$on('$destroy', coreNotAuthorized);

                var coreNotAuthorizedRetrieval = $rootScope.$on(CORE_EVENTS.notAuthorizedRetrieval, function (event, data) {
                    $log.warn('MainCtrl - 403 Forbidden in Retrieval, with data:', data);
                    NotificationService.deleteHttpErrors();
                    if (data.returnCode) {
                        NotificationService.setHttpError(data.returnCode, true);
                    }
                    $state.go('main.aio.landing.page', {refresh: 'refresh'});
                });
                $scope.$on('$destroy', coreNotAuthorizedRetrieval);

                var coreLockedAccountRetrieval = $rootScope.$on(CORE_EVENTS.lockedAccountRetrieval, function (event, data) {
                    $log.warn('MainCtrl - 403 Forbidden in Retrieval, with data:', data);
                    NotificationService.deleteHttpErrors();
                    if (data.returnCode) {
                        NotificationService.setHttpError(data.returnCode, true);
                    }
                    $state.go('main.aio.landing.page', {refresh: 'refresh'});
                });
                $scope.$on('$destroy', coreLockedAccountRetrieval);

                var coreNoFYI = $rootScope.$on(CORE_EVENTS.noFYI, function (event, data) {
                    fyi.dismissFYI(data);
                });
                $scope.$on('$destroy', coreNoFYI);
*/
                /* ----------------- FEEDBACK --------------------- */
                /*
                var feedbackSuccess = $rootScope.$on(FEEDBACK_EVENTS.success, function () {
                    $log.info('MainCtrl - feedback success');

                    NotificationService.deleteHttpErrors();
                    NotificationService.deleteFEs();
                    NotificationService.setFE(FEEDBACK_EVENTS.success, true);
                });
                $scope.$on('$destroy', feedbackSuccess);

                var feedbackError = $rootScope.$on(FEEDBACK_EVENTS.error, function (event, data) {
                    $log.info('MainCtrl - feedback error');
                    //console.log(data);
                    NotificationService.deleteHttpErrors();
                    //NotificationService.deleteFEs();
                    //NotificationService.setHttpError(FEEDBACK_EVENTS.error, true);
                    NotificationService.setHttpError(data.returnCode, true);
                });
                $scope.$on('$destroy', feedbackError);

*/
                /* ----------------- PROFILE EVENTS ----------------- */
                /*
                var profileUniversalErrors = $rootScope.$on(PROFILE_EVENTS.universalError, function (event, errorReturnCodes) {
                    NotificationService.deleteHttpErrors();
                    NotificationService.deleteFEs();
                    $log.warn('MainCtrl - 409 in Profile, with codes:', errorReturnCodes);
                    if (_.isArray(errorReturnCodes)) {
                        _.map(errorReturnCodes, function (returnCodes) {
                            NotificationService.setHttpError(returnCodes, true);
                        });
                    }
                });
                $scope.$on('$destroy', profileUniversalErrors);


                var profileSuccessEmailChanges = $rootScope.$on(PROFILE_EVENTS.successEmailChanges, function () {
                    $log.info('MainCtrl - email success changed in Profile');

                    NotificationService.deleteHttpErrors();
                    NotificationService.deleteFEs();
                    NotificationService.setFE(PROFILE_EVENTS.successEmailChanges, true);
                });
                $scope.$on('$destroy', profileSuccessEmailChanges);

                var profileSuccessEDDChanges = $rootScope.$on(PROFILE_EVENTS.successEDDChanges, function () {
                    $log.info('MainCtrl - EDD success changed in Profile');

                    NotificationService.deleteHttpErrors();
                    NotificationService.deleteFEs();
                    NotificationService.setFE(PROFILE_EVENTS.successEDDChanges, true);
                });
                $scope.$on('$destroy', profileSuccessEDDChanges);

                var profileSuccessSecuritySetupChanges = $rootScope.$on(PROFILE_EVENTS.successSecuritySetupChanges, function () {
                    $log.info('MainCtrl - security setup success changed in Profile');

                    NotificationService.deleteHttpErrors();
                    NotificationService.deleteFEs();
                    NotificationService.setFE(PROFILE_EVENTS.successSecuritySetupChanges, true);
                    $state.reload();
                });
                $scope.$on('$destroy', profileSuccessSecuritySetupChanges);
*/
                /* ----------------- MISC HELPERS ----------------- */
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

                /**
                 * Sets the value of ariaHiddenAttr that's currently used in notifications div.
                 */
                /*function checkNotifications(){
                 // console.log('fyi.showFYI =', vm.fyi);
                 // console.info(NotificationService.messages.httpErrorMessages);
                 // console.info(NotificationService.messages.FeMessages);
                 // var showAria = _.isEmpty(NotificationService.messages.httpErrorMessages) &&
                 //     _.isEmpty(NotificationService.messages.FeMessages) && (vm.fyi.showFYI === false);
                 // console.log('showAria value =', showAria);
                 vm.ariaHiddenAttr = _.isEmpty(NotificationService.messages.httpErrorMessages) &&
                 _.isEmpty(NotificationService.messages.FeMessages) && (vm.fyi.showFYI === false);

                 }*/
            }
        ]);
})();