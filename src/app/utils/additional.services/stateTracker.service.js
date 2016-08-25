(function () {
    'use strict';

    angular
        .module('advisorLocator.utils')
        .service('stateTrackerService', stateTrackerService);

    stateTrackerService.$inject = ['$rootScope'];

    /* @ngInject */
    function stateTrackerService($rootScope) {
        var service = this;
        service.previousSate = "";

        return service.previousSate;
    }
})();

