//multi-filter
(function () {
    'use strict';

    angular
        .module('advisorLocator.features.searchByName')
        .service('provinceFilterService', provinceFilterService);

    provinceFilterService.$inject = [
    ];

    /* @ngInject */
    function provinceFilterService() {
        var service = this;

        service.defaultValue = 'Province';
        service.filterFunc = filterProv;
        service.label = 'province';
        service.value = 'Province';
        service.options = [
            'Province',
            'AB',
            'BC',
            'MB',
            'NB',
            'NL',
            'NS',
            'NT',
            'NU',
            'ON',
            'PE',
            'QC',
            'SK',
            'YT'
        ];


        function filterProv(advisor) {
            return service.value === 'Province' || service.value === advisor.partialBranchInfo.provinceAbbr;
        }


    }

})();


