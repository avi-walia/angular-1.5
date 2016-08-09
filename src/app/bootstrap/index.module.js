(function () {
    'use strict';

    //---------------- CORE ---------------- //
    angular.module('advisorLocator.core.cache', []);
    angular.module('advisorLocator.core.server', ['advisorLocator.core.cache']);
    angular.module('advisorLocator.core.main', ['advisorLocator.core.server', 'advisorLocator.utils']);
    //---------------- FEATURES ---------------- //
    angular.module('advisorLocator.features.searchName', ['advisorLocator.core.server', 'advisorLocator.utils']);
    angular.module('advisorLocator.features.searchLocation', ['advisorLocator.core.server', 'advisorLocator.utils']);

    //---------------- UTILITIES ---------------- //
    angular.module('advisorLocator.utils', ['advisorLocator.core.server', 'matchMedia', 'ng.deviceDetector']);

    //---------------- MAIN ---------------- //
    angular.module('advisorLocator', [
        'ui.router',
        'angular-cache',
        'ngMessages',
        'pascalprecht.translate',
        'tmh.dynamicLocale',
        'ngCookies',
        'ngSanitize',
        'ngAria',
        'advisorLocator.core.main',
        'advisorLocator.features.searchName',
        'advisorLocator.features.searchLocation',
        'angulartics',
        'angulartics.google.analytics',
        'snap',
        'headroom',
        'ui.bootstrap'
    ]);
})();
