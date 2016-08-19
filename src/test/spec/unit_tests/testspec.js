var footerHtml = '<p class="copyright" translate="copyright" translate-value-year="{{::( $ctrl.year )}}"></p><span class="logo" title="{{ \'navbar.logo-text\' | translate }}" translate></span>';
var searchBarHtml = '<div><input style="width:50%; margin-top:25px;" type="text" ng-model="$ctrl.service.searchCriteria" /> <select ng-model="$ctrl.searchBy" ng-change="$ctrl.navigate($ctrl.searchBy)"> <option value="name" translate>search.byName</option> <option value="location" translate>search.byLocation</option> </select> <button style="margin-left:50px;" translate ng-click="$ctrl.service.search($ctrl.service.searchCriteria)" translate>searchButton</button> </div>';
var localeEn = {
    "appTitle": "App Title",
    "searchButton": "Search",
    "search": {
        "byName": "Search By: Advisor Name",
        "byLocation": "Search By: Location"
    },
    "searchResultsFound": "Search results found.",
    "noSearchCriteria": "There are no search results to be displayed.",
    "pages": {
        "page1": "Page 1 Title",
        "page2": "Page 2 Title",
        "page3": "Page 3 Title",
        "page4": "Page 4 Title",
        "page5": "Page 5 Title",
        "advisorList": "Search for Advisor"
    },
    "helpLabel": "Help",

    "navbar": {
        "EN": "English",
        "FR": "Français",
        "logo-img": "logos.svg",
        "browse-happy": "You are using an <strong>outdated</strong> browser. Please <a href='http://browsehappy.com/'>upgrade your browser</a> to improve your experience.",
        "dismiss-message": "Dismiss message",
        "logo-text": "Advisor Locator"
    },

    "universal" : {
        "font-size": "Font size:",
        "font-size-normal": "Change application font size to normal.",
        "font-size-large": "Change application font size to large.",
        "font-size-largest": "Change application font size to largest."
    },
    "footer": {
        "linkText1": "Link 1",
        "linkText2": "Link 2",
        "linkText3": "Link 3",
        "linkText4": "Link 4",
        "link1": "https://www.google.ca/",
        "link2": "https://www.yahoo.ca/",
        "link3": "https://www.ci.com/",
        "link4": "https://www.assanteservices.com/aiol/#/en/aio/landing/"
    },
    "homeFooterLink": "NameOfMyNewSite.com",
    "copyright": "©{{ year }} {{ 'company' | translate}}",
    "company": "Name of Company",
    "companyLink": "https://www.assante.com",
    "notifications": {
        "http-errors": {
            "E409001": "<em class=\"material-icons\">error</em>Invalid advisor id",
            "E409002": "<em class=\"material-icons\">error</em>Invalid branch id",
            "core-generic-failure": "<em class=\"material-icons\">error</em>There is an issue on our side."
        },
        "fe-messages": {
            "cancel": "<em class=\"material-icons\">error</em>Canceled.",
            "refresh": "<em class=\"material-icons\">error</em>Refreshing the page has resulted in any unsaved information being lost."

        }
    },
    "branchList":{
        "title": "Branch List",
        "autoComplete": "Somewhere in Canada:",
        "placeholder": "Enter a location",
        "linkToMap": "Get direction on a map",
        "currentLocation": "Current+Location"
    }
};


describe('example test', function() {
    it('should be true', function() {
        expect('foo').toBe('foo');
    });
});

(function () {
    describe('dataCacheSessionStorage', function () {
        var customCacheFactory;
        var cacheFactory;
        beforeEach(function() {
            module('advisorLocator.utils');
            module('advisorLocator.core.server');
            module('angular-cache');
            inject(['$injector', 'CacheFactory', function($injector, $CacheFactory){
                cacheFactory = $injector.get('CacheFactory');
                customCacheFactory = $injector.get('dataCacheSessionStorage');
            }]);
        });

        it('Session storage should store stuff', function() {
            var testKey = 'testKey';
            var factoryKey = 'TempAppData';
            var cf = cacheFactory.get(factoryKey);
            var testData = {jon:'snow'};

            cacheTester(customCacheFactory, testKey, factoryKey, cf, testData);
        });

    });
})();

