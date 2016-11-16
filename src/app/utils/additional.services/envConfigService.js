(function () {
    'use strict';

    angular
        .module('advisorLocator.utils')
        .service('envConfigService', envConfigService);

    envConfigService.$inject = ['$rootScope', '$http', 'ENVIRONMENT_CONFIG_PATH'];

    /* @ngInject */
    function envConfigService($rootScope, $http, ENVIRONMENT_CONFIG_PATH) {
        var service = this;
        service.BASE_URL = '';
        service.CONTEXT_ROOT = '';
        service.ENDPOINT_URI = '';
        service.GOOGLE_MAPS_URL = '';
        service.ASSANTE_URL = '';
        service.init = init;

        function init() {
            console.log('hello world');
            return $http.get(ENVIRONMENT_CONFIG_PATH).then(function(envConf) {
                    service.BASE_URL = envConf.data.BASE_URL;
                    service.CONTEXT_ROOT = envConf.data.CONTEXT_ROOT;
                    service.ENDPOINT_URI = envConf.data.ENDPOINT_URI;
                    service.GOOGLE_MAPS_URL = envConf.data.GOOGLE_MAPS_URL;
                    service.ASSANTE_URL = envConf.data.ASSANTE_URL;
                    service.PROFILE_PICTURE_BASE_PATH = envConf.data.PROFILE_PICTURE_BASE_PATH;
            },
            function(error) {
                console.log('error1123');
                $rootScope.$emit('noData');
            });
        }
    }
})();

