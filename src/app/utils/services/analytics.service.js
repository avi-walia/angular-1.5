/**
 * Service used to track events through google analytics.
 * It uses a plugin called $analytics - https://luisfarzati.github.io/angulartics/
 * The labels in the code do not need to be translated since GA is in english anyway.
 * Created by vvillanu on 2016-03-15.
 */

(function () {
    'use strict';

    angular
        .module('aio.utils')
        .service('analyticsService', analyticsService);

    analyticsService.$inject = ['$analytics'];

    /* @ngInject */
    function analyticsService($analytics) {
        var service = this;
        var evt = '';
        /** FUNCTIONS **/
        service.trackErrorAnalytics = trackErrorAnalytics;
        service.trackSuccessAnalytics = trackSuccessAnalytics;
        /** End OF FUNCTIONS **/

        /**
         *
         * @param resultBool Either true or false. True if it was a success call. Otherwise it is false.
         * @param category The pages like LOGIN, REGISTRATION etc.
         * @param errorCode API Error codes
         */

        function trackErrorAnalytics(resultBool, errorCode, category) {
            //console.clear();
            // console.log('result = ', resultBool);
            // console.log('trackErrorAnalytics errorCode = ', errorCode);
            // console.log('trackErrorAnalytics category = ', category);

            if (_.isArray(errorCode)) {

                _.forEach(errorCode, function (code) {
                    errorTracking(code, category);
                });

            } else {
                errorTracking(errorCode, category);
            }


        }

        //$analytics.eventTrack(evt, { category: category, label: label});

        function errorTracking(errorCode, category) {
            evt = 'Rest Call';

            //$analytics.eventTrack(evt, { category: category, label: label});

            if (errorCode === 'E409011' || errorCode === 'E409014') {

                //$analytics.eventTrack( 'Rest Call', 'REGISTRATION', );
                $analytics.eventTrack(evt, {category: category, label: errorCode + ': Bad SIN'});

            } else if (errorCode === 'E409010') {

                $analytics.eventTrack(evt, {category: category, label: errorCode + ': Already registered'});

            } else if (errorCode === 'E409012') {

                $analytics.eventTrack(evt, {
                    category: category,
                    label: errorCode + ': Invalid Date of Birth Month & Day'
                });

            }
            else if (errorCode === 'E409016' || errorCode === 'E409015') {

                $analytics.eventTrack(evt, {
                    category: category,
                    label: errorCode + ': Nickname already taken / Invalid nickname'
                });

            }
            else if (errorCode === 'E409017' || errorCode === 'E409018') {

                $analytics.eventTrack(evt, {
                    category: category,
                    label: errorCode + ': Password exceeds the max length / Invalid or weak password'
                });

            }
            else if (errorCode === 'E409013' || errorCode === 'E409020' || errorCode === 'E409021') {
                $analytics.eventTrack(evt, {
                    category: category,
                    label: errorCode + ': ID registered / Incomplete question(or answer) / Invalid answer'
                });

            }
            else if (errorCode === 'E401001') {
                //MAY BE CALLED BY AUTH INTERCEPTOR
                $analytics.eventTrack(evt, {category: category, label: errorCode + ': Wrong credentials'});

            }
            else if (errorCode === 'E401002') {
                //MAY BE CALLED BY AUTH INTERCEPTOR
                $analytics.eventTrack(evt, {category: category, label: errorCode + ': Locked account'});

            }
            //added because of bug117
            else if (errorCode === 'E401007') {

                $analytics.eventTrack(evt, {
                    category: category,
                    label: errorCode + ': 3rd or 4th attempt for wrong credentials'
                });

            }
            /** MAY BE CALLED BY FORGOTTEN PASSWORD! **/
            else if (errorCode === 'E409032') {

                $analytics.eventTrack(evt, {category: category, label: errorCode + ': Wrong answer/question'});

            } else if (errorCode === 'E409031') {

                $analytics.eventTrack(evt, {category: category, label: errorCode + ': Invalid ID'});

            }
            else if (errorCode === 'E403001') {

                $analytics.eventTrack(evt, {category: category, label: errorCode + ': Web login id locked'});

            }
            else if (errorCode === 'E409009') {

                $analytics.eventTrack(evt, {
                    category: category,
                    label: errorCode + ': Password exceeds the max length / Invalid or weak password'
                });

            }
            else if (errorCode === 'E409006') {
                $analytics.eventTrack(evt, {
                    category: category,
                    label: errorCode + ': Password doesnt meet min requirements'
                });

            }
            else if (errorCode === 'E409007') {
                $analytics.eventTrack(evt, {category: category, label: errorCode + ': Invalid password'});

            }
            else if (errorCode === 'E409008') {
                $analytics.eventTrack(evt, {
                    category: category,
                    label: errorCode + ': Password similar to old passwords'
                });

            }
            else if (errorCode === 'E409001') {
                $analytics.eventTrack(evt, {category: category, label: errorCode + ': Wrong security answer'});

            }
            else if (errorCode === 'E409019') {
                $analytics.eventTrack(evt, {category: category, label: errorCode + ': Invalid email'});

            }
            else if (errorCode === 'E409037') {
                $analytics.eventTrack(evt, {category: category, label: errorCode + ': Incorrect password'});

            }
            /** END MAY BE CALLED BY FORGOTTEN PASSWORD! **/
        }

        /**
         *
         * @param result Boolean
         * @param evt
         * @param category The pages like LOGIN, REGISTRATION etc.
         * @param label Optional label
         */
        function trackSuccessAnalytics(result, evt, category, label) {
            //console.clear();
            // console.log('result = ', result);
            // console.log('trackSuccessAnalytics evt = ', evt);
            // console.log('trackSuccessAnalytics category = ', category);
            // console.log('trackSuccessAnalytics label = ', label);

            if (_.isBoolean(result) === false) {
                console.error('result needs to be a boolean in analytics service');
                return;
            }
            //if user didnt add a label then set it to N/A
            label = label || 'N/A';

            $analytics.eventTrack(evt, {category: category, label: label});

        }
    }

})();

