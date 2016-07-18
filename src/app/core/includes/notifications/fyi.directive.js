(function () {
    'use strict';

    //var fyiEnabledCurrentPages = [
    //    'login',
    //    'portfolio',
    //    'accountOverview',
    //    'transactionHistory',
    //    'rrspContribution',
    //    'tfsaContribution',
    //    'documents',
    //    'profilePersonal',
    //    'profileSecurity',
    //    'profileEdd'
    //];

    angular
        .module('aio.core.main')
        .directive('fyiNotifications', fyiNotificationsDirective);

    /* @ngInject */
    function fyiNotificationsDirective() {
        return {
            //bindToController: {
            //    activePage: '=page'
            //},
            controller: ctrl,
            controllerAs: 'vm',
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl: 'app/core/includes/notifications/fyi.tpl.html'
        };
    }

    ctrl.$inject = [
        '$rootScope',
        'fyi',
        '$scope'
    ];

    /* @ngInject */
    function ctrl($rootScope, fyi, $scope) {
        var vm = this;

        vm.fyi = fyi;

        // load banners on every page load
        //$scope.$watch('vm.activePage', function (currentPage) {
        // is the current page in the fyiList? then get the banner.
        //if (_.includes(fyiEnabledCurrentPages, currentPage)) {
        //    fyi.getFYI(currentPage);
        var reqPageConfig = $rootScope.$watch('oRequestedPageConfig', function (oPageConf) {
            //if the page does have FYI notification then let's retrieve it from banners api
            if (oPageConf.hasFYI) {
               
                //retrieving the text for your FYI notification
                fyi.getFYI(oPageConf.pageName);


                // banner is a promise
                //setTimeout(function() {
                //    console.log('New Banner:', vm.fyi.banner);
                //}, 1000);
            } else {
                // do not show the banner for the current page
                fyi.showFYI = false;
            }
        });
        // we need to destroy so that banners API isnt called more than once!
        $scope.$on('$destroy', reqPageConfig);

    }

})();