(function () {
    'use strict';

    angular
        .module('aio.core.cache')
        .service('WebIDsService', WebIDsService);

    var webIDsHashesKey = 'web_ids',
        webIDs = [];

    WebIDsService.$inject = [
        'WebIDsCacheService'
    ];

    /* @ngInject */
    function WebIDsService(WebIDsCacheService) {
        var service = this;

        service.get = getWebIDs;
        service.remove = removeWebIDs;

        service.add = addWebID;
        service.delete = deleteWebID;

        init();

        function init() {
            // check if any localString in cache
            webIDs = service.get();
        }

        function getWebIDs() {
            var list = WebIDsCacheService.get(webIDsHashesKey);
            return list ? list.webids : [];
        }

        function removeWebIDs() {
            WebIDsCacheService.remove(webIDsHashesKey);
        }

        function addWebID(code) {
            // add the code if it's not in the array
            // if (!(webIDs.indexOf(code) > -1)) {
            if (webIDs.indexOf(code) < 0) {
                webIDs.push(code);
                WebIDsCacheService.put(webIDsHashesKey, {
                    webids: webIDs
                });
            }
        }

        function deleteWebID(code) {
            webIDs.splice(webIDs.indexOf(code), 1);
            WebIDsCacheService.put(webIDsHashesKey, {
                webids: webIDs
            });
        }

    }
    
})();