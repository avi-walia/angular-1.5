//single filter
(function () {
    'use strict';

    angular
        .module('advisorLocator.features.searchByName')
        .service('langFilterService', langFilterService);

    langFilterService.$inject = [
    ];

    /* @ngInject */
    function langFilterService() {
        var service = this;

        service.defaultValue = 'Language';
        service.globalLanguage = 'Bilingual';
        service.filterFunc = filterLang;
        service.label = 'lang';
        service.value = 'Language';
        service.options = [
            'Language',
            'English',
            'French'
        ];



        function filterLang(advisor) {
            /*
             bilingual advisors will always show up.
             otherwise advisors will only be displayed if they're spokenLanguage is equal to service.selectedFilters.lang.
             */
            return (service.value === 'Language' || advisor.spokenLanguage === service.globalLanguage || advisor.spokenLanguage === service.value);
        }


    }

})();
