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