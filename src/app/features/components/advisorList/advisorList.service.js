
(function () {
    'use strict';

    angular
        .module('advisorLocator.features.searchByName')
        .service('advisorService', advisorService);

    advisorService.$inject = [
        'removeDiacriticsService',
        'server',
        'BASE_URL',
        'ENDPOINT_URI',
        'ELEMENTS_PER_PAGE'
    ];

    function advisorService(removeDiacriticsService, server, BASE_URL, ENDPOINT_URI, ELEMENTS_PER_PAGE) {
        var service = this;
        var advisors = [];
        var path = BASE_URL + '/app/features/components/advisorList/templates';
        var sortAscending = true;
        var lastSort = '';

        service.searchTerm = '';
        service.objectName = 'searchResults'; //this string should be the same as the property holding your whole array of data.
        service.isLoading = false;
        service.searchTermTooShort = true;

        service.numPerPage = ELEMENTS_PER_PAGE;
        service.mobileMaxNumDisplay = ELEMENTS_PER_PAGE;

        service.currentPage = 1;
        service.maxPages = 0;

        service.mobileTemplatePath = path + '/mobile.tpl.html';
        service.desktopTemplatePath = path + '/desktop.tpl.html';

        service.loadMore = loadMore;
        service.init = init;
        service.pageChanged = pageChanged;
        service.search = search;
        service.sortBy = sortBy;
<<<<<<< HEAD
        var sortAscending = true;
        var lastSort = '';
        var compareFirstname;
        var compareLastname;
        var compareProvince;
        var compareCity;
        var compareId;



=======

        service.searchResults = [];
>>>>>>> 297
        service.sortableColumns = [
            'firstname',
            'lastname',
            'city',
            'province'
        ];

        function loadMore() {
            if (service.mobileMaxNumDisplay < (service.searchResults.length - service.numPerPage) ) {
                service.mobileMaxNumDisplay += service.numPerPage;
            } else {
                service.mobileMaxNumDisplay = service.searchResults.length;
            }
        }
        function init() {
            advisors = [];
            service.isLoading = true;
            server.get(BASE_URL + ENDPOINT_URI + '/advisors', false, 'localStorage', false).then(function(data) {
                advisors = data.data;
                service.isLoading = false;

                //service.advisorSubset = data.slice((page-1) * itemsPerPage, page * itemsPerPage);
            });
        }

        function pageChanged(newPage) {
            service.currentPage = newPage;
        }

        function sortBy(filter) {
            if (lastSort === filter) {
                sortAscending = !sortAscending;
            } else {
                lastSort = filter;
                sortAscending = true;
            }
            console.log('filter: ', filter);
            if (filter === service.sortableColumns[0]) {
                service.searchResults.sort(compareFirstname);
            } else if (filter === service.sortableColumns[1]) {
                service.searchResults.sort(compareLastName);
            } else if (filter === service.sortableColumns[2]) {
                service.searchResults.sort(compareCity);
            } else if (filter === service.sortableColumns[3]){
                service.searchResults.sort(compareProvince);
            }
        }

        function search(searchTerm) {
            //remove all multi-spaces
            service.searchResults = [];
            service.searchTerm = stripPunctuation(removeDiacriticsService.remove(searchTerm.replace(/ +(?= )/g,'')));
            var subTerms = service.searchTerm.toLowerCase().split(' ');
            var i = 0;
            /*
            while (i < subTerms.length) {
                if (subTerms[i].length < 2) {
                    subTerms.splice(i, 1);
                } else {
                    i++;
                }
            }
            */
            if (subTerms.length === 1 && subTerms[0].length > 1) {
                searchAllNames(subTerms[0]);
            } else if (subTerms.length >= 2) {
                var tempSearchTerm = service.searchTerm.toLowerCase();
                _.forEach(advisors, function(advisor, index) {
                    var commonName = advisor.commonName ? removeDiacriticsService.remove(advisor.commonName).toLowerCase() : null;
                    var firstName = removeDiacriticsService.remove(advisor.firstName).toLowerCase();
                    var lastName = removeDiacriticsService.remove(advisor.lastName).toLowerCase();
                    var cName = stripPunctuation(commonName);
                    var fName = stripPunctuation(firstName);
                    var lName = stripPunctuation(lastName);
                    
                    //if (commonName && (commonName === subTerms[0] || cName == subTerms[0]) && (lastName === subTerms[1] || lName === subTerms[1])) {
                    if (commonName && (cName + " " + lName === tempSearchTerm)) {
                        advisors[index].showCommon = true;
                        service.searchResults.push(advisor);
                    //} else if ((firstName === subTerms[0] || fName === subTerms[0]) && (lastName === subTerms[1] || lName === subTerms[1])) {
                    } else if (fName + " " + lName === tempSearchTerm) {
                        advisors[index].showCommon = false;
                        service.searchResults.push(advisor);
                    }
                });
            }
            sortAscending = false;
            sortBy('lastname');
            updatePaginationInfiniteScroll();
        }

        function updatePaginationInfiniteScroll() {
            service.maxPages = Math.ceil(service.searchResults.length / service.numPerPage);
            service.mobileMaxNumDisplay = service.numPerPage;
            service.currentPage = 1;
        }

        function searchAllNames(searchTerm) {
            _.forEach(advisors, function(advisor, index) {
                var commonName = advisor.commonName ? removeDiacriticsService.remove(advisor.commonName).toLowerCase() : null;
                var firstName = removeDiacriticsService.remove(advisor.firstName).toLowerCase();
                var lastName = removeDiacriticsService.remove(advisor.lastName).toLowerCase();
                var cName = stripPunctuation(commonName);
                var fName = stripPunctuation(firstName);
                var lName = stripPunctuation(lastName);
<<<<<<< HEAD
=======

                console.log('cName: ', cName);
                console.log('fName: ', fName);
>>>>>>> 297

                if (commonName && (commonName.indexOf(searchTerm) >= 0 || cName.indexOf(searchTerm) >= 0)) {
                    advisors[index].showCommon = true;
                    service.searchResults.push(advisor);
                } else if(firstName.indexOf(searchTerm) >= 0 || fName.indexOf(searchTerm) >= 0) {
                    advisors[index].showCommon = false;
                    advisor.showCommon = false;
                    service.searchResults.push(advisor);
                } else if(lastName.indexOf(searchTerm) >= 0 || lName.indexOf(searchTerm) >= 0) {
                    if (advisor.commonName) {
                        advisors[index].showCommon = true;
                    } else {
                        advisors[index].showCommon = false;
                    }
                    service.searchResults.push(advisor);
                }
            });
        }


/*
        function search(searchTerm) {
            //remove all multi-spaces
            service.searchTerm = removeDiacriticsService.remove(searchTerm.replace(/ +(?= )/g,''));
            var subTerms = service.searchTerm.toLowerCase().split(' ');
            var i = 0;
            while (i < subTerms.length) {
                if (subTerms[i].length < 2) {
                    subTerms.splice(i, 1);
                } else {
                    i++;
                }
            }
            if (service.searchTerm && service.searchTerm.length > 1 && subTerms.length > 0) {
                service.searchTermTooShort = false;
                service.searchResults = [];
                //for (var i = 0; i < advisors.length; i++) {
                _.forEach(advisors, function(advisor, index) {
                    _.forEach(subTerms, function(subTerm) {
                        var commonName = advisor.commonName ? removeDiacriticsService.remove(advisor.commonName).toLowerCase() : null;
                        var firstName = removeDiacriticsService.remove(advisor.firstName).toLowerCase();
                        var lastName = removeDiacriticsService.remove(advisor.lastName).toLowerCase();

                        if (commonName && commonName.indexOf(subTerm) >= 0) {
                            advisors[index].showCommon = true;
                            service.searchResults.push(advisor);
                            return false;
                        } else if(firstName.indexOf(subTerm) >= 0) {
                            advisors[index].showCommon = false;
                            advisor.showCommon = false;
                            service.searchResults.push(advisor);
                            return false;
                        } else if(lastName.indexOf(subTerm) >= 0) {
                            if (advisor.commonName) {
                                advisors[index].showCommon = true;
                            } else {
                                advisors[index].showCommon = false;
                            }
                            service.searchResults.push(advisor);
                            return false;
                        }
                    });
                });
                sortAscending = false;
                sortBy('lastname');
            } else {
                service.searchTermTooShort = true;
                service.searchResults = [];

            }
            updatePaginationInfiniteScroll();
        }
*/

        compareId = function(obj1, obj2, order) {
            var name1;
            var name2;
            if (sortAscending) {
                name1 = obj1.id;
                name2 = obj2.id;
            } else {
                name1 = obj2.id;
                name2 = obj1.id;
            }
            //advisorId's are always unique, will never equal.
            if (name1 < name2) {
                return -1;
            } else {
                return 1;
            }
        };

        compareFirstname = function(obj1, obj2, order) {

            var name1;
            var name2;
            if (sortAscending) {
                name1 = obj1.commonName ? obj1.commonName.toLowerCase() : obj1.firstName.toLowerCase();
                name2 = obj2.commonName ? obj2.commonName.toLowerCase() : obj2.firstName.toLowerCase();
            } else {
                name1 = obj2.commonName ? obj2.commonName.toLowerCase() : obj2.firstName.toLowerCase();
                name2 = obj1.commonName ? obj1.commonName.toLowerCase() : obj1.firstName.toLowerCase();
            }

            if (name1 < name2) {
                return -1;
            } else if (name1 === name2) {
                if (!order) {//firstname was primary sort
                    return compareLastname(obj1, obj2, 2);
                } else {//first name is always the 2nd last sort if it is not the primary. So always go to the last sort option, advisorID if not primary
                    return compareId(obj1, obj2, 4);
                }
            } else {
                return 1;
            }
        };

        compareLastname = function(obj1, obj2, order) {
            var name2;
            var name1;
            if (sortAscending) {
                name1 = obj1.lastName.toLowerCase();
                name2 = obj2.lastName.toLowerCase();
            } else {
                name1 = obj2.lastName.toLowerCase();
                name2 = obj1.lastName.toLowerCase();
            }

            if (name1 < name2) {
                return -1;
            } else if (name1 === name2) {
                if (!order) {//lastname was primary sort
                    return compareFirstname(obj1, obj2, 2);
                } else if (order === 2) {//lastname was secondary sort
                    return compareId(obj1, obj2, 3);
                } else if (order === 3) {//lastname was tertiary sort
                    return compareFirstname(obj1, obj2, 4);
                }
            } else {
                return 1;
            }
        };

        compareCity = function(obj1, obj2, order) {
            var name1;
            var name2;
            if (sortAscending) {
                name1 = obj1.partialBranchInfo.city.toLowerCase();
                name2 = obj2.partialBranchInfo.city.toLowerCase();
            } else {
                name1 = obj2.partialBranchInfo.city.toLowerCase();
                name2 = obj1.partialBranchInfo.city.toLowerCase();
            }
            if (name1 < name2) {
                return -1;
            } else if (name1 === name2) {
                if (!order) {//city was primary sort
                    return compareProvince(obj1, obj2, 2);
                } else if (order === 2) {// city was secondary sort
                    return compareLastname(obj1, obj2, 3);
                }
            } else {
                return 1;
            }
        };

        compareProvince = function(obj1, obj2, order) {
            var name1;
            var name2;
            if (sortAscending) {
                name1 = obj1.partialBranchInfo.provinceAbbr.toLowerCase();
                name2 = obj2.partialBranchInfo.provinceAbbr.toLowerCase();
            } else {
                name1 = obj2.partialBranchInfo.provinceAbbr.toLowerCase();
                name2 = obj1.partialBranchInfo.provinceAbbr.toLowerCase();
            }
            if (name1 < name2) {
                return -1;
            } else if (name1 === name2) {
                if (!order) {//province was primary sort
                    return compareCity(obj1, obj2, 2);
                } else if (order === 2) {//province was secondary sort
                    return compareLastname(obj1, obj2, 3);
                }
            } else {
                return 1;
            }
        };

        function stripPunctuation(string) {
            if (!string) {
                return string;
            } else {
                return string.replace(/[.,\/#!$%\^&\*;:{}=\-_`'~()]/g, "");
            }
        }

            if (lastSort === filter) {
                sortAscending = !sortAscending;
            } else {
                lastSort = filter;
                sortAscending = true;
            }
            if (filter === service.sortableColumns[0]) {
                service.searchResults.sort(compareFirstname);
            } else if (filter === service.sortableColumns[1]) {
                service.searchResults.sort(compareLastname);
            } else if (filter === service.sortableColumns[2]) {
                service.searchResults.sort(compareCity);
            } else if (filter === service.sortableColumns[3]){
                service.searchResults.sort(compareProvince);
            }

    }

})();
