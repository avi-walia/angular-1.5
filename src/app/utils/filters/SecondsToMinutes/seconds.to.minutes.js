/**
 * Filter used to convert seconds to minutes.
 * Displayed in Inactivity modal notification.
 */

(function () {
    'use strict';

    angular
        .module('advisorLocator.utils')
        .filter('secondsToMinutes', secondsToMinutes);

    secondsToMinutes.$inject = ['$rootScope', '$filter'];
    function secondsToMinutes($rootScope, $filter) {
        return secondsToMinutesFilter;

        ////////////////

        function secondsToMinutesFilter(input) {
            if (input === null) {
                return '';
            }
            //var time = $filter('date')(new Date(0, 0, 0, 0, 0, input, 0), 'm : ss !');
            //return time.toUpperCase().replace(/:/, $locale.DATETIME_FORMATS.idleTimeMin).replace(/!/, $locale.DATETIME_FORMATS.idleTimeSec);
            var locale = $rootScope.documentLanguage;
            var time = $filter('date')(new Date(0, 0, 0, 0, 0, input, 0), 'm');
            var minNum = Math.floor(time) + 1;
            var minString = minNum > 1 ? 'minutes' : 'minute';
            var lessThan = locale === 'en' ? 'less than' : 'moins de';
            return lessThan + ' ' + minNum + ' ' + minString;
        }
    }

})();