(function () {
    describe('dataCacheLocalStorage', function () {
        var customCacheFactory;
        var cacheFactory;
        beforeEach(function() {
            module('advisorLocator.utils');
            module('advisorLocator.core.server');
            module('angular-cache');
            inject(['$injector', 'CacheFactory', function($injector, $CacheFactory){
                cacheFactory = $injector.get('CacheFactory');
                customCacheFactory = $injector.get('dataCacheLocalStorage');
            }]);
        });
        it('Session storage should store stuff', function() {
            var testKey = 'testKey';
            var factoryKey = 'PermAppData';
            var cf = cacheFactory.get(factoryKey);
            var testData = {jon:'snow'};


            cacheTester(customCacheFactory, testKey, factoryKey, cf, testData, true);
        });

    });
})();

(function () {
    describe('notificationsCacheService', function () {
        var customCacheFactory;
        var cacheFactory;
        beforeEach(function() {
            module('advisorLocator.utils');
            module('advisorLocator.core.server');
            module('angular-cache');
            inject(['$injector', 'CacheFactory', function($injector, $CacheFactory){
                cacheFactory = $injector.get('CacheFactory');
                customCacheFactory = $injector.get('notificationsCacheService');
            }]);
        });
        it('Session storage should store stuff', function() {
            var testKey = 'testKey';//some key for an item you want to store in the factory's cache
            var factoryKey = 'TempAppNotifications';//the key the factory uses to store data
            var cf = cacheFactory.get(factoryKey);
            var testData = {jon:'snow'};


            cacheTester(customCacheFactory, testKey, factoryKey, cf, testData);
        });

    });
})();


(function () {
    describe('footer Component', function () {
        var customCacheFactory;
        var controller;
        var translate;
        var copyrightYear;
        var $compile;
        var $rootScope;
        var $httpBackend
        beforeEach(function() {
            module('ui.router');
            module('pascalprecht.translate');
            module('advisorLocator.core.main');
            module('advisorLocator');
            inject(['$injector', '$controller', '$translate', 'copyrightYear', '$compile', '$rootScope', '$httpBackend', function($injector, $controller, $translate, _copyrightYear_, _$compile_, _$rootScope_, _$httpBackend_){
                controller = $controller;
                translate = $translate;
                copyrightYear = _copyrightYear_;
                $compile = _$compile_
                $rootScope = _$rootScope_;
                $httpBackend = _$httpBackend_;
                $httpBackend.when('GET', 'assets/locales/locale-en.json').respond(localeEn);
                $httpBackend.when('GET', 'app/core/components/footer/footer.tpl.html').respond(footerHtml);
                $httpBackend.when('GET', 'app/core/layout/main.layout.html').respond('test');
            }]);
        });
        it('Footer controller should do stuff', function() {
            var $scope = {};
            var element = $compile('<ci-footer id="footer"></ci-footer>')($rootScope);
            $httpBackend.flush();
            $rootScope.$digest();
            var now = new Date();
            expect(element.html()).toContain(now.getFullYear().toString());
        });

    });
})();
(function () {
    describe('footer Component', function () {
        var customCacheFactory;
        var controller;
        var translate;
        var copyrightYear;
        var $compile;
        var $rootScope;
        var $httpBackend
        beforeEach(function() {
            module('ui.router');
            module('pascalprecht.translate');
            module('advisorLocator.core.main');
            module('advisorLocator');
            inject(['$injector', '$controller', '$translate', 'copyrightYear', '$compile', '$rootScope', '$httpBackend', function($injector, $controller, $translate, _copyrightYear_, _$compile_, _$rootScope_, _$httpBackend_){
                controller = $controller;
                translate = $translate;
                copyrightYear = _copyrightYear_;
                $compile = _$compile_
                $rootScope = _$rootScope_;
                $httpBackend = _$httpBackend_;
                $httpBackend.when('GET', 'assets/locales/locale-en.json').respond(localeEn);
                $httpBackend.when('GET', 'app/core/components/footer/footer.tpl.html').respond(footerHtml);
                $httpBackend.when('GET', 'app/core/layout/main.layout.html').respond('test');
            }]);
        });
        it('Footer controller should do stuff', function() {
            var $scope = {};
            var element = $compile('<ci-footer id="footer"></ci-footer>')($rootScope);
            $httpBackend.flush();
            $rootScope.$digest();
            var now = new Date();
            expect(element.html()).toContain(now.getFullYear().toString());
        });

    });
})();


