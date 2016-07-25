(function () {
    'use strict';

    angular
        .module('aio.core.main')
        .controller('LandingCtrl', LandingCtrl);

    LandingCtrl.$inject = ['currentPageTitle', '$translate'];

    /* @ngInject */
    function LandingCtrl(currentPageTitle, $translate) {
        var vm = this;
        currentPageTitle.pageTitle = $translate.instant('pages.landing.title');
    }


})();

