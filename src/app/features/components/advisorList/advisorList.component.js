
(function () {
    'use strict';

    angular
        .module('advisorLocator.features.searchByName')
        .constant('FILTERS', {
            /*
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
            */
            lang: {
                options: {
                    english: 'English',
                    french: 'French'
                },
                defaultValues: [
                    'Bilingual'
                ]
            },
            province: {
                options: [
                    {'label': 'AB'},
                    {'label': 'BC'},
                    {'label': 'MB'},
                    {'label': 'NB'},
                    {'label': 'NL'},
                    {'label': 'NS'},
                    {'label': 'NT'},
                    {'label': 'NU'},
                    {'label': 'ON'},
                    {'label': 'PE'},
                    {'label': 'QC'},
                    {'label': 'SK'},
                    {'label': 'YT'}
                ],
                defaultValues: []
            }
        })
        .constant('AVAILABLE_FILTERS', [
            'lang',
            'province'
        ])
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





