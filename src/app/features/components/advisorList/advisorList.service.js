
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
        var advisors = [];
        service.searchResults = [];
        service.searchTerm = '';
        service.objectName = "searchResults";//this string should be the same as the property holding your whole array of data.
        service.isLoading = false;
        var path = BASE_URL + '/app/features/components/advisorList/templates';
        service.numPerPage = ELEMENTS_PER_PAGE;
        service.currentPage = 1;
        service.mobileMaxNumDisplay = ELEMENTS_PER_PAGE;
        service.maxPages = 0;
        service.mobileTemplatePath = path + '/mobile.tpl.html';
        service.desktopTemplatePath = path + '/desktop.tpl.html';
        service.loadMore = loadMore;
        service.init = init;
        service.pageChanged = pageChanged;
        service.search = search;
        service.searchTermTooShort = true;

        function loadMore() {
            if (service.mobileMaxNumDisplay < service.searchResults.length - service.numPerPage) {
                service.mobileMaxNumDisplay += service.numPerPage;
            } else {
                service.mobileMaxNumDisplay = service.searchResults.length;
            }
        }
        function init() {
            advisors = [];
            service.isLoading = true;
            server.get(BASE_URL + ENDPOINT_URI + '/advisors', false, 'localStorage', false).then(function(data) {
                //console.log('data1123: ', data.data);
                advisors = data.data;
                service.isLoading = false;

                //service.advisorSubset = data.slice((page-1) * itemsPerPage, page * itemsPerPage);
            });
        };

        function pageChanged(newPage) {
            service.currentPage = newPage;
        }

        function updatePaginationInfiniteScroll() {
            console.log('page max: ', service.searchResults.length);
            console.log(service.numPerPage);

            service.maxPages = Math.ceil(service.searchResults.length / service.numPerPage);
            service.mobileMaxNumDisplay = service.numPerPage;
            service.currentPage = 1;
        }


        function search(searchTerm) {
            service.searchTerm = searchTerm;
            if (searchTerm && searchTerm.length >= 2) {
                service.searchTermTooShort = false;
                service.searchResults = [];
                console.log('searchTerm: ', searchTerm);
                for (var i = 0; i < advisors.length; i++) {
                    if (advisors[i].firstName.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0 || advisors[i].lastName.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0) {
                        service.searchResults.push(advisors[i]);
                    }
                }
            } else {
                service.searchTermTooShort = true;
                service.searchResults = [];

            }
            updatePaginationInfiniteScroll();
        }

    }

})();
