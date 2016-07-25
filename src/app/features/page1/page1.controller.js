(function () {
    'use strict';

    angular
        .module('aio.core.main')
        .controller('Page1Ctrl', Page1Ctrl);

    Page1Ctrl.$inject = ['currentPageTitle', '$translate'];

    /* @ngInject */
    function Page1Ctrl(currentPageTitle, $translate) {
        var vm = this;
        console.log('page1 loaded');
        currentPageTitle.page.title = $translate.instant('pages.page1.title');
    }


})();

