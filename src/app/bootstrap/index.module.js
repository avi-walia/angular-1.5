(function () {
    'use strict';

    //---------------- CORE ---------------- //
    angular.module('advisorLocator.core.cache', []);
    angular.module('advisorLocator.core.server', ['advisorLocator.core.cache', 'ui.bootstrap']);
    angular.module('advisorLocator.core.main', ['advisorLocator.core.server', 'advisorLocator.utils', 'ui.bootstrap']);
    //---------------- FEATURES ---------------- //
    angular.module('advisorLocator.features.searchByName', ['advisorLocator.core.server', 'advisorLocator.utils', 'ui.bootstrap']);
    angular.module('advisorLocator.features.searchByLocation', ['advisorLocator.core.server', 'advisorLocator.utils', 'ui.bootstrap' ]);

    //---------------- UTILITIES ---------------- //
    angular.module('advisorLocator.utils', ['advisorLocator.core.server', 'matchMedia', 'ng.deviceDetector', 'ui.bootstrap']);

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
        'advisorLocator.features.searchByName',
        'advisorLocator.features.searchByLocation',
        'angulartics',
        'angulartics.google.analytics',
        'headroom',
        'ui.bootstrap',
        'ui.select'
    ]);
})();
