(function () {
    'use strict';

    angular.module('advisorLocator.core.main')
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
                            //$state.go('main.advisorLocator.portfolio');
                            $state.go('main.advisorLocator.page1');
                        }
                    }]);

                });



                $stateProvider
                    .state('main', {
                        url: '/{locale:(?:en|fr)}',
                        abstract: true,
                        controller: 'MainCtrl as Main',
                        templateUrl: 'app/core/layout/main.layout.html'
                    })
                    .state('main.advisorLocator', {
                        url: '/advisorLocator',
                        abstract: true,
                        views: {
                            'content': {}
                        }
                    })

                    /********************* LOGIN *******************************/
                    .state('main.advisorLocator.landing', {
                        abstract: true,
                        views: {
                            // use absolute naming [view-name @ state where the view is defined]
                            'content@main': {
                                templateUrl: 'app/features/landing/landing.layout.tpl.html'
                            }
                        }
                    })
                    .state('main.advisorLocator.landing.page', {
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
                    .state('main.advisorLocator.page1', {
                        url: '/page1',
                        resolve: {
                        },
                        views: {
                            'content@main': {
                                controller: 'Page1Ctrl as Page1',
                                templateUrl: 'app/features/page1/page1.tpl.html'
                            }
                        }
                    })
                    .state('main.advisorLocator.page2', {
                        url: '/page2',
                        resolve: {
                        },
                        views: {
                            'content@main': {
                                controller: 'Page2Ctrl as Page2',
                                templateUrl: 'app/features/page2/page2.tpl.html'
                            }
                        }
                    })
                    .state('main.advisorLocator.page3', {
                        abstract: true,
                        url: '/page3',
                        resolve: {
                        },
                        views: {
                            'content@main': {
                                controller: 'Page3Ctrl as Page3',
                                templateUrl: 'app/features/page3/page3.tpl.html'
                            }
                        }
                    })
                    .state('main.advisorLocator.page3.subpage', {
                        url: '/subpage',
                        resolve: {
                        },
                        views: {
                            'subpage': {
                                controller: 'SubPageCtrl as SubPage',
                                templateUrl: 'app/features/page3/subpage/subpage.tpl.html'
                            },
                            'subpage2': {
                                controller: 'SubPageCtrl as SubPage',
                                templateUrl: 'app/features/page3/subpage/subpage.tpl.html'
                            }/*,
                             'login': {
                             controller: 'LoginCtrl as Login',
                             templateUrl: 'app/core/login/login.tpl.html'
                             }*/
                        }
                    })
                    .state('main.advisorLocator.page4', {
                        url: '/page4',
                        resolve: {
                        },
                        views: {
                            'content@main': {
                                controller: 'Page4Ctrl as Page4',
                                templateUrl: 'app/features/page4/page4.tpl.html'
                            }
                        }
                    })
                    .state('main.advisorLocator.page5', {
                        url: '/page5',
                        resolve: {
                        },
                        views: {
                            'content@main': {
                                controller: 'Page5Ctrl as Page5',
                                templateUrl: 'app/features/page5/page5.tpl.html'
                            }
                        }
                    });


            }
        ]);
})();