
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
        service.sortBy = sortBy;
        var sortAscending = true;
        var lastSort = '';
        service.sortableColumns = [
            'firstname',
            'lastname',
            'city',
            'province'
        ]

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
            service.maxPages = Math.ceil(service.searchResults.length / service.numPerPage);
            service.mobileMaxNumDisplay = service.numPerPage;
            service.currentPage = 1;
        }


        function search(searchTerm) {
            //remove all multi-spaces
            service.searchTerm = searchTerm.replace(/ +(?= )/g,'');
            var subTerms = searchTerm.toLowerCase().split(' ');
            var i = 0;
            while (i < subTerms.length) {
                if (subTerms[i].length < 2) {
                    subTerms.splice(i, 1);
                } else {
                    i++;
                }
            }
            if (searchTerm && searchTerm.length > 1 && subTerms.length > 0) {
                service.searchTermTooShort = false;
                service.searchResults = [];
                //for (var i = 0; i < advisors.length; i++) {
                _.forEach(advisors, function(advisor, index) {
                    _.forEach(subTerms, function(subTerm) {
                        /*
                        if ((advisor.commonName && advisor.commonName.toLowerCase().indexOf(subTerm) >= 0) || (!advisor.commonName && advisor.firstName.toLowerCase().indexOf(subTerm) >= 0) || (advisor.lastName.toLowerCase().indexOf(subTerm) >= 0)) {
                            service.searchResults.push(advisor);
                            return false;
                        }
                        */
                        if (advisor.commonName && advisor.commonName.toLowerCase().indexOf(subTerm) >= 0) {
                            advisors[index].showCommon = true;
                            service.searchResults.push(advisor);
                            return false;
                        } else if(advisor.firstName.toLowerCase().indexOf(subTerm) >= 0) {
                            advisors[index].showCommon = false;
                            service.searchResults.push(advisor);
                            return false;
                        }
                    })
                });
            } else {
                service.searchTermTooShort = true;
                service.searchResults = [];

            }
            updatePaginationInfiniteScroll();
        }

        function compareFirstname(obj1, obj2) {
            if (sortAscending) {
                var name1 = obj1.commonName ? obj1.commonName.toLowerCase() : obj1.firstName.toLowerCase();
                var name2 = obj2.commonName ? obj2.commonName.toLowerCase() : obj2.firstName.toLowerCase();
            } else {
                var name1 = obj2.commonName ? obj2.commonName.toLowerCase() : obj2.firstName.toLowerCase();
                var name2 = obj1.commonName ? obj1.commonName.toLowerCase() : obj1.firstName.toLowerCase()
            }

            if (name1 < name2) {
                return -1;
            } else if (name1 == name2) {
                return 0;
            } else {
                return 1;
            }
        }

        function compareLastName(obj1, obj2) {
            if (sortAscending) {
                var name1 = obj1.lastName.toLowerCase();
                var name2 = obj2.lastName.toLowerCase();
            } else {
                var name1 = obj2.lastName.toLowerCase();
                var name2 = obj1.lastName.toLowerCase();
            }

            if (name1 < name2) {
                return -1;
            } else if (name1 == name2) {
                return 0;
            } else {
                return 1;
            }
        }

        function compareCity(obj1, obj2) {

            if (sortAscending) {
                var name1 = obj1.partialBranchInfo.city.toLowerCase();
                var name2 = obj2.partialBranchInfo.city.toLowerCase();
            } else {
                var name1 = obj2.partialBranchInfo.city.toLowerCase();
                var name2 = obj1.partialBranchInfo.city.toLowerCase();
            }
            if (name1 < name2) {
                return -1;
            } else if (name1 == name2) {
                return 0;
            } else {
                return 1;
            }
        }
        function compareProvince(obj1, obj2) {
            if (sortAscending) {
                var name1 = obj1.partialBranchInfo.provinceAbbr.toLowerCase();
                var name2 = obj2.partialBranchInfo.provinceAbbr.toLowerCase();
            } else {
                var name1 = obj2.partialBranchInfo.provinceAbbr.toLowerCase();
                var name2 = obj1.partialBranchInfo.provinceAbbr.toLowerCase();
            }
            if (name1 < name2) {
                return -1;
            } else if (name1 == name2) {
                return 0;
            } else {
                return 1;
            }
        }

        function sortBy(filter) {

            if (lastSort === filter) {
                sortAscending = !sortAscending;
            } else {
                lastSort = filter;
                sortAscending = true;
            }
            console.log('filter: ', filter);
            if (filter === 'firstname') {
                service.searchResults.sort(compareFirstname);
            } else if (filter === 'lastname') {
                service.searchResults.sort(compareLastName);
            } else if (filter === 'city') {
                service.searchResults.sort(compareCity);
            } else {
                service.searchResults.sort(compareProvince);
            }
        }

    }

})();
