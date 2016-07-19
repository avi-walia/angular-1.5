(function () {
    'use strict';

    angular
        .module('aio.core.main')
        .controller('Page2Ctrl', Page2Ctrl);

    Page2Ctrl.$inject = [];

    /* @ngInject */
    function Page2Ctrl() {
        var vm = this;
        console.log('page2 loaded');

    }


})();

