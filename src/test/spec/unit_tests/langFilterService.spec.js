var $langFilterService;

(function () {
    describe('langFilterService test', function () {

        beforeEach(function() {
            module('advisorLocator.features.searchByName');
        });


        beforeEach(
            inject(function(langFilterService) {
                $langFilterService = langFilterService;

            })
        );

        it('LangFilterService should exist', function() {
            expect($langFilterService).toBeDefined();
            /*
            service.defaultValue = 'Language';
            service.globalLanguage = 'Bilingual';
            service.filterFunc = filterLang;
            service.label = 'lang';
            service.value = 'Language';
            service.options = [
                'Language',
                'English',
                'French'
            ];
            */
            expect($langFilterService.defaultValue).toEqual('Language');
            expect($langFilterService.globalLanguage).toEqual('Bilingual');
            expect($langFilterService.hasOwnProperty('filterFunc')).toEqual(true);
            expect($langFilterService.label).toEqual('lang');
            expect($langFilterService.value).toEqual('Language');
            expect($langFilterService.options).toEqual([
                'Language',
                'English',
                'French'
            ]);
            expect($langFilterService.filterFunc({spokenLanguage: 'English'})).toEqual(true);
            expect($langFilterService.filterFunc({spokenLanguage: 'Bilingual'})).toEqual(true);
            expect($langFilterService.filterFunc({spokenLanguage: 'French'})).toEqual(true);
            $langFilterService.value = 'English';
            expect($langFilterService.filterFunc({spokenLanguage: 'English'})).toEqual(true);
            expect($langFilterService.filterFunc({spokenLanguage: 'Bilingual'})).toEqual(true);
            expect($langFilterService.filterFunc({spokenLanguage: 'French'})).toEqual(false);
            $langFilterService.value = 'French';
            expect($langFilterService.filterFunc({spokenLanguage: 'English'})).toEqual(false);
            expect($langFilterService.filterFunc({spokenLanguage: 'Bilingual'})).toEqual(true);
            expect($langFilterService.filterFunc({spokenLanguage: 'French'})).toEqual(true);

        });

    });
})();