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

        service.defaultValues = [];
        service.filterFunc = filterProv;
        service.label = 'province';
        service.values = [];
        service.options = [
            {'label': 'AB'},
            {'label': 'BC'},
            {'label': 'MB'},
            {'label': 'NB'},
            {'label': 'NL'},
            {'label': 'NS'},
            {'label': 'NT'},
            {'label': 'NU'},
            {'label': 'ON'},
            {'label': 'PE'},
            {'label': 'QC'},
            {'label': 'SK'},
            {'label': 'YT'}
        ];


        function filterProv(advisor) {
            var ret = false;
            //only display advisors who match atleast one of the selected provinces
            _.forEach(service.values, function(selectedProvince, index) {
                if (selectedProvince.label === advisor.partialBranchInfo.provinceAbbr) {
                    //Advisor's province matches atleast one of the selected province filter
                    ret = true;
                    //break out of forEach
                    return false;
                }
            });
            return ret;
        }


    }

})();


