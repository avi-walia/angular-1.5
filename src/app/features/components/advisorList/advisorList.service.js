
(function () {
    'use strict';

    angular
        .module('advisorLocator.features.searchByName')
        .service('advisorService', advisorService);

    advisorService.$inject = [
        'server',
        'BASE_URL',
        'ENDPOINT_URI',
        'ELEMENTS_PER_PAGE'
    ];

    function advisorService(server, BASE_URL, ENDPOINT_URI, ELEMENTS_PER_PAGE) {
        var service = this;
        service.advisors = [];
        service.objectName = "advisors";//this string should be the same as the property holding your whole array of data.
        service.isLoading = false;
        var path = BASE_URL + '/app/features/components/advisorList/templates';
        service.numPerPage = ELEMENTS_PER_PAGE;
        service.currentPage = 1;
        service.mobileMaxNumDisplay = 4;
        service.maxPages = 0;
        service.mobileTemplatePath = path + '/mobile.tpl.html';
        service.desktopTemplatePath = path + '/desktop.tpl.html';

        service.loadMore = function() {
            if (service.mobileMaxNumDisplay < service.advisors.length - service.numPerPage) {
                service.mobileMaxNumDisplay += service.numPerPage;
            } else {
                service.mobileMaxNumDisplay = service.advisors.length;
            }
        }
        service.init = function() {
            service.advisors = [];
            service.isLoading = true;
            server.get(BASE_URL + ENDPOINT_URI + '/advisors', false, 'localStorage', false).then(function(data) {
                //console.log('data1123: ', data.data);
                service.advisors = data.data;
                service.isLoading = false;
                service.maxPages = Math.floor(service.advisors / service.numPerPage);
                //service.advisorSubset = data.slice((page-1) * itemsPerPage, page * itemsPerPage);
            });
        };

        service.pageChanged = function(newPage) {
            service.currentPage = newPage;
        }

    }

})();
