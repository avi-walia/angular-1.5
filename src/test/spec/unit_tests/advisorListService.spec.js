
var $q;
var $rootScope;
var ELEMENTS_PER_PAGE = 9;
/*
var filterRunnerServiceMock = {
    filters: {},
    activeFilters: [],
    allData: [],
    filteredData: []
};*/
var serverMock = {
    get: function(){}
};


(function () {
    describe('advisor list service after initialization', function () {
        var $advisorService;
        var resultSetLength = advisors.length;
        var advisorLocator;

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
                $provide.constant('ELEMENTS_PER_PAGE', ELEMENTS_PER_PAGE);
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
            inject(function(advisorService, _$q_, _$rootScope_) {
                $q = _$q_;
                $rootScope = _$rootScope_;

                serverMock.get = function() {
                    var deferred = $q.defer();
                    deferred.resolve({data: advisors});
                    return deferred.promise;
                };
                if (!$advisorService) {
                    $advisorService = advisorService;
                    removeDiacriticsServiceMock.mockForInit();
                    $advisorService.init();
                    $rootScope.$digest();
                }

            })
        );

        it('Advisor list service should exist', function() {
            expect($advisorService).toBeDefined();
        });


        it('Advisor list should have already loaded advisors', function() {
            expect($advisorService.isLoading).toEqual(false);
            expect($advisorService.allAdvisors.length).toEqual(resultSetLength);
        });

        it('Advisors should have precomputed search indexes for first/common/last names without diacritics', function() {
            /*
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
            */
            _.forEach(removeDiacriticsPunctuationMock, function(precomputed, index) {
                var $advisor = $advisorService.allAdvisors[index];
                expect($advisor.fNameArr).toEqual(precomputed.fNameArr);
                expect($advisor.cNameArr).toEqual(precomputed.cNameArr);
                expect($advisor.lNameArr).toEqual(precomputed.lNameArr);
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
            initializedAdvisors[0].showCommon = false;
            initializedAdvisors[8].showCommon = false;
            filterRunnerServiceMock.filter = function() {
                return [initializedAdvisors[0], initializedAdvisors[8]];
            };
            removeDiacriticsServiceMock.search.m_m();
            $advisorService.search("m");
            $advisorService.search("m ");
            $advisorService.search("m m");
            expect($advisorService.searchResults.length).toEqual(2);
            expect($advisorService.searchResults[0]).toEqual(initializedAdvisors[0]);
            expect($advisorService.searchResults[1]).toEqual(initializedAdvisors[8]);
            expect($advisorService.filteredSearchResults.length).toEqual(2);
            expect($advisorService.filteredSearchResults[0]).toEqual(initializedAdvisors[0]);
            expect($advisorService.filteredSearchResults[1]).toEqual(initializedAdvisors[8]);
            $advisorService.filterRunnerService.filters.lang.value = 'French';
            filterRunnerServiceMock.filter = function() {
                return [initializedAdvisors[8]];
            };
            $advisorService.updateFilters('lang');
            expect($advisorService.filteredSearchResults.length).toEqual(1);
            expect($advisorService.searchResults.length).toEqual(2);
            expect($advisorService.searchResults[0]).toEqual(initializedAdvisors[0]);
            expect($advisorService.searchResults[1]).toEqual(initializedAdvisors[8]);
            expect($advisorService.filteredSearchResults[0]).toEqual(initializedAdvisors[8]);
        });


        it('filteredSearchResults should update after filtering by language=French, searchResults should not be changed', function() {
            $advisorService.filterRunnerService.filters.lang.value = 'French';
            filterRunnerServiceMock.filter = function() {
                return [initializedAdvisors[8]];
            };
            $advisorService.updateFilters('lang');
            expect($advisorService.filteredSearchResults.length).toEqual(1);
            expect($advisorService.searchResults.length).toEqual(2);
            expect($advisorService.searchResults[0]).toEqual(initializedAdvisors[0]);
            expect($advisorService.searchResults[1]).toEqual(initializedAdvisors[8]);
            expect($advisorService.filteredSearchResults[0]).toEqual(initializedAdvisors[8]);
        });


        it('filteredSearchResults should update after filtering by language=English, searchResults should not be changed', function() {
            $advisorService.filterRunnerService.filters.lang.value = 'English';
            filterRunnerServiceMock.filter = function() {
                return [initializedAdvisors[0], initializedAdvisors[8]];
            };
            $advisorService.updateFilters('lang');
            expect($advisorService.searchResults.length).toEqual(2);
            expect($advisorService.searchResults[0]).toEqual(initializedAdvisors[0]);
            expect($advisorService.searchResults[1]).toEqual(initializedAdvisors[8]);
            expect($advisorService.filteredSearchResults.length).toEqual(2);
            expect($advisorService.filteredSearchResults[0]).toEqual(initializedAdvisors[0]);
            expect($advisorService.filteredSearchResults[1]).toEqual(initializedAdvisors[8]);
        });



        it('filteredSearchResults should update after filtering by province=QC, searchResults should not be changed', function() {
            $advisorService.filterRunnerService.filters.province.value = 'QC';
            filterRunnerServiceMock.filter = function() {
                return [initializedAdvisors[8]];
            };
            $advisorService.updateFilters('lang');
            expect($advisorService.searchResults.length).toEqual(2);
            expect($advisorService.searchResults[0]).toEqual(initializedAdvisors[0]);
            expect($advisorService.searchResults[1]).toEqual(initializedAdvisors[8]);
            expect($advisorService.filteredSearchResults.length).toEqual(1);
            expect($advisorService.filteredSearchResults[0]).toEqual(initializedAdvisors[8]);
        });



        it('filteredSearchResults should update after filtering by province=SK, searchResults should not be changed', function() {
            $advisorService.filterRunnerService.filters.province.value = 'SK';
            filterRunnerServiceMock.filter = function() {
                return [];
            };
            $advisorService.updateFilters('lang');
            expect($advisorService.searchResults.length).toEqual(2);
            expect($advisorService.searchResults[0]).toEqual(initializedAdvisors[0]);
            expect($advisorService.searchResults[1]).toEqual(initializedAdvisors[8]);
            expect($advisorService.filteredSearchResults.length).toEqual(0);
        });


        it('filteredSearchResults should update after filtering by province=ON, searchResults should not be changed', function() {
            $advisorService.filterRunnerService.filters.province.value = 'ON';
            filterRunnerServiceMock.filter = function() {
                return [initializedAdvisors[0]];
            };
            $advisorService.updateFilters('lang');
            expect($advisorService.searchResults.length).toEqual(2);
            expect($advisorService.searchResults[0]).toEqual(initializedAdvisors[0]);
            expect($advisorService.searchResults[1]).toEqual(initializedAdvisors[8]);
            expect($advisorService.filteredSearchResults.length).toEqual(1);
            expect($advisorService.filteredSearchResults[0]).toEqual(initializedAdvisors[0]);
        });

        it('filteredSearchResults should update after filtering by province=Province, searchResults should not be changed', function() {
            $advisorService.filterRunnerService.filters.province.value = 'Province';
            filterRunnerServiceMock.filter = function() {
                return [initializedAdvisors[0], initializedAdvisors[8]];
            };
            $advisorService.updateFilters('lang');
            expect($advisorService.searchResults.length).toEqual(2);
            expect($advisorService.searchResults[0]).toEqual(initializedAdvisors[0]);
            expect($advisorService.searchResults[1]).toEqual(initializedAdvisors[8]);
            expect($advisorService.filteredSearchResults.length).toEqual(2);
            expect($advisorService.filteredSearchResults[0]).toEqual(initializedAdvisors[0]);
            expect($advisorService.filteredSearchResults[1]).toEqual(initializedAdvisors[8]);
        });

        it('filteredSearchResults should update after filtering by language=English, searchResults should not be changed', function() {
            removeDiacriticsServiceMock.search.j_ric_j();
            $advisorService.search("j");
            $advisorService.search("j ");
            $advisorService.search("j r");
            $advisorService.search("j ri");
            $advisorService.search("j ric");
            $advisorService.search("j ric ");
            $advisorService.search("j ric j");
            initializedAdvisors[14].showCommon = false;
            expect($advisorService.searchResults.length).toEqual(1);
            expect($advisorService.searchResults[0]).toEqual(initializedAdvisors[14]);
        });

        it('Search results should update after searching for "thom t"', function() {
            removeDiacriticsServiceMock.search.thom_t();
            $advisorService.search("thom t");
            expect($advisorService.searchResults.length).toEqual(2);
            initializedAdvisors[10].showCommon = false;
            initializedAdvisors[11].showCommon = false;
            expect($advisorService.searchResults[0]).toEqual(initializedAdvisors[10]);
            expect($advisorService.searchResults[1]).toEqual(initializedAdvisors[11]);
        });
        it('Search results should update after searching for "thom"', function() {

            removeDiacriticsServiceMock.search.thom();
            $advisorService.search("thom");
            expect($advisorService.searchResults.length).toEqual(2);
            expect($advisorService.searchResults[0]).toEqual(initializedAdvisors[10]);
            expect($advisorService.searchResults[1]).toEqual(initializedAdvisors[11]);
        });

        it('Search results should update after searching for "thom tho"', function() {
            removeDiacriticsServiceMock.search.thom_tho();
            $advisorService.search("thom tho");
            expect($advisorService.searchResults.length).toEqual(1);
            expect($advisorService.searchResults[0]).toEqual(initializedAdvisors[10]);
        });
        it('Search results should update after searching for "a a"', function() {
            removeDiacriticsServiceMock.search.a_a();
            $advisorService.search("a a");
            expect($advisorService.searchResults.length).toEqual(1);
            initializedAdvisors[12].showCommon = true;
            expect($advisorService.searchResults[0]).toEqual(initializedAdvisors[12]);
        });
        it('Search results should update after searching for "a alex"', function() {
            removeDiacriticsServiceMock.search.a_alex();
            $advisorService.search("a alex");
            expect($advisorService.searchResults.length).toEqual(1);
            expect($advisorService.searchResults[0]).toEqual(initializedAdvisors[12]);
        });

        it('Search results should update after searching for "alexa a"', function() {
            removeDiacriticsServiceMock.search.alexa_a();
            $advisorService.search("alexa a");
            expect($advisorService.searchResults.length).toEqual(1);
            initializedAdvisors[12].showCommon = false;
            expect($advisorService.searchResults[0]).toEqual(initializedAdvisors[12]);
        });
        it('Search results should update after searching for "r r"', function() {
            removeDiacriticsServiceMock.search.r_r();
            $advisorService.search("r r");
            expect($advisorService.searchResults.length).toEqual(1);
            initializedAdvisors[13].showCommon = false;
            expect($advisorService.searchResults[0]).toEqual(initializedAdvisors[13]);
        });
        it('Search results should update after searching for "r j"', function() {
            removeDiacriticsServiceMock.search.r_j();
            $advisorService.search("r j");
            expect($advisorService.searchResults.length).toEqual(2);
            initializedAdvisors[13].showCommon = true;
            initializedAdvisors[14].showCommon = true;
            expect($advisorService.searchResults[0]).toEqual(initializedAdvisors[14]);
            expect($advisorService.searchResults[1]).toEqual(initializedAdvisors[13]);
        });
        it('Search results should update after searching for "r j j"', function() {
            removeDiacriticsServiceMock.search.r_j_j();
            $advisorService.search("r j j");
            expect($advisorService.searchResults.length).toEqual(1);
            initializedAdvisors[14].showCommon=false;
            expect($advisorService.searchResults[0]).toEqual(initializedAdvisors[14]);
        });
        it('loadMore should be able to load more results', function() {

            expect($advisorService.mobileMaxNumDisplay).toEqual(9);
            $advisorService.loadMore();
            expect($advisorService.mobileMaxNumDisplay).toEqual(1);
        });
    });
})();


(function () {
    describe('advisor list service pagination test', function () {
        var $advisorService;
        var resultSetLength = paginationAdvisors.length;
        var advisorLocator;

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
                $provide.constant('ELEMENTS_PER_PAGE', ELEMENTS_PER_PAGE);
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
            inject(function(advisorService, _$q_, _$rootScope_) {
                $q = _$q_;
                $rootScope = _$rootScope_;

                serverMock.get = function() {
                    var deferred = $q.defer();
                    deferred.resolve({data: paginationAdvisors});
                    return deferred.promise;
                };
                if (!$advisorService) {
                    $advisorService = advisorService;
                    removeDiacriticsServiceMock.mockForPaginationInit();
                    $advisorService.init();
                    $rootScope.$digest();
                }

            })
        );

        it('Advisor list service should exist', function() {
            expect($advisorService).toBeDefined();
        });


        it('Advisor list should have already loaded advisors', function() {
            expect($advisorService.isLoading).toEqual(false);
            expect($advisorService.allAdvisors.length).toEqual(resultSetLength);
            expect($advisorService.allAdvisors.length).toEqual(resultSetLength);
        });
        it('Advisor list should have already loaded advisors', function() {
            filterRunnerServiceMock.filter = function() {
                return paginationAdvisors;
            };
            removeDiacriticsServiceMock.search.mi();
            $advisorService.search("mi");
            expect($advisorService.searchResults.length).toEqual(resultSetLength);
            expect($advisorService.filteredSearchResults.length).toEqual(resultSetLength);
            expect($advisorService.mobileMaxNumDisplay).toEqual(ELEMENTS_PER_PAGE);
            $advisorService.loadMore();
            expect($advisorService.mobileMaxNumDisplay).toEqual(resultSetLength);
        });

    });
})();