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
            module('aio.utils');
            module('aio.core.server');
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
            module('aio.utils');
            module('aio.core.server');
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
            module('aio.utils');
            module('aio.core.server');
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
    describe('footerController', function () {
        var customCacheFactory;
        var controller;
        var translate;
        var copyrightYear;
        beforeEach(function() {
            module('ui.router');
            module('pascalprecht.translate');
            module('aio.core.main');
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

describe("Directive", function () {

    var $scope, controller, element, rootScope;

    beforeEach(function() {

        module('ui.router');
        module('pascalprecht.translate');
        module('aio.core.main');
        module('advisorLocator');
        /*
        module(function($provide){
            $provide.provider('$rootScope', function () {
                rootScope = {
                    name: 'test name',
                    gravatar: 'test avatar',
                    $on: function(){},
                    $emit: function(){}
                };
                this.$get = function () {
                    return rootScope;
                }
            });
        });*/
        inject(function ($rootScope, $compile, $httpBackend) {
            rootScope = $rootScope;
            $httpBackend.when('GET', 'assets/locales/locale-en.json').respond(['test', 'one']);
            $httpBackend.when('GET', 'app/core/includes/header/languageSwitcher/languageSwitcher.html').respond(['test', 'one']);
            $scope = $rootScope.$new();
            $scope.test = 'fish';
            element = angular.element("<language-switcher></language-switcher>");
            template = $compile(element)($scope);
            $scope.$digest();
            controller = element.controller('languageSwitcher');
            //rootScope = $rootScope;
        })
    });
    it("should toogle open when toggle() is called", inject(function() {
        console.log('element: ', angular.element(document.getElementsByTagName('li')[0]).controller);
        console.log('template: ', template);
        console.log('controller: ',element.isolateScope());
        expect(controller).toBe({});
    }));

});