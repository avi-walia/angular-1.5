(function () {
    'use strict';

    angular
        .module('advisorLocator.core.server')
        .service('server', server);

    server.$inject = [
        '$q',
        '$http',
        'ENDPOINT_URI',
        'dataCacheSessionStorage',
        'dataCacheLocalStorage',
        'pageStateResolver',
        'i18nService'
    ];

    /* @ngInject */
    function server($q, $http, ENDPOINT_URI,
                    dataCacheSessionStorage, dataCacheLocalStorage,
                    pageStateResolver, i18nService) {

        var service = this;
        var activePosts = [];

        /**
         * GET call, no caching involved.
         *
         * @param sPath string Relative URL specifying the destination of the request.
         */
        service.get = get;

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

        function getFromServer(sPath, deferred, sStorageType, bIsUnlocalized) {
            $http.get(sPath)
                .then(function (response) {
                    console.log('server response: ', response);
                    // check for no data being sent
                    if (response.status !== 204) {
                        // put data in cache
                        if (sStorageType === 'sessionStorage') {
                            dataCacheSessionStorage.put(sPath, response.data);
                        } else {
                            dataCacheLocalStorage.put(sPath, response.data);
                        }
                        response = !bIsUnlocalized ? response.data : filterLangResponse(response.data);
                    }
                    deferred.resolve(response);
                })
                // set the error, in case some promise handlers need to deal with it
                .then(null, function (error) {
                    deferred.reject(error);
                });
        }

        //---------------- implementation starts here ---------------- //

        function get(sPath, bRemoveCache, sStorageType, bIsUnlocalized) {
            var deferred = $q.defer();
            var cachedObj;
            if (typeof bRemoveCache == 'undefined' && typeof sStorageType == 'undefined' && typeof bIsUnlocalized == 'undefined') {
                bRemoveCache = false;
                sStorageType = 'localStorage';
                bIsUnlocalized = false;
            }

            // force re-cache the call
            if (bRemoveCache) {
                // clean cache record using the key
                dataCacheSessionStorage.remove(sPath);
            }
            console.log('storageType: ', sStorageType);
            // if the key is not in cache then cachedObj is undefined
            if (sStorageType === 'sessionStorage') {
                cachedObj = dataCacheSessionStorage.get(sPath);
            } else if (sStorageType === 'localStorage') {
                /*
                var tempCachedObj = dataCacheLocalStorage.get(sPath);
                if (tempCachedObj && tempCachedObj.hasOwnProperty('expiryDate') && tempCachedObj.expiryDate > (new Date()).getTime()) {
                    cachedObj = tempCachedObj.data;
                } else {
                    getFromServer(sPath, deferred, sStorageType, bIsUnlocalized);
                    return deferred.promise;//don't need to process the rest of the function at this point.
                }
                */
                var cachedObj = dataCacheLocalStorage.get(sPath);

            }

            if (_.isObject(cachedObj)) {
                //cachedObj = bIsUnlocalized ? cachedObj : filterLangResponse(cachedObj);
                deferred.resolve(cachedObj);

            } else {
                getFromServer(sPath, deferred, sStorageType, bIsUnlocalized);

            }

            // return a promise with data back
            return deferred.promise;
        }

        function removeFromActivePosts(fullPath) {
            var path = fullPath.substring(ENDPOINT_URI.length, fullPath.length);
            /*
             var index = -1;//activePosts.indexOf(path);
             for (var i = 0; i < activePosts.length; i++) {
             if (activePosts[i].path === path) {
             index = i;
             break;
             }
             }*/
            var index = indexOfActivePosts(path);
            if (index >= 0) {
                activePosts.splice(index, 1);
            }
        }
        function indexOfActivePosts(path) {
            var index = -1;//activePosts.indexOf(path);
            for (var i = 0; i < activePosts.length; i++) {
                if (activePosts[i].path === path) {
                    index = i;
                    break;
                }
            }
            return index;
        }

        function post(path, data, removeCache, storageType, isUnlocalized) {
            var deferred = $q.defer();
            var cacheKey = path;
            var cachedObj;
            // console.log('post path: ', path);
            // console.log('post data: ', data);
            // console.log('active posts: ', activePosts);
            // console.log('activePosts.indexOf(path): ', activePosts.indexOf(path));

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
                var index = indexOfActivePosts(path);
                if (index < 0) {
                    activePosts.push({'path': path, 'promise': deferred.promise});
                    $http.post(ENDPOINT_URI + path, data)
                        .then(function (response) {
                            removeFromActivePosts(response.config.url);
                            // console.log('post response: ', response);
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
                            // console.log('post error: ', error);
                            removeFromActivePosts(error.config.url);
                            deferred.reject(error);
                        });
                } else {
                    //deferred.reject();
                    //return deferred.promise;
                    return activePosts[index].promise;
                }
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


    }

})();