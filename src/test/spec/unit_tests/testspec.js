var footerHtml = '<p class="copyright" translate="copyright" translate-value-year="{{::( $ctrl.year )}}"></p><span class="logo" title="{{ \'navbar.logo-text\' | translate }}" translate></span>';

var localeEn = {
    "appTitle": "App Title",
    "pages": {
        "page1": "Page 1 Title",
        "page2": "Page 2 Title",
        "page3": "Page 3 Title",
        "page4": "Page 4 Title",
        "page5": "Page 5 Title"
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
        "autoComplete": "Somewhere in Canada:"
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


            cacheTester(customCacheFactory, testKey, factoryKey, cf, testData);
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

/*
(function () {
    describe('footerController', function () {
        var customCacheFactory;
        var controller;
        var translate;
        var copyrightYear;
        beforeEach(function() {
            module('ui.router');
            module('pascalprecht.translate');
            module('advisorLocator.core.main');
            module('advisorLocator');
            inject(['$injector', '$controller', '$translate', 'copyrightYear', function($injector, $controller, $translate, _copyrightYear_){
                controller = $controller;
                translate = $translate;
                copyrightYear = _copyrightYear_;
            }]);
        });
        it('Footer controller should do stuff', function() {
            var $scope = {};
            var footerCtrl = controller('FooterCtrl', {$scope: $scope, copyrightYear:copyrightYear});
            expect(footerCtrl.serverDate).toEqual(copyrightYear);
        });

    });
})();

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