(function () {
    'use strict';

    //---------------- CORE ---------------- //
    angular.module('aio.core.main', ['ngIdle', 'aio.core.server', 'aio.utils', 'ui.bootstrap', 'ng.deviceDetector', 'headroom']);
    angular.module('aio.core.cache', ['aio.core.server']);
    angular.module('aio.core.server', ['aio.core.cache']);

    //---------------- FEATURES ---------------- //

    //---------------- UTILITIES ---------------- //
    angular.module('aio.utils', ['matchMedia', 'ngIdle', 'aio.core.server', 'ui.bootstrap', 'ng.deviceDetector', 'headroom']);

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
        'aio.core.main',
        'aio.core.server',
        'angulartics',
        'angulartics.google.analytics',
        'snap',
        'headroom'
    ]);
})();
