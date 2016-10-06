
var filterRunnerServiceMock = {
    filters: {},
    activeFilters: [],
    allData: [],
    filteredData: []
};
var serverMock = {
    get: function() {
        return
    }
};


(function () {
    describe('branch detail service', function () {
        var $advisorService;
        beforeEach(function(){
            module(function($provide){
                //ENDPOINT_URI, ELEMENTS_PER_PAGE, filterRunnerService, langFilterService, provinceFilterService

                $provide.service('removeDiacriticsService', function(){
                });
                $provide.service('server', function() {
                });
                $provide.service('BASE_URL', function() {
                });
                $provide.service('ENDPOINT_URI', function() {
                });
                $provide.service('ELEMENTS_PER_PAGE', function() {
                });
                $provide.service('filterRunnerService', function() {
                    return filterRunnerServiceMock;
                });
                $provide.service('langFilterService', function() {
                });
                $provide.service('provinceFilterService', function() {
                });

            });
            module('advisorLocator.features.searchByName');
        });
        beforeEach(inject(function(advisorService){
            $advisorService = advisorService;
        }));

        it('Advisor list service should exist', function() {

            //expect(bds.test).toEqual('hello world');
            expect($advisorService).toBeDefined();
        });

        it('Advisor list should not have loaded anything yet', function() {
            expect($advisorService.allAdvisors).toEqual([]);
            expect($advisorService.isLoading).toEqual(true);
        });

        it('Advisor list should be able to retrieve all advisors', function() {

            $advisorService.init();
            expect($advisorService).toBeDefined();
        });

    });
})();