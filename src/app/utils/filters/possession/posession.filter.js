(function () {
    'use strict';

    angular
        .module('advisorLocator.utils')
        .filter('posession', posessionFilter);

    //this filter is used to determine wether an apostrophe s must be added on the end of a name to show posession.
    function posessionFilter() {
        return function (name) {
            if (!name) {
                return name;
            }
            name = name + "'";
            var endsWith = String(name).substring(name.length-1, name.length).toLowerCase();
            if (endsWith !== 's') {
                return name + "s";
            }
        };
    }
})();
