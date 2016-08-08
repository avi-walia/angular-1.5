(function () {
    'use strict';

    angular.module('advisorLocator.utils')
        .component('ciEmptyState', {
                bindings: {
                    data: '<',
                    message: '@?emptyStateMessage',
                    class: '@?emptyStateClass'
                },
                controller: function() {
                    this.isEmpty = _.isEmpty;
                },
                transclude: true,
                template:
                    '<div>' +
                        '<div class="{{ $ctrl.class }}" ng-if="$ctrl.isEmpty($ctrl.data)">{{ $ctrl.message }}</div>' +
                        '<div ng-if="!$ctrl.isEmpty($ctrl.data)" ng-transclude></div>' +
                    '</div>'
        });

})();
