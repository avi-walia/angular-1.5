(function () {
    'use strict';

    angular
        .module('aio.core.main')
        .controller('Page2Ctrl', Page2Ctrl);

    Page2Ctrl.$inject = ['currentPageTitle', '$translate'];

    /* @ngInject */
    function Page2Ctrl(currentPageTitle, $translate) {
        var vm = this;
        console.log('page2 loaded');
        currentPageTitle.page.title = $translate.instant('pages.page2.title');

    }


})();

