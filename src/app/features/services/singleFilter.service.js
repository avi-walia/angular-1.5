(function () {
    'use strict';

    angular
        .module('advisorLocator.features.searchByName')
        .service('singleFilterService', singleFilterService);

    singleFilterService.$inject = [
        'FILTER',
    ];

    /* @ngInject */
    function singleFilterService(FILTER) {
        var service = this;
        /*
        service.defaultValue = '';
        service.filterFunc = filterLang;
        service.label = '';
        service.value



        function filterLang(advisor) {
            console.log('advisor: ', advisor.spokenLanguage);
            console.log('value: ',service.filterRunnerService.filters.lang.values);
            console.log('FILTERS.lang.bilingual: ', service.filterRunnerService.filters.lang.defaultValues);
            //return (advisor.spokenLanguage === FILTERS.lang.bilingual || advisor.spokenLanguage === service.selectedFilters.lang);
            return (advisor.spokenLanguage === service.filterRunnerService.filters.lang.defaultValues[0] || advisor.spokenLanguage === service.filterRunnerService.filters.lang.values);
        }
        */

        service.generateFilter = generateFilter;

        function generateFilter(defaultValue, filterFunc, label, value) {
            return {
                defaultValue: defaultValue,
                filterFunc: filterFunc,
                label: label,
                value: value
            }
        }

    }

})();


