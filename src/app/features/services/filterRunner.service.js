(function () {
    'use strict';

    angular
        .module('advisorLocator.features.searchByName')
        .service('filterRunnerService', filterRunnerService);

    filterRunnerService.$inject = [

        'FILTERS'
    ];

    /* @ngInject */
    function filterRunnerService(FILTERS) {
        var service = this;
/*
        service.filters = {
            lang: 'lang',
            province:'province'
        };
        */
        service.filters = {};//array of all filters
        service.activeFilters = [];//array of active filter functions
        service.allData = [];
        service.filteredData = [];

        function extractProps(value, index) {
            return index;
        }

        /*
            initialize the filters object with available filters.
            filterNames is an array of filterNames
            Service must be initialized before it is used!
         */
        service.init = function(filterNames, filterFuncs) {
            //service.allData = allData;
            filterNames = _.flatMap(filterNames, extractProps);
            _.forEach(filterNames, function(filterName) {
                var filterData = FILTERS[filterName];
                //if (FILTERS.hasOwnProperty(('filterName'))) {
                    service.filters[filterName] = {
                        label: filterName,
                        filterFunc: filterFuncs[filterName],
                        values: null,
                        defaultValues: filterData.defaultValues//filters on default values only run if values is not null.
                    };
                //}
            });
            console.log('service: ', service);
        };

        service.clearFilters = function() {
            /*
            service.selectedFilters.lang = null;
            service.selectedFilters.province = [];
            service.activeFilters = [];
            */
            _.forEach(service.filters, function(filterData){
                filterData.values = null;
            });
            service.activeFilters = [];
            //service.filteredSearchResults = service.searchResults;
        };

        //one of the filters was changed, update the array of filters.
        /*
        service.setFilters = function(filterName) {
            //determine which filter changed
            if (filterName === service.filters.lang) {
                //see if the filter has already been added to the array.
                var x = service.activeFilters.indexOf(filterLang);
                //filter needs to be added to the array
                if (x < 0) {
                    service.activeFilters.push(filterLang);
                }
            }
            if (filterName === service.filters.province) {

                console.log('service.selectedFilters.province: ', service.selectedFilters.province);
                //see if the filter has already been added to the array.
                var x = service.activeFilters.indexOf(filterProv);
                //check if atleast one province has been chosen to filter by
                if (service.selectedFilters.province.length > 0) {
                    //There was atleast one province to filter by, filter needs to be added to the array if it isn't already part of the array
                    if (x < 0) {
                        service.activeFilters.push(filterProv);
                    }
                } else {
                    //there were no provinces to filter by. Remove filter from array.
                    if (x >= 0) {
                        service.activeFilters.splice(x, 1);
                    }
                }
            }
            //run all filters
            service.filter();
        }
        */

        service.setFilters = function(filterName) {
            _.forEach(service.filters, function(filterData){
               if (filterData.label === filterName) {
                   activate_deactivate_filter(filterData);
               }
            });
        }

        function activate_deactivate_filter(filterData) {
            var x = service.activeFilters.indexOf(filterData.filterFunc);
            //check if atleast one province has been chosen to filter by
            if (filterData.values && (typeof filterData.values === 'string' || filterData.values.length > 0)) {
                //There was atleast one province to filter by, filter needs to be added to the array if it isn't already part of the array
                if (x < 0) {
                    service.activeFilters.push(filterData.filterFunc);
                }
            } else {
                //there were no provinces to filter by. Remove filter from array.
                if (x >= 0) {
                    service.activeFilters.splice(x, 1);
                }
            }
        }

        function filterLooper(advisor) {
            //assume advisor passes all filters and should be displayed.
            var ret = true;
            //loop through each active filter.
            _.forEach(service.activeFilters, function(filter, index) {
                //if the advisor does not pass the filter, it should be removed.
                if (!filter(advisor)) {
                    //advisor did not pass filter, remove it from the filteredSearchResults
                    ret = false;
                    //break out of the forEach
                    return false;
                }
            });
            //returns true if advisor should be added to filteredSearchResults, returns false otherwise.
            return ret;
        }

        service.filter = function() {
            //loop through all searchResults and apply each filter in the array of active filters to get the filteredSearchResults
            //service.filteredSearchResults = _.filter(service.searchResults, filterLooper);

            return _.filter(service.allData, filterLooper);
        };



    }

})();


