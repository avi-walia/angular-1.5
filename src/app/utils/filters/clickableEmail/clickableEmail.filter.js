(function () {
    'use strict';

    angular
        .module('advisorLocator.utils')
        .filter('clickableEmail', clickableEmailFilter);

    clickableEmailFilter.$inject = [
        '$sce',
        '$translate'
    ]

    //this filter is used to determine if a valid email was provided and format it to be clickable if it is.
    function clickableEmailFilter($sce, $translate) {
        return function (email, advisor) {
            /*
            if (validateEmail(email)) {
                return $sce.trustAsHtml("<a href='mailto:" + email + "' target='_top'>" + email + "</a>");
            }
            */
            if (email) {
                var ariaLabel = $translate.instant('aria.namesearch.email', advisor);
                return $sce.trustAsHtml("<a aria-label='" + ariaLabel + "' title='" + ariaLabel + "' href='mailto:" + email + "' target='_top'>" + email + "</a>");
            }
            return email;
        };
    };
    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
})();
