(function () {
    'use strict';

    angular
        .module('aio.core.main')
        .controller('Page1Ctrl', Page1Ctrl);

    Page1Ctrl.$inject = [];

    /* @ngInject */
    function Page1Ctrl() {
        var vm = this;
        console.log('page1 loaded');

    }


})();

