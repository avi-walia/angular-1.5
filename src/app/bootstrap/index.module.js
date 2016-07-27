(function () {
    'use strict';

    //---------------- CORE ---------------- //
    angular.module('advisorLocator.core.main', ['ngIdle', 'advisorLocator.core.server', 'advisorLocator.utils', 'ui.bootstrap', 'ng.deviceDetector', 'headroom']);
    angular.module('advisorLocator.core.cache', ['advisorLocator.core.server']);
    angular.module('advisorLocator.core.server', ['advisorLocator.core.cache']);

    //---------------- FEATURES ---------------- //

    //---------------- UTILITIES ---------------- //
    angular.module('advisorLocator.utils', ['matchMedia', 'ngIdle', 'advisorLocator.core.server', 'ui.bootstrap', 'ng.deviceDetector', 'headroom']);

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
        'advisorLocator.core.server',
        'angulartics',
        'angulartics.google.analytics',
        'snap',
        'headroom'
    ]);
})();
