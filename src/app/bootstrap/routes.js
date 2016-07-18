(function () {
    'use strict';

    angular.module('aio.core.main')
        .config([
            '$stateProvider',
            '$urlRouterProvider',
            '$urlMatcherFactoryProvider',           
            function ($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {
                function valToString(val) {
                    return val !== null ? decodeURIComponent(val).toString() : val;
                }

                $urlMatcherFactoryProvider.type('doURIdecode', {
                    encode: valToString,
                    decode: valToString,
                    is: function () {
                        return true;
                    }
                });

                /**
                 * There seems to be a problem with otherwise('/url') it keeps looping.
                 * Instead redirect to a state $urlRouterProvider.otherwise('/aio/portfolio');
                 */
                $urlRouterProvider.otherwise(function ($injector) {
                    $injector.invoke(['$state', 'deviceDetector', function ($state, deviceDetector) {
                       
                        // //if we are not in IE 9 then lets try to go to portfolio.
                        if (!(deviceDetector.browser === 'ie' && deviceDetector.browser_version <= '9.0')  ) {
                            // @todo: check if back btn functionality apply
                            //$state.go('main.aio.portfolio');
                            $state.go('main.aio.landing.page');
                        }
                    }]);

                });

                $stateProvider
                    .state('main', {
                        url: '/{locale:(?:en|fr)}',
                        abstract: true,
                        controller: 'MainCtrl as Main',
                        templateUrl: 'app/core/includes/layouts/main.layout.html'
                    })
                    .state('main.aio', {
                        url: '/advisorLocator',
                        abstract: true,
                        views: {
                            'drawer': {
                                controller: 'HeaderCtrl as Head',
                                templateUrl: 'app/core/includes/header/drawer.tpl.html'
                            },
                            'header': {
                                controller: 'HeaderCtrl as Head',
                                templateUrl: 'app/core/includes/header/header.tpl.html'
                            },
                            'notifications': {
                                controller: 'NotificationsCtrl as Notes',
                                templateUrl: 'app/core/includes/notifications/notifications.tpl.html'
                            },
                            'footer': {
                                controller: 'FooterCtrl as Footer',
                                templateUrl: 'app/core/includes/footer/footer.tpl.html'
                            },
                            'content': {}
                        }
                    })

                    /********************* LOGIN *******************************/
                    .state('main.aio.landing', {
                        abstract: true,
                        views: {
                            // use absolute naming [view-name @ state where the view is defined]
                            'content@main': {
                                templateUrl: 'app/features/landing/landing.layout.tpl.html'
                            }
                        }
                    })
                    .state('main.aio.landing.page', {
                        url: '/landing/:refresh',
                        resolve: {
                        },
                        views: {
                            'landing': {
                                controller: 'LandingCtrl as Landing',
                                templateUrl: 'app/features/landing/landing/landing.tpl.html'
                            }/*,
                            'login': {
                                controller: 'LoginCtrl as Login',
                                templateUrl: 'app/core/login/login.tpl.html'
                            }*/
                        }
                    })


            }
        ]);
})();