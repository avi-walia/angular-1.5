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
            advisorService.search('Ye');
            expect(advisorService.searchTerm).toEqual('Ye');
            var advisorsWithYe = [
                {"id":30719,"firstName":"Michele","commonName":null,"lastName":"Yergens","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"myergens@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5075,"dealerShip":"ACM","geoLocation":{"lng":-102.99876,"lat":49.14201,"_persistence_fetchGroup":null},"address1":"1330-4th Street","address2":"Unit #1","city":"Estevan","provinceAbbr":"SK","postalCode":"S4A 0X2","phone":"306-634-9008","tollFree":null,"fax":"306-634-8099","_persistence_fetchGroup":null},"_persistence_fetchGroup":null},
                {"id":31096,"firstName":"Kendall","commonName":null,"lastName":"Yeomans","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"kyeomans@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://www.assante.com/advisors/kyeomans","partialBranchInfo":{"id":5265,"dealerShip":"ACM","geoLocation":{"lng":-80.93607,"lat":46.50878,"_persistence_fetchGroup":null},"address1":"363 Falconbridge Road","address2":"Unit 2","city":"Sudbury","provinceAbbr":"ON","postalCode":"P3A 5K5","phone":"705-521-1444","tollFree":null,"fax":"705-521-1450","_persistence_fetchGroup":null},"_persistence_fetchGroup":null},
                {"id":34179,"firstName":"Teresa","commonName":null,"lastName":"Yeung","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"416-490-9944","email":"tyeung@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://www.assante.com/advisors/tyeung","partialBranchInfo":{"id":5862,"dealerShip":"AFM","geoLocation":{"lng":-79.36599,"lat":43.85091,"_persistence_fetchGroup":null},"address1":"15 Allstate Parkway","address2":"Suite 600","city":"Markham","provinceAbbr":"ON","postalCode":"L3R 5B4","phone":"416-490-9944  E","tollFree":" ","fax":"888-454-4811","_persistence_fetchGroup":null},"_persistence_fetchGroup":null},
                {"id":34979,"firstName":"Ian","commonName":null,"lastName":"Yeo","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"604-685-2214","email":"IYeo@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://www.assante.com/advisors/iyeo","partialBranchInfo":{"id":5411,"dealerShip":"ACM","geoLocation":{"lng":-123.115952,"lat":49.285248,"_persistence_fetchGroup":null},"address1":"800 West Pender Street","address2":"Suite 1600","city":"Vancouver","provinceAbbr":"BC","postalCode":"V6C 2V6","phone":"604-685-2214","tollFree":null,"fax":"604-602-0211","_persistence_fetchGroup":null},"_persistence_fetchGroup":null},
                {"id":35383,"firstName":"Janaye","commonName":null,"lastName":"Chubb","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5700,"dealerShip":"AFM","geoLocation":{"lng":-108.2988,"lat":52.77904,"_persistence_fetchGroup":null},"address1":"1421 - 100th Street","address2":null,"city":"North Battleford","provinceAbbr":"SK","postalCode":"S9A 0W1","phone":"306-445-9455","tollFree":null,"fax":"306-445-4966","_persistence_fetchGroup":null},"_persistence_fetchGroup":null},
                {"id":35680,"firstName":"Michelle","commonName":null,"lastName":"Pilgrim-Byers","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"705-325-7743","email":"mpilgrim@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://www.assante.com/advisors/mpilgrim/","partialBranchInfo":{"id":5497,"dealerShip":"ACM","geoLocation":{"lng":-79.42835,"lat":44.61826,"_persistence_fetchGroup":null},"address1":"384 West Street North","address2":"Suite 1","city":"Orillia","provinceAbbr":"ON","postalCode":"L3V 5E6","phone":"705-325-7743","tollFree":null,"fax":"705-325-5761","_persistence_fetchGroup":null},"_persistence_fetchGroup":null},
                {"id":36268,"firstName":"Perry","commonName":null,"lastName":"Loyello","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5843,"dealerShip":"ACM","geoLocation":{"lng":-73.78454,"lat":45.48395,"_persistence_fetchGroup":null},"address1":"2020 Transcanadienne","address2":"Suite 200","city":"Dorval","provinceAbbr":"QC","postalCode":"H9P 2N4","phone":"514-832-5100","tollFree":null,"fax":"514-832-5232","_persistence_fetchGroup":null},"_persistence_fetchGroup":null}
            ]
            expect(advisorService.searchResults).toEqual(advisorsWithYe);
            console.log('advisorService.maxPages: ', advisorService.maxPages);
            expect(advisorService.maxPages).toEqual(1);

            advisorService.search('TeSt');
            expect(advisorService.searchTerm).toEqual('TeSt');
            var advisorsWithTest = [
                {"id":33186,"firstName":"Test","commonName":null,"lastName":"Advisor99","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"416-2527777  ext. 999","email":"tadvisor99@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://www.assante.com/advisors/tadvisor99/","partialBranchInfo":{"id":5074,"dealerShip":"AFM","geoLocation":{"lng":-135.05425,"lat":60.72251,"_persistence_fetchGroup":null},"address1":"3147 3rd Avenue","address2":null,"city":"Whitehorse","provinceAbbr":"YK","postalCode":"Y1A 1E9","phone":"867-667-6100","tollFree":null,"fax":"867-668-7843","_persistence_fetchGroup":null},"_persistence_fetchGroup":null},
                {"id":33630,"firstName":"Test","commonName":null,"lastName":"Assistant99","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5074,"dealerShip":"AFM","geoLocation":{"lng":-135.05425,"lat":60.72251,"_persistence_fetchGroup":null},"address1":"3147 3rd Avenue","address2":null,"city":"Whitehorse","provinceAbbr":"YK","postalCode":"Y1A 1E9","phone":"867-667-6100","tollFree":null,"fax":"867-668-7843","_persistence_fetchGroup":null},"_persistence_fetchGroup":null}
            ];
            expect(advisorService.searchResults).toEqual(advisorsWithTest);
            expect(advisorService.maxPages).toEqual(1);
/*
            advisorService.search('mic');
            expect(advisorService.searchTerm).toEqual('mic');
            var advisorsWithMic = [
                {"id":30719,"firstName":"Michele","commonName":null,"lastName":"Yergens","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"myergens@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5075,"dealerShip":"ACM","geoLocation":{"lng":-102.99876,"lat":49.14201,"_persistence_fetchGroup":null},"address1":"1330-4th Street","address2":"Unit #1","city":"Estevan","provinceAbbr":"SK","postalCode":"S4A 0X2","phone":"306-634-9008","tollFree":null,"fax":"306-634-8099","_persistence_fetchGroup":null},"_persistence_fetchGroup":null},

            ]
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
*/
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