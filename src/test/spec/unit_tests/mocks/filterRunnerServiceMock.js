var filterRunnerServiceMock = {
    filters:{},
    activeFilters: [],
    allData: [],
    filteredData: [],
    clearFilters: function() {

    },
    setFilters: function(filterName) {

    },
    filter: function() {

    }
}

var baseFilterRunnerServiceMock = {
    filters:{},
    activeFilters: [],
    allData: [],
    filteredData: [],
    clearFilters: function() {
        _.forEach(service.filters, function(filterData){
            if (filterData.hasOwnProperty('values')) {
                filterData.values = filterData.defaultValues;
            } else {
                filterData.value = filterData.defaultValue;
            }
        });

        service.activeFilters = [];
    },
    setFilters: function(filterName) {

    },
    filter: function() {

    }
}

var langFilterRunnerServiceMock = baseFilterRunnerService.slice();



var provinceFilterRunnerServiceMock = baseFilterRunnerService.slice();