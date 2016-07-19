(function () {
    'use strict';

    angular
        .module('aio.core.main')
        .controller('SubPageCtrl', SubPageCtrl);

    SubPageCtrl.$inject = [];

    /* @ngInject */
    function SubPageCtrl() {
        var vm = this;
        console.log('SubPageCtrl loaded');

    }


})();

