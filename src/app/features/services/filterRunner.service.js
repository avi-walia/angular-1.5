(function () {
    'use strict';

    angular
        .module('advisorLocator.features.searchByName')
        .service('filterRunnerService', filterRunnerService);

    /* @ngInject */
    function filterRunnerService() {
        var service = this;

        service.filters = {};//array of all filters
        service.activeFilters = [];//array of active filter functions
        service.allData = [];
        service.filteredData = [];

        function extractProps(value, index) {
            return index;
        }
        service.clearFilters = function() {
            /*
            service.selectedFilters.lang = null;
            service.selectedFilters.province = [];
            service.activeFilters = [];
            */
            _.forEach(service.filters, function(filterData){
                if (filterData.hasOwnProperty('values')) {
                    filterData.values = null;
                } else {
                    filterData.value = null;
                }
            });
            service.activeFilters = [];
            //service.filteredSearchResults = service.searchResults;
        };

        //a filter was changed, see if it needs to be added or removed from the array of active filters.
        //filterName is the name of the filter that changed
        service.setFilters = function(filterName) {
            //loop through the array of possible filters to find the one that was activated.
            _.forEach(service.filters, function(filterData){
               if (filterData.label === filterName) {
                   //see if it needs to be removed or added to the array of active filters.
                   activate_deactivate_filter(filterData);
               }
            });
        }

        //This function checks the filter that changed and either adds or removes it from the array of active filters.
        function activate_deactivate_filter(filterData) {
            var x = service.activeFilters.indexOf(filterData.filterFunc);

            //check if the property to filter by has a value or is an array of acceptable values
            if ((filterData.hasOwnProperty('value') && filterData.value) || (filterData.hasOwnProperty('values') && filterData.values.length > 0)) {
                //There was atleast one property to filter by, filter needs to be added to the array if it isn't already part of the array
                if (x < 0) {
                    //filter was not part of array, add it.
                    service.activeFilters.push(filterData.filterFunc);
                }
            } else {
                //there were no property to filter by. Remove filter from array.
                if (x >= 0) {
                    service.activeFilters.splice(x, 1);
                }
            }
        }

        //loops through all active filters and applies them.
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
            return _.filter(service.allData, filterLooper);
        };

    }

})();


