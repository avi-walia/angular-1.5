(function () {
    'use strict';

    angular
        .module('advisorLocator.core.main')
        .controller('SubPageCtrl', SubPageCtrl);

    SubPageCtrl.$inject = ['currentPageTitle', '$translate'];

    /* @ngInject */
    function SubPageCtrl(currentPageTitle, $translate) {
        var vm = this;
        console.log('SubPageCtrl loaded');

        currentPageTitle.page.title = $translate.instant('pages.page3.title');
    }


})();