(function () {
    describe('searchBar Component', function () {
        var customCacheFactory;
        var controller;
        var translate;
        var copyrightYear;
        var $compile;
        var $rootScope;
        var $httpBackend;
        var $state;
        beforeEach(function() {
            module('pascalprecht.translate');
            module('advisorLocator.utils');
            module('advisorLocator');
            inject(['$injector', '$controller', '$translate', 'copyrightYear', '$compile', '$rootScope', '$httpBackend', '$state', function($injector, $controller, $translate, _copyrightYear_, _$compile_, _$rootScope_, _$httpBackend_, _$state_){
                controller = $controller;
                translate = $translate;
                copyrightYear = _copyrightYear_;
                $compile = _$compile_;
                $rootScope = _$rootScope_;
                $httpBackend = _$httpBackend_;
                $httpBackend.when('GET', 'assets/locales/locale-en.json').respond(localeEn);
                $httpBackend.when('GET', 'app/utils/components/searchBar/searchBar.tpl.html').respond(searchBarHtml);
                $httpBackend.when('GET', 'app/core/layout/main.layout.html').respond('test');
                $state = _$state_;
            }]);
        });
        it('searchBar should do stuff', function() {
            var $scope = {};
            $state.current.url = '/advisors';
            var element = $compile('<search-bar service="$ctrl.service"></search-bar>')($rootScope);
            $httpBackend.flush();
            $rootScope.$digest();
            console.log('$rootScope.$$childHead["$ctrl"]: ', $rootScope.$$childHead['$ctrl']);
            var searchBarCtrl = $rootScope.$$childHead['$ctrl'];
            expect(searchBarCtrl.searchBy).toEqual('name');
            spyOn($state, 'go');
            searchBarCtrl.navigate('location');
            expect($state.go).toHaveBeenCalledWith('main.advisorLocator.branchList');
            searchBarCtrl.navigate('name');
            expect($state.go).toHaveBeenCalledWith('main.advisorLocator.advisorList');

        });

    });
})();
(function () {
    describe('advisor Service', function () {
        var advisorService;
        var server;
        var $rootScope;
        beforeEach(function() {


            module('advisorLocator.features.searchByName');

            angular.module('advisorLocator.utils');
            module('advisorLocator');
            module('advisorLocator.core.server');
            serverMock = {
                get: jasmine.createSpy('get() mock')
            };

            inject(['$injector', 'advisorService', 'server', '$q', '$rootScope', '$httpBackend', function($injector, _advisorService_, _server_, $q, _$rootScope_, _$httpBackend_){
                $httpBackend = _$httpBackend_;
                $httpBackend.when('GET', 'assets/locales/locale-en.json').respond(localeEn);
                $httpBackend.when('GET', 'app/core/layout/main.layout.html').respond('test');
                //advisorService = $injector.get('advisorService');
                advisorService = _advisorService_;
                server = _server_;
                $rootScope = _$rootScope_;
                //server.get = jasmine.createSpy('get spy');
                spyOn(server, 'get').and.callFake(function() {
                    var deferred = $q.defer();
                    deferred.resolve({data: advisors});
                    return deferred.promise;
                })
            }]);
        });
        it('advisorService should do stuff', function() {
            //spyOn(server, 'get');
            advisorService.init();
            var BASE_URL = 'http://localhost:3000';
            var ENDPOINT_URI = '/advisorlocatorws';
            expect(advisorService.isLoading).toEqual(true);
            expect(advisorService.numPerPage).toEqual(50);
            $rootScope.$apply();//this is needed for the async $q to resolve
            expect(server.get).toHaveBeenCalledWith(BASE_URL + ENDPOINT_URI + '/advisors', false, 'localStorage', false);
            expect(advisorService.searchResults).toEqual([]);
            expect(advisorService.isLoading).toEqual(false);
            advisorService.search('noman');
            expect(advisorService.searchTerm).toEqual('noman');
            expect(advisorService.searchResults).toEqual([newAdvisor('Muhammad', 'Noman')]);
            console.log('advisorService.maxPages: ', advisorService.maxPages);
            expect(advisorService.maxPages).toEqual(1);
            advisorService.search('NomAn');
            expect(advisorService.searchTerm).toEqual('NomAn');
            expect(advisorService.searchResults).toEqual([newAdvisor('Muhammad', 'Noman')]);
            expect(advisorService.maxPages).toEqual(1);
            advisorService.search('chong');
            expect(advisorService.searchTerm).toEqual('chong');
            expect(advisorService.searchResults).toEqual([newAdvisor('Michael', 'Chong'), newAdvisor('Barry', 'Chong')]);
            expect(advisorService.maxPages).toEqual(1);
            advisorService.search('o');
            expect(advisorService.searchTerm).toEqual('o');
            expect(advisorService.searchResults).toEqual([
                newAdvisor('Michael', 'Chong'),
                newAdvisor('Dziana', 'Roslik'),
                newAdvisor('Muhammad', 'Noman'),
                newAdvisor('Barry', 'Chong')
            ]);
            expect(advisorService.maxPages).toEqual(1);
            expect(advisorService.numPerPage).toEqual(50);
            expect(advisorService.mobileMaxNumDisplay).toEqual(50);
            expect(advisorService.currentPage).toEqual(1);

        });

    });
})();

