
(function () {
    'use strict';

    angular
        .module('advisorLocator.features.searchByName')
        .component('advisorList', {
            controller: advisorListCtrl,
            templateUrl:'app/features/components/advisorList/advisorList.tpl.html'
        });


    /* @ngInject */

    advisorListCtrl.$inject = [
        'advisorService',
        'pageStateResolver',
        'detectMobile',
        'server',
        'BASE_URL',
        'ENDPOINT_URI',
        'dataCacheLocalStorage'
    ];
    /* @ngInject */
    function advisorListCtrl(
        advisorService,
        pageStateResolver,
        detectMobile,
        server,
        BASE_URL,
        ENDPOINT_URI,
        dataCacheLocalStorage
    ) {
        var vm = this;
        vm.pageStateResolver = pageStateResolver;
        vm.detectMobile = detectMobile;
        advisorService.init();
        vm.service = advisorService;
        /*
        function init() {
            vm.advisors = [];
            vm.isLoading = true;
            server.get(BASE_URL + ENDPOINT_URI + '/advisors', false, 'localStorage', false).then(function(data) {
                console.log('data1123: ', data.data);
                vm.advisors = data.data;
                vm.isLoading = false;
            });
        }



        init();
        */

    }

})();





