
var $q;
var $timeout;
var $rootScope;
var filterRunnerServiceMock = {
    filters: {},
    activeFilters: [],
    allData: [],
    filteredData: []
};
var serverMock = {
    get: function(){}
};


(function () {
    describe('branch detail service after initialization', function () {
        var $advisorService;
        var resultSetLength = advisors.length;

        beforeEach(function() {
            module('advisorLocator.features.searchByName');
        });
        beforeEach(function(){
            module(function($provide){
                //ENDPOINT_URI, ELEMENTS_PER_PAGE, filterRunnerService, langFilterService, provinceFilterService

                $provide.service('removeDiacriticsService', function(){
                    return removeDiacriticsServiceMock;//does more than just remove diacritics. Also removes punctuation.
                });
                $provide.service('server', function() {
                    return serverMock;
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
        });


        beforeEach(
            inject(function(advisorService, _$q_, _$timeout_, _$rootScope_) {
                $advisorService = advisorService;
                $q = _$q_;
                $rootScope = _$rootScope_;

                serverMock.get = function() {
                    var deferred = $q.defer();
                    deferred.resolve({data: advisors});
                    return deferred.promise;
                };
                /*
                 spyOn(serverMock, 'get').and.callFake(function() {
                     var deferred = $q.defer();
                     deferred.resolve({data: advisors});
                     return deferred.promise;
                 });
                */

                $advisorService.init();
                $rootScope.$digest();

            })
        );

        it('Advisor list service should exist', function() {
            //expect(bds.test).toEqual('hello world');
            expect($advisorService).toBeDefined();
        });

        it('Advisor list should have already loaded advisors', function() {
            expect($advisorService.isLoading).toEqual(false);
            expect($advisorService.allAdvisors.length).toEqual(resultSetLength);
        });

        it('Advisors should have precomputed search indexes for first/common/last without diacritics', function() {
            _.forEach($advisorService.allAdvisors, function($advisor) {
                var fName = removeDiacriticsPunctuationMock.remove($advisor.firstName);
                var lName = removeDiacriticsPunctuationMock.remove($advisor.lastName);
                var cName = removeDiacriticsPunctuationMock.remove($advisor.commonName);
                _.forEach($advisor.fNameArr, function(fNameVal) {
                    expect(fName.indexOf(fNameVal)).toBeGreaterThan(-1);
                });

                _.forEach($advisor.lNameArr, function(lNameVal) {
                    expect(lName.indexOf(lNameVal)).toBeGreaterThan(-1);
                });

                _.forEach($advisor.cNameArr, function(cNameVal) {
                    expect(cName.indexOf(cNameVal)).toBeGreaterThan(-1);
                });
            });
        });

        it('Advisor list should not have showCommon flags before searching', function() {
            expect($advisorService.isLoading).toEqual(false);
            expect($advisorService.allAdvisors.length).toEqual(resultSetLength);
            _.forEach($advisorService.allAdvisors, function($advisor) {
                expect($advisor.hasOwnProperty('showCommon')).toEqual(false);
            });
        });



        it('Filtered and non-filtered search results should be set properly after searching for "m m"', function() {
            $advisorService.search("m m");
            expect($advisor.searchResults.length).toEqual(2);
        });

    });
})();