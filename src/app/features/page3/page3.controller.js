(function () {
    'use strict';

    angular
        .module('aio.core.main')
        .controller('Page3Ctrl', Page3Ctrl);

    Page3Ctrl.$inject = [];

    /* @ngInject */
    function Page3Ctrl() {
        var vm = this;
        console.log('Page3Ctrl loaded');

    }


})();
