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

        service.defaultValue = 'Bilingual';
        service.filterFunc = filterLang;
        service.label = 'lang';
        service.value = '';
        service.options = [
            'English',
            'French'
        ];



        function filterLang(advisor) {
            /*
             bilingual advisors will always show up.
             otherwise advisors will only be displayed if they're spokenLanguage is equal to service.selectedFilters.lang.
             */
            return (advisor.spokenLanguage === service.defaultValue || advisor.spokenLanguage === service.value);
        }


    }

})();


