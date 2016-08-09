
(function () {
    'use strict';

    angular
        .module('advisorLocator.features.searchByName')
        .component('advisorDetail', {
            controller: advisorDetailCtrl,
            templateUrl:'app/features/components/advisorDetail/advisorDetail.tpl.html'
        });


    /* @ngInject */

    advisorDetailCtrl.$inject = [
        '$stateParams',
        'pageStateResolver',
        'detectMobile'
    ];
    /* @ngInject */
    function advisorDetailCtrl( $stateParams, pageStateResolver, detectMobile
    ) {
        var vm = this;
        vm.pageStateResolver = pageStateResolver;
        vm.detectMobile = detectMobile;
        vm.advisorId = $stateParams.id;
    }

})();





