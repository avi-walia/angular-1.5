(function () {
    'use strict';

    angular.module('advisorLocator')
        .run(runBlock);

    runBlock.$inject = [
        '$rootScope', 'NotificationService',
        '$translate', 'pageStateResolver', 'tmhDynamicLocale', '$window', 'stateTrackerService'
    ];

    /* @ngInject */

    function runBlock($rootScope, NotificationService,
                      $translate, pageStateResolver, tmhDynamicLocale, $window, stateTrackerService) {

        // ionic stuff
        /*
        $ionicPlatform.ready(function()
        {
            if(window.cordova && window.cordova.plugins.Keyboard)
            {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                console.warn("ionic: hideKeyboardAccessoryBar");
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);

                // Don't remove this line unless you know what you are doing. It stops the viewport
                // from snapping when text inputs are focused. Ionic handles this internally for
                // a much nicer keyboard experience.
                console.warn("ionic:keyboard.disableScroll");
                cordova.plugins.Keyboard.disableScroll(false);
            }
            if(window.StatusBar)
            {
                console.warn("ionic:StatusBar.styleDefault");
                StatusBar.styleDefault();
                StatusBar.overlaysWebView(false);
            }
        });
*/
        // an object that holds the requested page configuration
        //@todo: add this one to the Registry
        $rootScope.oRequestedPageConfig = {};

        // Set dynamically loaded default values for 'currency', 'calendar'
        // and other angular components from /assets/locales/angular-locale_*.js
        $rootScope.$on('$translateChangeStart', function (event, locale) {
            // this returns a promise
            tmhDynamicLocale.set(locale.language);
            // trigger localization of third-party libraries.
            // E.g.,
            //moment.locale(locale.language);
            
        });

        $rootScope.$on('$stateChangeError',
            function (event, toState, toParams, fromState, fromParams, error) {
                pageStateResolver.pageLoading = false;
                console.warn('Router Error:', error);
            });

        $rootScope.$on('$stateChangeSuccess',
            function (event, toState, toParams, fromState, fromParams) {
                console.log('success');
                console.log("From state avii", fromState);
                stateTrackerService.previousState = fromState;

                /**
                 * Gets route configuration object for the requested route
                 */
                /*pageStateResolver
                 .getPageConfigFromState(toState.name, function (oPageConfig) {
                 if ('pageTitle' in oPageConfig) {
                 $rootScope.oRequestedPageConfig = oPageConfig;
                 }
                 });*/
                //Check routes.config.json for configurating oPageConfig objects
                pageStateResolver.getPageConfigFromState(toState.name, function (oPageConfig) {
                    console.log('oPageConfig: ', oPageConfig);
                    if ('pageName' in oPageConfig) {
                        $rootScope.oRequestedPageConfig = oPageConfig;
                    }
                });

                /*
                 * Sets the current page for:
                 *
                 * dynamic CSS class on main layout,
                 */
                pageStateResolver.setActivePageName(toState.name);


                // DELETE Notifications on every route change,
                // BUT "login|portfolio"
                // Or first step of registration, password resetting, or web id retrieval if coming from a later step.
                // OR same route
                if (!NotificationService.isEmpty())
                {
                    console.info('*** About to delete Notifications !!!');
                    NotificationService.delete();
                }

                if (toState.resolve) {
                    pageStateResolver.pageLoading = false;
                }

                //scroll at the top of the page after each route change
                $window.scrollTo(0, 0);

            });

        $rootScope.$on('$stateChangeStart',
            function (event, toState, toParams, fromState, fromParams) {

                //console.log('on $stateChangeStart, fromState:', fromState);
                console.log('on $stateChangeStart, fromState() name:', fromState.name);
                console.log('on $stateChangeStart, toState() name:', toState.name);
                console.log('on $stateChangeStart, toParams() name:', toParams);

                ///////// *** KEEP ME AT THE TOP, WE HAVE TO NEGOTIATE THE LANGUAGE URL SWITCH !!! *** /////////
                // use LOCALE from URL, if any
                if (toParams.locale) {
                    // set LOCALE from URL
                    $translate.use(toParams.locale);
                } else {
                    // get user defined locale
                    toParams.locale = $translate.use();
                    if (!toParams.locale) {
                        // get storage defined locale
                        var translateLocalStorageKey = $translate.storageKey(),
                            translateStorage = $translate.storage();
                        toParams.locale = translateStorage.get(translateLocalStorageKey);
                        if (!toParams.locale) {
                            // no locale set by user or into local storage.
                            // force 'en' as default locale
                            toParams.locale = 'en';
                            // add default lang to $translate storage
                            translateStorage.put(translateLocalStorageKey, toParams.locale);
                        }
                    }
                    // ...finally, use it !
                    $translate.use(toParams.locale);
                }
                // sets up lang attribute on the html tag and language class on body tag
                $rootScope.documentLanguage = toParams.locale;
        /*        var scr = document.createElement("script");
                scr.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyCwahusHkUZ-LOTVpawRSoKh-h2ktVbj2I&libraries=geometry,places&language=" + $rootScope.documentLanguage;
                document.getElementsByTagName("head")[0].appendChild(scr);*/
                ///////// *** END LANGUAGE NEGOTIATION *** /////////

                pageStateResolver.pageLoading = false;
                if (toState.resolve) {
                    pageStateResolver.pageLoading = true;
                }

            });

    }//end: runBlock

})();