(function () {
    'use strict';

    angular
        .module('aio.core.main')
        .controller('Page5Ctrl', Page5Ctrl);

    Page5Ctrl.$inject = [];

    /* @ngInject */
    function Page5Ctrl() {
        var vm = this;
        console.log('page5 loaded');

    }


})();

