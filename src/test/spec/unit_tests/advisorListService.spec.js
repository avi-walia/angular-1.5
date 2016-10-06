
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
    describe('branch detail service', function () {
        var $advisorService;

        beforeEach(function() {
            module('advisorLocator.features.searchByName');
        });
        beforeEach(function(){
            module(function($provide){
                //ENDPOINT_URI, ELEMENTS_PER_PAGE, filterRunnerService, langFilterService, provinceFilterService

                $provide.service('removeDiacriticsService', function(){
                    return removeDiacriticsServiceMock;
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
            inject(function(advisorService, _$q_, _$timeout_, _$rootScope_){
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
                 deferred.resolve(advisors);
                 console.log('server mock called');
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

        it('Advisor list should not have loaded anything yet', function() {
            expect($advisorService.isLoading).toEqual(false);
        });

        it('Advisor list should not have loaded anything yet', function() {
            //expect($advisorService.allAdvisors.length).toEqual(2);
            //expect($advisorService.isLoading).toEqual(true);
            $advisorService.init().then(function(data) {
                expect($advisorService.allAdvisors.length).toEqual(777);
            });
            $rootScope.$digest();
        });

        it('Advisor list should not have loaded anything yet', function() {
            expect($advisorService.allAdvisors.length).toEqual(777);
        });


    });
})();