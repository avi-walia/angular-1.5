(function () {
    'use strict';

    angular
        .module('aio.core.server')
        .service('server', server);

    var sPageStateCacheKey = 'states';

    server.$inject = [
        'BASE_URL',
        'ENDPOINT_URI',
        '$q',
        '$http',
        'dataCacheSessionStorage',
        'dataCacheLocalStorage',
        'pageStateResolver',
        'i18nService',
        '$timeout'
    ];

    /* @ngInject */
    function server(BASE_URL, ENDPOINT_URI, $q, $http,
                    dataCacheSessionStorage, dataCacheLocalStorage,
                    pageStateResolver, i18nService, $timeout) {

        var service = this;

        /**
         * GET call, no caching involved.
         *
         * @param sPath string Relative URL specifying the destination of the request.
         */
        service.get = function (sPath) {
            return get(sPath);
        };

        /**
         * GET call, caches to sessionStorage.
         *
         * @param sPath string Relative URL specifying the destination of the request.
         */
        service.getSessionStorage = function (sPath, bIsUnlocalized) {
            return get(sPath, false, 'sessionStorage', bIsUnlocalized);
        };

        /**
         * POST call, caches to localStorage.
         *
         * @param path string Relative URL specifying the destination of the request.
         * @param data obj Request content.
         * @param isUnlocalized to set whether data needs to be localized or not
         */
        service.postLocalStorage = function (path, data, isUnlocalized) {
            // @todo: remove artificial delay and the injected $timeout service
            //return $timeout(function () {
            return post(path, data, false, 'localStorage', isUnlocalized);
            //}, _.random(0, 3) * 1000);

            //return post(path, data, false, 'localStorage');
        };

        /**
         * POST call, caches to sessionStorage.
         *
         * @param path string Relative URL specifying the destination of the request.
         * @param data obj Request content.
         * @param isUnlocalized to set whether data needs to be localized or not
         */
        service.postSessionStorage = function (path, data, isUnlocalized) {
            // @todo: remove artificial delay and the injected $timeout service
            /*return $timeout(function () {
             return post(path, data, false, 'sessionStorage', isUnlocalized);
             }, _.random(0, 2) * 1000);*/

            return post(path, data, false, 'sessionStorage', isUnlocalized);
        };

        /**
         * POST call, caches to sessionStorage.
         * Gets a value from server even when it's in cache.
         *
         * @param path string Relative URL specifying the destination of the request.
         * @param data obj Request content.
         * @param isUnlocalized to set whether data needs to be localized or not
         */
        service.postSessionStorageRecache = function (path, data, isUnlocalized) {
            return post(path, data, true, 'sessionStorage', isUnlocalized);
        };

        /**
         * POST call, no caching involved.
         *
         * @param path string Relative URL specifying the destination of the request.
         * @param data obj Request content.
         * @param isUnlocalized to set whether data needs to be localized or not
         */
        service.post = function (path, data, isUnlocalized) {
            // @todo: remove artificial delay and the injected $timeout service
            //return $timeout(function () {
            return post(path, data, true, null, isUnlocalized);
            //}, _.random(0, 3) * 1000);
        };

        /**
         * POST call used for authorization, no caching involved.
         *
         * @param state string The state requested in ui-router.
         * @returns {*} promise holding a boolean
         */
        service.ping = function (sState) {
            return post('/authentication/pageCheck',
             {
                currentPage: pageStateResolver.check(sState)
             }, true, null)
                .then(function (response) {
                 // no data is being sent
                    return response.status === 204;
                },
                function () {
                    pageStateResolver.pageLoading = false;
                }
             );


        };

        //---------------- implementation starts here ---------------- //

        function get(sPath, bRemoveCache, sStorageType, bIsUnlocalized) {
            var deferred = $q.defer();
            var cachedObj;

            // force re-cache the call
            if (bRemoveCache) {
                // clean cache record using the key
                dataCacheSessionStorage.remove(sPageStateCacheKey);
            }

            // if the key is not in cache then cachedObj is undefined
            if (sStorageType === 'sessionStorage') {
                cachedObj = dataCacheSessionStorage.get(sPageStateCacheKey);
            }

            if (_.isObject(cachedObj)) {
                cachedObj = bIsUnlocalized ? cachedObj : filterLangResponse(cachedObj);
                deferred.resolve(cachedObj);

            } else {

                $http.get(sPath)
                    .then(function (response) {
                        // check for no data being sent
                        if (response.status !== 204) {
                            // put data in cache
                            if (sStorageType === 'sessionStorage') {
                                dataCacheSessionStorage.put(sPageStateCacheKey, response);
                            }
                            response = bIsUnlocalized ? response : filterLangResponse(response);
                        }
                        deferred.resolve(response);
                    })
                    // set the error, in case some promise handlers need to deal with it
                    .then(null, function (error) {
                        deferred.reject(error);
                    });
            }

            // return a promise with data back
            return deferred.promise;
        }

        function post(path, data, removeCache, storageType, isUnlocalized) {
            var deferred = $q.defer();
            var cacheKey = doKey(path, data);
            var cachedObj;

            // force re-cache the call
            if (removeCache) {
                // clean cache record using the key
                dataCacheSessionStorage.remove(cacheKey);
            }

            // if the key is not in cache then cachedObj is undefined
            if (storageType === 'sessionStorage') {
                cachedObj = dataCacheSessionStorage.get(cacheKey);
            }
            if (storageType === 'localStorage') {
                cachedObj = dataCacheLocalStorage.get(cacheKey);
            }

            if (_.isObject(cachedObj)) {
                cachedObj = isUnlocalized ? cachedObj : filterLangResponse(cachedObj);
                deferred.resolve(cachedObj);

            } else {

                console.warn("API URL > " + BASE_URL+ ENDPOINT_URI + path);

                $http.post(BASE_URL + ENDPOINT_URI + path, data)
                    .then(function (response) {
                        // check for no data being sent
                        if (response.status !== 204) {
                            // put data in cache
                            if (storageType === 'sessionStorage') {
                                dataCacheSessionStorage.put(cacheKey, response);
                            }
                            if (storageType === 'localStorage') {
                                dataCacheLocalStorage.put(cacheKey, response);
                            }
                            response = isUnlocalized ? response : filterLangResponse(response);
                        }
                        deferred.resolve(response);
                    })
                    // set the error, in case some promise handlers need to deal with it
                    .then(null, function (error) {
                        deferred.reject(error);
                    });
            }

            // return a promise with data back
            return deferred.promise;
        }

        /**
         * Returns a response where data has only the current language fields. The
         * rest are filtered out.
         * @param response - response, which contains data property
         * @returns {*} mutated response
         */
        function filterLangResponse(response) {

            if ('data' in response) {
                response.data = i18nService.filterLocalizedKeys(response.data);
            }
            return response;
        }

        /**
         * Creates a cache key to be associated with data
         *
         * @param path string API path
         * @param dataObj obj FYI's/banners should send the active page
         * @returns string cache key
         */
        function doKey(path, dataObj) {
            // resolve cache keys for all paths but FYI's
            if (path !== '/banner') {
                return path;
            }
            if ('currentPage' in dataObj) {
                /**
                 * a banner call should post a currentPage.
                 * build the cache key from path and currentPage sent into dataObj
                 */
                return path + '/' + dataObj.currentPage;
            }
        }

        /**
         * decodeURIComponent acctId so it's safe to pass into ui-sref
         *
         * @param portfolioHeader array
         * @returns {array}
         */
        //function decodeAccountId(portfolioHeader) {
        //    return _.forEach(portfolioHeader, function (item, key, collection) {
        //        // rebuild the array based on indexes
        //        collection[key] = replaceAccountId(item);
        //    });
        //}
        /**
         * Helper function for decodeAccountId()
         *
         * @param item
         * @returns {*|Array|Object}
         */
        //function replaceAccountId(item) {
        //    return _.forEach(item, function (value, key, collection) {
        //        if (key === 'acctId') {
        //            collection[key] = decodeURIComponent(value);
        //        }
        //    });
        //}

    }

})();