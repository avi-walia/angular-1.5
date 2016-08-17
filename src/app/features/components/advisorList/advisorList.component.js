
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

        'pageStateResolver',
        'detectMobile',
        'server',
        'BASE_URL',
        'ENDPOINT_URI',
        'dataCacheLocalStorage'
    ];
    /* @ngInject */
    function advisorListCtrl(
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
        function init() {
            vm.advisors = [];
            vm.isLoading = true;
            server.get(BASE_URL + ENDPOINT_URI + '/advisors', false, 'localStorage', false).then(function(data) {
                console.log('data1123: ', data.data);
                vm.advisors = data.data;
                vm.isLoading = false;
            });

            var testKey = 'testKey';
            var testData = {jon:'snow'};
            dataCacheLocalStorage.put(testKey, testData);
            dataCacheLocalStorage.remove(testKey);
            console.log('remove: ', dataCacheLocalStorage.remove);
            console.log('after removal: ', dataCacheLocalStorage.get(testKey));
        }



        init();

    }

})();





