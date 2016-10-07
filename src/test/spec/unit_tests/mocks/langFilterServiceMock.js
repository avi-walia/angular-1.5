var langFilterServiceMock = {
    defaultValue: 'Language',
    globalLanguage: 'Bilingual',
    filterFunc: filterLang,
    label: 'lang',
    value: 'Language',
    options: [
        'Language',
        'English',
        'French'
    ],
    filterLang: function(advisor) {
        /*
         bilingual advisors will always show up.
         otherwise advisors will only be displayed if they're spokenLanguage is equal to service.selectedFilters.lang.
         */
        //return (this.value === 'Language' || this.spokenLanguage === this.globalLanguage || advisor.spokenLanguage === this.value);
        if (this.value === 'Language') {
            return true;
        } else {
            if (this.value === 'English') {

            } else {
                
            }
        }
    }


}