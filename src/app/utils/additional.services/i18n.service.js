(function () {
    'use strict';

    angular
        .module('advisorLocator.utils')
        .service('i18nService', i18nService);

    i18nService.$inject = ['$rootScope'];

    /* @ngInject */
    function i18nService($rootScope) {
        var service = this;
        service.filterLocalizedKeys = getFilteredKeys;

        /**
         * Localizes an object by looking at the set locale and returning only values pertaining to that locale.
         * @param {*} data to be localized
         * @returns {*} localized data
         */
        function getFilteredKeys(data) {
            var locale = $rootScope.documentLanguage;

            // if it's any kind of object, go into it
            if (_.isObject(data)) {
                if (!_.isArray(data)) {
                    // if it's an Object and NOT an Array, fix the keys
                    data = remapKeys(data, locale);
                }
                // go into the object in case values are also objects
                return _.each(data, function (value, key, collection) {
                    collection[key] = getFilteredKeys(value);
                });
            } else {
                // not an Object, nothing to remap
                return data;
            }
        }
    }

    function remapKeys(o, locale) {
        var keepVal = locale === 'en' ? 'En' : 'Fr';
        var removeVal = locale === 'en' ? 'Fr' : 'En';

        return _(o)
            .mapKeys(function (value, key) {
                if (_.endsWith(key, removeVal)) {
                    return '__keyToRemove__';
                } else {
                    // if it ends with lang suffix that we need to rename, trim it (the last 2 characters: En/Fr)
                    if (_.endsWith(key, keepVal)) {
                        return key.substr(0, key.length - 2);
                    }
                    return key;
                }
            })
            .omit('__keyToRemove__')
            .value();
    }
})();

