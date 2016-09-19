
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
        /*
            Array of advisors that match search criteria.
         */
        service.searchResults = [];
        /*
            path to mobile/desktop templates used when rendering infinite scroll/pagination component.
            Not currently being used.
         */
        var path = BASE_URL + '/app/features/components/advisorList/templates';

        //path to mobile templates.
        service.mobileTemplatePath = path + '/mobile.tpl.html';
        //path to desktop templates.
        service.desktopTemplatePath = path + '/desktop.tpl.html';


        //This is the flag that determines if we are sorting in ascending or descending order. This is automatically changed to true on search
        var sortAscending = true;

        //This is the last sort order chosen by the user. This is automatically changed to 'lastname' on search
        var lastSort = '';

        //Stores the contents of the search input
        service.searchTerm = '';

        //Used in infinite scroll/pagination component to determine what property of this service contains the array of data to be rendered.
        service.objectName = 'searchResults'; //this string should be the same as the property holding your whole array of data.

        //Flag that indicates if the service is still loading. Either init function hasn't been called yet, or it has not finished yet.
        service.isLoading = true;

        //Flag used to trigger "search term too short" validation error message.
        service.searchTermTooShort = true;

        //Used by infinite scroll/pagination component to determine how many advisors to display per page.
        service.numPerPage = ELEMENTS_PER_PAGE;

        //Used by infinite scroll/pagination component to determine how many advisors to display on scroll.
        service.mobileMaxNumDisplay = ELEMENTS_PER_PAGE;

        //Used to keep track of the current page.
        service.currentPage = 1;
        //Used to keep track of the maximum number of pages.
        service.maxPages = 0;

        //Function used by infinite scroll/pagination component to display more results on scroll.
        service.loadMore = loadMore;

        //Function used to retrieve all advisors from backend(or cache)
        service.init = init;

        //Function to update the current page
        service.pageChanged = pageChanged;

        /*
            Function to find advisors matching search logic and add them to the service.searchResults array.
            Note: service.searchResults array will be emptied when this function is called, and then new matching advisors will be added.
         */
        service.search = search;

        //Function to sort service.searchResults
        service.sortBy = sortBy;

        //Comparator function to be passed to the array sort function to sort advisors by firstname.
        var compareFirstname;
        //Comparator function to be passed to the array sort function to sort advisors by lastname.
        var compareLastname;
        //Comparator function to be passed to the array sort function to sort advisors by province.
        var compareProvince;
        //Comparator function to be passed to the array sort function to sort advisors by city.
        var compareCity;
        //Comparator function to be passed to the array sort function to sort advisors by advisor id.
        var compareId;

        /*
        Array that lists the properties of an advisor that can be sorted by.
        Note: these values are not exactly the same as the properties found on the advisor object. See comments beside each value to determine mapping.
         */
        service.sortableColumns = [
            'firstname',//firstName
            'lastname',//lastName
            'city',//city
            'province'//province
        ];

        /*
            Used to store all advisors from the backend.
            NOTE: On search, a new boolean property called "showCommon" will be added to each advisor.
         */
        service.allAdvisors = [];

        //Function updates the maximum number of items allowed to be displayed on mobile.
        function loadMore() {
            //increase the number of results to display by the default amount if this does not exceed the total number of search results.
            if (service.mobileMaxNumDisplay < (service.searchResults.length - service.numPerPage) ) {
                service.mobileMaxNumDisplay += service.numPerPage;
            //There are not enough search results to increase the mobileMaxNumDisplay by the default, therefore just make it the same as the number of results.
            } else {
                service.mobileMaxNumDisplay = service.searchResults.length;
            }
        }

        //Load all advisors from backend
        function init() {
            //clear allAdvisors
            service.allAdvisors = [];

            //make http call for all advisors.
            return server.get(BASE_URL + ENDPOINT_URI + '/advisors', false, 'localStorage', false).then(function(data) {
                //all advisors have been retrieved. Dissable isLoading.
                service.isLoading = false;
                //Store all advisors.
                service.allAdvisors = data.data;
                //service.advisorSubset = data.slice((page-1) * itemsPerPage, page * itemsPerPage);
            });
        }

        //update the currentPage tracker
        function pageChanged(newPage) {
            service.currentPage = newPage;
        }

        //Sort the searchResults
        function sortBy(sortOption) {
            //If the user clicked the same sortby option(firstname, lastname, city, province), then toggle the sort order.
            if (lastSort === sortOption) {
                sortAscending = !sortAscending;
            //If the user is sorting by a different sort order than last used, change it back to the default value of ascending.
            } else {
                lastSort = sortOption;
                sortAscending = true;
            }

            //sort by first name.
            if (sortOption === service.sortableColumns[0]) {
                service.searchResults.sort(compareFirstname);
            //sort by last name.
            } else if (sortOption === service.sortableColumns[1]) {
                service.searchResults.sort(compareLastname);
            //sort by city.
            } else if (sortOption === service.sortableColumns[2]) {
                service.searchResults.sort(compareCity);
            //sort by province.
            } else if (sortOption === service.sortableColumns[3]){
                service.searchResults.sort(compareProvince);
            }
        }

        /*
            Find all advisors that conform to the search logic.
            1. Remove all leading and trailing spaces from the searchTerm.
            2. Search term is space separated words.
            3. Punctuation is not considered when searching. Ie. punctuation is removed from the searchTerm AND the advisor name before searching.
            4. Accents are not considered when searching. Ie. accented characters in both the searchTerm and advisor name are replaced with their non-accented equivalents before searching.
            5. Search is not case sensitive
            6. If only one word is provided as a searchTerm, find all advisors whose firstname, common name or last name CONTAIN the searchTerm.
            7. If more than one word is provided as a searchTerm, then find all advisors whose:
                a) firstName + " " + lastName matches the searchTerm or
                b) commonName + " " + lastName matches the searchTerm.
         */
        function search(searchTerm) {
            //empty the searchResults
            service.searchResults = [];
            //remove punctuation, accents and multispaces.
            service.searchTerm = stripPunctuation(removeDiacriticsService.remove(searchTerm.replace(/ +(?= )/g,'')));
            //split the searchTerm into an array of words
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

            //only one word was searched.
            if (subTerms.length === 1 && subTerms[0].length > 1) {
                service.searchTermTooShort = false;
                searchAllNames(subTerms[0]);

            //2 or more words were entered for the searchTerm
            } else if (subTerms.length >= 2) {

                service.searchTermTooShort = false;
                //convert searchTerm to lower case.
                var tempSearchTerm = service.searchTerm.toLowerCase();

                /*
                loop through all advisors and see if either their:
                    1. firstName + " " + lastName combination, with accents/punctuation, and capitalization removed, matches the searchTerm.
                    2. commonName + " " + lastName combination, with accents/punctuation, and capitalization removed, matches the searchTerm.
                 */
                _.forEach(service.allAdvisors, function(advisor, index) {

                    //Convert all names to lowercase and remove punctuation/accents.
                    var commonName = advisor.commonName ? removeDiacriticsService.remove(advisor.commonName).toLowerCase() : null;
                    var firstName = removeDiacriticsService.remove(advisor.firstName).toLowerCase();
                    var lastName = removeDiacriticsService.remove(advisor.lastName).toLowerCase();
                    var cName = stripPunctuation(commonName);
                    var fName = stripPunctuation(firstName);
                    var lName = stripPunctuation(lastName);
                    
                    //check if commonName combination matches searchTerm
                    if (commonName && (cName + " " + lName === tempSearchTerm)) {
                        service.allAdvisors[index].showCommon = true;
                        service.searchResults.push(advisor);

                    //check if firstName combination matches searchTerm
                    } else if (fName + " " + lName === tempSearchTerm) {
                        service.allAdvisors[index].showCommon = false;
                        service.searchResults.push(advisor);
                    }
                });
            } else {
                //none of the search functions were invoked, thus searchTerm must be too short.
                service.searchTermTooShort = true;
            }

            //reset sort order to default. Note: the default sort order is Ascending, but we set it to false because the sortby function will toggle it.
            sortAscending = false;

            //sort searchResults and update the pagination/infinite scroll related trackers(maxPages, mobileMaxNumDisplay, currentPage).
            sortBy('lastname');
            updatePaginationInfiniteScroll();
        }

        //update the pagination/infinite scroll related trackers(maxPages, mobileMaxNumDisplay, currentPage).
        function updatePaginationInfiniteScroll() {
            service.maxPages = Math.ceil(service.searchResults.length / service.numPerPage);
            service.mobileMaxNumDisplay = service.numPerPage;
            service.currentPage = 1;
        }

        function searchAllNames(searchTerm) {
            //loop through all advisors and see if either firstName, commonName, or lastName CONTAINS the searchTerm with punctuation, accents and capitalization removed.
            _.forEach(service.allAdvisors, function(advisor, index) {

                //Convert all names to lowercase and remove punctuation/accents.
                var commonName = advisor.commonName ? removeDiacriticsService.remove(advisor.commonName).toLowerCase() : null;
                var firstName = removeDiacriticsService.remove(advisor.firstName).toLowerCase();
                var lastName = removeDiacriticsService.remove(advisor.lastName).toLowerCase();
                var cName = stripPunctuation(commonName);
                var fName = stripPunctuation(firstName);
                var lName = stripPunctuation(lastName);

                //check if commonName CONTAINS the searchTerm
                if (commonName && (commonName.indexOf(searchTerm) >= 0 || cName.indexOf(searchTerm) >= 0)) {
                    service.allAdvisors[index].showCommon = true;
                    service.searchResults.push(advisor);
                //check if firstName CONTAINS the searchTerm
                } else if(firstName.indexOf(searchTerm) >= 0 || fName.indexOf(searchTerm) >= 0) {
                    service.allAdvisors[index].showCommon = false;
                    advisor.showCommon = false;
                    service.searchResults.push(advisor);
                //check if lastName CONTAINS the searchTerm
                } else if(lastName.indexOf(searchTerm) >= 0 || lName.indexOf(searchTerm) >= 0) {
                    //lastName CONTAINS the search term, see if they have a commonName to display.
                    if (advisor.commonName) {
                        //commonName exists, show it
                        service.allAdvisors[index].showCommon = true;
                    } else {
                        //commonName does not exist, show firstName
                        service.allAdvisors[index].showCommon = false;
                    }
                    service.searchResults.push(advisor);
                }
            });
        }

        //comparitor function used to sort by advisor id
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

        //comparitor function used to sort by advisor firstname
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


        //comparitor function used to sort by advisor lastname
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

        //comparator function used to compare by city
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

        //comparitor function used to sort by province
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

        //Remove punctuation from string
        function stripPunctuation(string) {
            if (!string) {
                return string;
            } else {
                return string.replace(/[.,\/#!$%\^&\*;:{}=\-_`'~()]/g, "");
            }
        }

    }

})();
