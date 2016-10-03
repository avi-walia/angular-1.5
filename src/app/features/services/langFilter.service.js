(function () {
    'use strict';

    angular
        .module('advisorLocator.features.searchByName')
        .service('langFilterService', langFilterService);

    langFilterService.$inject = [
        'FILTER',
    ];

    /* @ngInject */
    function langFilterService(FILTER) {
        var service = this;

        service.defaultValue = '';
        service.filterFunc = filterLang;
        service.label = '';
        service.value



        function filterLang(advisor) {
            /*
             bilingual advisors will always show up.
             otherwise advisors will only be displayed if they're spokenLanguage is equal to service.selectedFilters.lang.
             */
            console.log('advisor: ', advisor.spokenLanguage);
            console.log('value: ',service.filterRunnerService.filters.lang.values);
            console.log('FILTERS.lang.bilingual: ', service.filterRunnerService.filters.lang.defaultValues);
            //return (advisor.spokenLanguage === FILTERS.lang.bilingual || advisor.spokenLanguage === service.selectedFilters.lang);
            return (advisor.spokenLanguage === service.filterRunnerService.filters.lang.defaultValues[0] || advisor.spokenLanguage === service.filterRunnerService.filters.lang.values);
        }


    }

})();


