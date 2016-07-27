(function () {
    'use strict';

    var fyiCacheKey = 'fyi',
        apiEntityCall = '/banner/',
        emptyFYI = {};

    angular
        .module('advisorLocator.core.main')
        .service('fyi', fyiService);

    fyiService.$inject = [
        '$rootScope',
        'server',
        'dataCacheSessionStorage'
    ];

    /* @ngInject */
    function fyiService($rootScope, server, dataCacheSessionStorage) {
        var service = this;

        service.banner = emptyFYI;
        service.showFYI = false;

        service.getFYI = getFYI;
        service.dismissFYI = dismissFYI;

        //---------------- implementation starts here ---------------- //

        /**
         *
         * @param {string} activePage
         * @returns {obj} fyi
         */
        function getFYI(activePage) {
            /**
             * load fyi from cache OR server
             * @type {obj} empty obj if user cancel it, else the fyi object to be showed
             */
            return server.postSessionStorage('/banner', {
                    currentPage: activePage
                })
                .then(function (result) {
                    // result.data checks for a 204
                    // fyi might be empty
                    if (result.data && result.data.message) {
                        // add the cache key for this banner
                        //result.data['key'] = apiEntityCall + activePage;
                        service.banner = result.data;
                        // add the cache key for this banner
                        service.banner.key = apiEntityCall + activePage;
                        // show the banner
                        service.showFYI = true;
                    } else {
                        // FYI might be dismissed by user

                        // do not show the banner
                        service.showFYI = false;
                        // reset to default
                        service.banner = emptyFYI;
                    }
                    //lets send value of showFYI to help set our aria-hidden default value
                    $rootScope.$emit('dismissFYI', service.showFYI);
                    
                    return service.banner;
                });
        }


        /**
         * Hides the FYI and updates cache to an empty obj
         *
         * @param {string} cacheKey
         */
        function dismissFYI(cacheKey) {
            // do not show the banner
            service.showFYI = false;
            // reset to default
            service.banner = emptyFYI;
            // update cached FYI
            if (dataCacheSessionStorage.get(cacheKey)) {
                dataCacheSessionStorage.put(cacheKey, service.banner);
            }
            $rootScope.$emit('dismissFYI', service.showFYI);
            //for setting focus on the next focusable element
            $rootScope.$emit('setFocus');
        }

    }

})();

