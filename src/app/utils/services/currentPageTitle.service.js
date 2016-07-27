/**
 * Created by michong on 2016-05-06.
 */

(function () {
    'use strict';
    angular
        .module('aio.utils')
        .service('currentPageTitle', currentPageTitle);

    /* @ngInject */
    function currentPageTitle() {
        var service = this;
        //service.pageTitle = 'hello world';
        service.page = {
            title: ''
        };
        /*
        service.setPageName = setPageName;
        service.getPageName = getPageName;
        function setPageName(pgName) {
            if (_.isString(pgName)) {
                pageName = pgName;
            }
        }
        function getPageName() {
            return pageName;
        }
        */
    }

})();