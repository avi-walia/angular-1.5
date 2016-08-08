(function () {
    'use strict';

    angular
        .module('advisorLocator.utils')
        .service('help', help);

    help.$inject = ['ROUTES'];

    /* @ngInject */
    function help(ROUTES) {
        var service = this;
        var layout = [];
        _.forEach(ROUTES, layoutGenerator);

        function layoutGenerator(route){
            //only top-level pages/views(things accessible via navbar) should have numHelpTopics property.
            //sub-pages/views should not
            if (route.numHelpTopics) {
                console.log('route: ', route);
                var helpTopicIndexes = [];
                for (var i = 1; i <= route.numHelpTopics; i++) {
                    helpTopicIndexes.push(i);
                }
                var pageName = route.pageName;
                layout.push({
                    pageName: route.pageName,
                    indexes: helpTopicIndexes
                });
            } else {
                console.log('did not add route: ', route);
            }
        }
        console.log('ROUTES: ', layout);

        service.getLayout = function() {
            return layout;
        };
    }

})();

