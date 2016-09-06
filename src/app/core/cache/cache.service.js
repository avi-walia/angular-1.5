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

        function timeCapsule(data, expiryDate) {
            return  {
                data: data,
                expiryTime: expiryDate
            };
        }

        function put(path, data, noExpiration) {
            var expiryTime = (new Date()).getTime() + 24 * 60 * 60 * 1000;
            if (!noExpiration) {
                dataCache.put(path, timeCapsule(data, expiryTime));
            } else {
                dataCache.put(path, data);
            }
        }
        function get(path) {
            var data = dataCache.get(path);
            if (data && data.hasOwnProperty('expiryTime') && data.expiryTime > (new Date()).getTime()) {
                return data.data;
            } else {
                //If data has expired return undefined
                return undefined;
            }
            //no expiry flag was set, return the data
            return data;
        }
        function remove2(key) {
            dataCache.remove(key);
        }
        function removeAll2() {
            dataCache.removeAll();
        }
        function destroy() {
            dataCache.destroy();
        }

        var localCache = {
            'get': get,
            'put': put,
            'remove': remove2,
            'removeAll': removeAll2,
            'destroy': destroy
        };
        return localCache;
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

