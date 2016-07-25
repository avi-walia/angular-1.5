(function () {
    'use strict';

    angular
        .module('aio.core.main')
        .controller('Page5Ctrl', Page5Ctrl);

    Page5Ctrl.$inject = ['currentPageTitle', '$translate'];

    /* @ngInject */
    function Page5Ctrl(currentPageTitle, $translate) {
        var vm = this;
        console.log('page5 loaded');
        currentPageTitle.page.title = $translate.instant('pages.page5.title');

    }


})();

