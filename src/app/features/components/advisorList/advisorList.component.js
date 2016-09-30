
(function () {
    'use strict';

    angular
        .module('advisorLocator.features.searchByName')
        .constant('FILTERS', {
            lang: {
                language: 'Language',
                english: 'English',
                french: 'French',
                bilingual: 'Bilingual'
            },
            province: {
                'AB': 'AB',
                'BC': 'BC',
                'MB': 'MB',
                'NB': 'NB',
                'NL': 'NL',
                'NS': 'NS',
                'NT': 'NT',
                'NU': 'NU',
                'ON': 'ON',
                'PE': 'PE',
                'QC': 'QC',
                'SK': 'SK',
                'YT': 'YT'
            }
        })
        .component('advisorList', {
            controller: advisorListCtrl,
            templateUrl:'app/features/components/advisorList/advisorList.tpl.html'
        });


    /* @ngInject */

    advisorListCtrl.$inject = [
        'advisorService',
        'pageStateResolver',
        'detectMobile'
    ];
    /* @ngInject */
    function advisorListCtrl(advisorService, pageStateResolver, detectMobile) {
        var vm = this;
        vm.pageStateResolver = pageStateResolver;
        vm.detectMobile = detectMobile;
        advisorService.init();
        vm.service = advisorService;

    }

})();





