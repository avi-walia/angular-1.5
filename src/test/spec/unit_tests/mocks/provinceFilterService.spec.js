var $provinceFilterService;

(function () {
    describe('provinceFilterService test', function () {

        beforeEach(function() {
            module('advisorLocator.features.searchByName');
        });


        beforeEach(
            inject(function(provinceFilterService) {
                $provinceFilterService = provinceFilterService;

            })
        );

        it('ProvinceFilterService should exist', function() {
            console.log('provinceFilterService: ', $provinceFilterService);
            expect($provinceFilterService).toBeDefined();
            var possibleValues = [
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



            expect($provinceFilterService.defaultValue).toEqual('Province');
            expect($provinceFilterService.hasOwnProperty('filterFunc')).toEqual(true);
            expect($provinceFilterService.label).toEqual('province');
            expect($provinceFilterService.value).toEqual('Province');
            expect($provinceFilterService.options).toEqual(possibleValues);
            _.forEach(filterInputDefault, function(mockData){
                expect($provinceFilterService.filterFunc(mockData)).toEqual(mockData.expected);
            });

            $provinceFilterService.value = possibleValues[1];
            _.forEach(filterInputAB, function(mockData, i){
                expect($provinceFilterService.filterFunc(mockData)).toEqual(mockData.expected);
            });

        });

    });
})();