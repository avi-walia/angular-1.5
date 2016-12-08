(function () {
    'use strict';

    angular.module('advisorLocator')
        .run(runBlock);

    runBlock.$inject = [
        '$rootScope', 'NotificationService',
        '$translate', 'pageStateResolver', 'tmhDynamicLocale', '$window', 'stateTrackerService', '$state', 'advisorService', 'branchListService', '$timeout'
    ];

    /* @ngInject */

    function runBlock($rootScope, NotificationService,
                      $translate, pageStateResolver, tmhDynamicLocale, $window, stateTrackerService, $state, advisorService, branchListService, $timeout) {
        $rootScope.locale = null;
        var hideShowHeaderTimeout = null;
        var lastScrollTop = 0;
        var delta = 5;
        var navbarHeight = document.getElementById('header');//$('header').outerHeight();
        var lastSt = 0;
        var scrollDebounce = 250;//250ms
        window.onscroll = function() {
            if (hideShowHeaderTimeout !== null) {
                $timeout.cancel(hideShowHeaderTimeout);
            }
            hideShowHeaderTimeout = $timeout(hasScrolled, scrollDebounce);
        };

        function hasScrolled() {
            //var st = window.scrollTop();
            var st = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

            // Make sure they scroll more than delta
            if(Math.abs(lastScrollTop - st) <= delta)
                return;

            // If they scrolled down and are past the navbar, add class .nav-up.
            // This is necessary so you never see what is "behind" the navbar.
            if (st > lastScrollTop && st > navbarHeight){
                // Scroll Down
                document.getElementById('header').className = "header nav-up";
            } else {
                // Scroll Up
                if((st - lastScrollTop) < delta) {
                    //document.getElementById('header').removeClass('nav-up').addClass('nav-down');
                    document.getElementById('header').className = "header nav-down";
                }
            }

            lastScrollTop = st;
        }

        console.log('the demo deployment was a success!');
        $rootScope.$on('clearSearch', function() {
            advisorService.filteredSearchResults = [];
            advisorService.searchResults = [];
            advisorService.searchCriteria = '';

            branchListService.position = {};
            branchListService.location = '';
            branchListService.message = {};
            branchListService.markers = [];
        });

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
        $rootScope.$on('$translateChangeSuccess', function (event, locale) {
            $rootScope.isEnglish = locale.language === 'en';

        });

        $rootScope.$on('$stateChangeError',
            function (event, toState, toParams, fromState, fromParams, error) {
                pageStateResolver.pageLoading = false;
                console.warn('Router Error:', error);
            });

        $rootScope.$on('$stateChangeSuccess',
            function (event, toState, toParams, fromState, fromParams) {
                console.log('success');
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

                if(!(fromState.name) && toState.name === 'main.advisorLocator.advisorDetails'){
                    event.preventDefault();
                    $state.go('main.advisorLocator.advisorList');
                }

                if(!(fromState.name) && toState.name === 'main.advisorLocator.branchDetails'){
                    event.preventDefault();
                    $state.go('main.advisorLocator.branchList');
                }


                pageStateResolver.pageLoading = false;
                if (toState.resolve) {
                    pageStateResolver.pageLoading = true;
                }

            });

    }//end: runBlock

})();