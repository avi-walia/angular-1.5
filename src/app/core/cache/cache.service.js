/**
 * Cache service.
 * File includes: WebIDs cache service, Auth cache service, User cache service, Data Cache Session storage,
 * Data Cache Local storage, App Permissions cache service and Notifications cache service.
 */
(function () {
    'use strict';
    var STORAGE_PREFIX = 'advLocator';
    angular
        .module('advisorLocator.core.cache')
        .factory('dataCacheSessionStorage', dataCacheSessionStorage)
        .factory('dataCacheLocalStorage', dataCacheLocalStorage)
        .factory('notificationsCacheService', notificationsCacheService);

    dataCacheSessionStorage.$inject = ['CacheFactory'];
    dataCacheLocalStorage.$inject = ['CacheFactory'];
    notificationsCacheService.$inject = ['CacheFactory'];

    /* @ngInject */
    function dataCacheSessionStorage(CacheFactory){
        var dataCache = CacheFactory.get('TempAppData');
        if (!dataCache) {
            dataCache = CacheFactory.createCache('TempAppData', {
                storagePrefix: STORAGE_PREFIX,
                storageMode: 'sessionStorage'
            });
        }
        return dataCache;
    }
    function dataCacheLocalStorage(CacheFactory){
        var dataCache = CacheFactory.get('PermAppData');
        if (!dataCache) {
            dataCache = CacheFactory.createCache('PermAppData', {
                storagePrefix: STORAGE_PREFIX,
                storageMode: 'localStorage'
            });
        }
        return dataCache;
    }
    function notificationsCacheService(CacheFactory) {
        var appErrors = CacheFactory.get('TempAppNotifications');
        if (!appErrors) {
            appErrors = CacheFactory.createCache('TempAppNotifications', {
                storagePrefix: STORAGE_PREFIX,
                storageMode: 'sessionStorage'
            });
        }
        return appErrors;
    }

})();

