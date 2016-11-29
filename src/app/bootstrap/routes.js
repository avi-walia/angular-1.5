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
                            $state.go('main.advisorLocator.advisorList');
                        }
                    }]);

                });



                $stateProvider
                    .state('main', {
                        url: '/{locale:(?:en|fr)}',
                        resolve: {
                            initData: ['envConfigService', function (envConfigService) {
                                if (envConfigService.promise === null) {
                                    var x = envConfigService.init();
                                    return x;
                                } else {
                                    return envConfigService.promise;
                                }
                            }]
                        },
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
             /*       .state('main.advisorLocator.searchByName', {
                        abstract: true,
                        url: '/searchByName',
                        views: {
                            // use absolute naming [view-name @ state where the view is defined]
                            'content@main': {
                                controller: 'SearchByNameCtrl as SearchByName',
                                templateUrl: 'app/features/containers/searchByName/searchByName.layout.tpl.html'

                            }
                        }
                    })*/
                    .state('main.advisorLocator.advisorList', {
                        url: '/advisors',
                        views: {
                            'content@main': {
                               template: '<advisor-list></advisor-list>'
                            }
                        }
                    })
                    .state('main.advisorLocator.advisorDetails', {
                        url: '/advisors/:id',
                        views: {
                            'content@main': {
                                template: '<advisor-detail></advisor-detail>'
                            }
                        }
                    })

                    /************Search by Location ****************/
                 /*   .state('main.advisorLocator.searchByLocation', {
                        abstract: true,
                        url: '/searchByLocation',
                        views: {
                            // use absolute naming [view-name @ state where the view is defined]
                            'content@main': {
                                controller: 'SearchByLocationCtrl as SearchByLocation',
                                templateUrl: 'app/features/containers/searchByLocation/searchByLocation.layout.tpl.html'

                            }
                        }
                    })*/

                    .state('main.advisorLocator.branchListQuery', {
                        url: '/location/:q?',
                        views: {
                            'content@main': {
                                controller: 'branchQueryCtrl'
                            }
                        }


                    })

                    .state('main.advisorLocator.branchList', {
                        url: '/branches',
                        views: {
                            'content@main': {
                                template: '<branch-list></branch-list>'
                            }
                        }
                    })


                    .state('main.advisorLocator.branchDetails', {
                        url: '/branches/:id',
                        views: {
                            'content@main': {
                                template: '<branch-detail></branch-detail>'
                            }
                        }
                    })


                   ;


            }
        ]);
})();