/*
(function () {
    describe('languageSwitcherController', function () {
        var $controller;
        var $rootScope;
        var $translate;
        var $state;
        var $stateParams;
        //var languageSwitcherController;

        beforeEach(function() {
            module('ui.router');
            module('pascalprecht.translate');
            module('advisorLocator.core.main');
            module('advisorLocator');
            inject(['$controller', '$rootScope', '$state', '$stateParams', '$httpBackend', '$q', '$timeout', function(_$controller, _$rootScope, _$state, _$stateParams, _$httpBackend, _$q, _$timeout){

                _$httpBackend.when('GET', 'assets/locales/locale-en.json').respond(['test', 'one']);
                _$httpBackend.when('GET', 'assets/locales/locale-fr.json').respond(['test', 'one']);
                _$httpBackend.when('GET', 'app/core/includes/header/languageSwitcher/languageSwitcher.html').respond(['test', 'one']);
                _$httpBackend.when('GET', 'app/core/includes/layouts/main.layout.html').respond(['test', 'one']);
                $controller = _$controller;
                //languageSwitcherController = $controller('LanguageSwitcherController', {$rootScope: $rootScope, $translate: $translate, $state: $state});
                $rootScope = _$rootScope;
                $state = _$state;
                $stateParams = _$stateParams;
                $translate = function() {
                    var vm = this;
                    vm.use = function(langKey) {
                        console.log('new Lang Key: ', langKey);
                        if(langKey){
                            console.log('setting new Lang Key: ', langKey);
                            var deferred = _$q.defer();
                            setTimeout(function(){
                               //vm.langKey = langKey;
                                console.log('resolving promise');
                                deferred.resolve(langKey);
                                $rootScope.$digest();
                            },10);
                            return deferred.promise;
                        } else {
                            console.log('returning new Lang Key: ', vm.langKey);
                            console.log('langKey1123: ', vm.langKey);
                            return vm.langKey;
                        }
                    }
                    return vm;
                };



                //deferred.resolve('resolveData');
                //spyOn($translate, 'use').andReturn(deferred.promise);

            }]);
        });
        it('languageSwitcherController controller should do stuff', function(done) {
            $rootScope.documentLanguage = 'en';
            var languageSwitcherController = $controller('LanguageSwitcherController', {$rootScope: $rootScope, $translate: $translate(), $state: $state});
            expect(languageSwitcherController.currentLanguage).toEqual('en');

            waitsForAndRuns(function(){return languageSwitcherController.currentLanguage == 'fr';}, function(){languageSwitcherController.changeLanguage('fr');}, 5000)

            expect(languageSwitcherController.currentLanguage).toEqual('fr');
        });

    });
})();
*/
/*
describe("Directive", function () {

    var $scope, controller, element, rootScope;
    var tempScope;
    beforeEach(function() {

        module('ui.router');
        module('pascalprecht.translate');
        module('advisorLocator.core.main');
        module('advisorLocator');
        inject(function ($rootScope, $compile, $httpBackend) {
            rootScope = $rootScope;
            $httpBackend.when('GET', 'assets/locales/locale-en.json').respond(['test', 'one']);
            $httpBackend.when('GET', 'app/core/includes/header/languageSwitcher/languageSwitcher.html').respond(['test', 'one']);
            $httpBackend.when('GET', 'app/core/includes/layouts/main.layout.html').respond(['test', 'one']);
            $scope = $rootScope.$new();
            $scope.test = 'fish';
            element = angular.element("<language-switcher></language-switcher>");
            $compile(element)($scope);
            $scope.$digest();

            //rootScope = $rootScope;
        })
    });
    it("should toogle open when toggle() is called", inject(function() {
        console.log('controller: ',element.isolateScope());
        expect(element.isolateScope()).toBe({});
    }));

});
*/