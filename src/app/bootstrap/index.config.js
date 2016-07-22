(function () {
    'use strict';

    angular.module('advisorLocator')
        .config(translations)
        .config(snapdrawer);

    translations.$inject = ['$translateProvider', 'tmhDynamicLocaleProvider'];
    snapdrawer.$inject = ['snapRemoteProvider'];

    //without this you can click and drag the app left and right
    /* @ngInject */
    function snapdrawer(snapRemoteProvider) {
        snapRemoteProvider.globalOptions = {
            addBodyClasses: true,
            maxPosition: 265,
            minPosition: -265,
            touchToDrag: true
        };
    }

    /* @ngInject */
    function translations($translateProvider, tmhDynamicLocaleProvider) {

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
        // Configure the locale loader
        tmhDynamicLocaleProvider.localeLocationPattern(
            'assets/locales/angular-locale_{{locale}}.js');
    }

})();
