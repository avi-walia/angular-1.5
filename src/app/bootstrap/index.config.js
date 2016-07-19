(function () {
    'use strict';

    angular.module('advisorLocator')
        .config(translations);

    translations.$inject = ['$translateProvider', 'tmhDynamicLocaleProvider'];


    /* @ngInject */
    function translations($translateProvider, tmhDynamicLocaleProvider) {
        // Configure the locale loader
        tmhDynamicLocaleProvider.localeLocationPattern(
            'assets/locales/angular-locale_{{locale}}.js');

        $translateProvider
        // get warnings in the developer console, regarding forgotten IDs in translations
        // requires 'bower install angular-translate-handler-log'
        //.useMissingTranslationHandlerLog()

        // Tell the translation system how to sanitize HTML input
            .useSanitizeValueStrategy('sanitizeParameters')

            // Configure the translation loader
            .useStaticFilesLoader({
                prefix: 'assets/locales/locale-',
                suffix: '.json'
            })

            // Optionally use generic translations as opposed to localized translations
            .registerAvailableLanguageKeys(['en', 'fr'], {
                'en*': 'en',
                'fr*': 'fr'
            })

            // Determine the browser's preferred language
            .determinePreferredLanguage()

            // force default language
            //.preferredLanguage('en_US')

            .useLocalStorage();
    }

})();
