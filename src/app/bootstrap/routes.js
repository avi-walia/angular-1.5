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
                            $state.go('main.advisorLocator.searchByName.list');
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

                    /************Search by Name ****************/
                    .state('main.advisorLocator.searchByName', {
                        abstract: true,
                        url: '/searchByName',
                        views: {
                            // use absolute naming [view-name @ state where the view is defined]
                            'content@main': {
                                controller: 'SearchByNameCtrl as SearchByName',
                                templateUrl: 'app/features/containers/searchByName/searchByName.layout.tpl.html'

                            }
                        }
                    })
                    .state('main.advisorLocator.searchByName.list', {
                        url: '/advisors',
                        views: {
                            'details': {
                               template: '<advisor-list></advisor-list>'
                            }
                        }
                    })
                    .state('main.advisorLocator.searchByName.details', {
                        url: '/advisors/{:id}',
                        views: {
                            'details': {
                                template: '<advisor-detail></advisor-detail>'
                            }
                        }
                    })

                    /************Search by Location ****************/
                    .state('main.advisorLocator.searchByLocation', {
                        abstract: true,
                        url: '/searchByLocation',
                        views: {
                            // use absolute naming [view-name @ state where the view is defined]
                            'content@main': {
                                controller: 'SearchByLocationCtrl as SearchByLocation',
                                templateUrl: 'app/features/containers/searchByLocation/searchByLocation.layout.tpl.html'

                            }
                        }
                    })
                    .state('main.advisorLocator.searchByLocation.list', {
                        url: '/branches',
                        views: {
                            'details': {
                                template: '<branch-list></branch-list>'
                            }
                        }
                    })
                    .state('main.advisorLocator.searchByLocation.details', {
                        url: '/branches/{:id}',
                        views: {
                            'details': {
                                template: '<branch-detail></branch-detail>'
                            }
                        }
                    })


                   ;


            }
        ]);
})();