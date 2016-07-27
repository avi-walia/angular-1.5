(function () {
    'use strict';

    angular
        .module('advisorLocator.core.main')
        .controller('Page4Ctrl', Page4Ctrl);

    Page4Ctrl.$inject = ['currentPageTitle', '$translate'];

    /* @ngInject */
    function Page4Ctrl(currentPageTitle, $translate) {
        var vm = this;
        console.log('page4 loaded');
        currentPageTitle.page.title = $translate.instant('pages.page4.title');

    }


})();

