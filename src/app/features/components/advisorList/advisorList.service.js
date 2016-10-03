
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
        'ELEMENTS_PER_PAGE',
        'FILTERS',
        'filterRunnerService'
    ];

    function advisorService(removeDiacriticsService, server, BASE_URL, ENDPOINT_URI, ELEMENTS_PER_PAGE, FILTERS, filterRunnerService) {
        var service = this;
        //This array stores results that contain some but not all the search terms. This is displayed IF AND ONLY IF there are no results that contain all search terms.
        var secondaryResults = [];
        //names of available filters
        service.filters = {
            lang: 'lang',
            province:'province'
        };
        var filterFuncs = {
            lang: filterLang,
            province: filterProv
        }
        service.updateFilters = function(filter) {
            service.filterRunnerService.setFilters(filter);

            service.filteredSearchResults = service.filterRunnerService.filter();
        }
        filterRunnerService.init(service.filters, filterFuncs);
        service.filterRunnerService = filterRunnerService;

        service.clearFilters = function() {
            service.selectedFilters.lang = null;
            service.selectedFilters.province = [];
            service.activeFilters = [];
            service.filteredSearchResults = service.filterRunnerService.allData;
        }

        //one of the filters was changed, update the array of filters.
        service.setFilters = function(filterName) {
            //determine which filter changed
            if (filterName === service.filters.lang) {
                //see if the filter has already been added to the array.
                var x = service.activeFilters.indexOf(filterLang);
                //filter needs to be added to the array
                if (x < 0) {
                    service.activeFilters.push(filterLang);
                }
            }
            if (filterName === service.filters.province) {

                console.log('service.selectedFilters.province: ', service.selectedFilters.province);
                //see if the filter has already been added to the array.
                var x = service.activeFilters.indexOf(filterProv);
                //check if atleast one province has been chosen to filter by
                if (service.selectedFilters.province.length > 0) {
                    //There was atleast one province to filter by, filter needs to be added to the array if it isn't already part of the array
                    if (x < 0) {
                        service.activeFilters.push(filterProv);
                    }
                } else {
                    //there were no provinces to filter by. Remove filter from array.
                    if (x >= 0) {
                        service.activeFilters.splice(x, 1);
                    }
                }
            }
            //run all filters
            //service.filter();
            service.filteredSearchResults = service.filterRunnerService.filter();
        }

        //loop through all active filters to see if the advisor should be displayed or not.
        function filterLooper(advisor) {
            //assume advisor passes all filters and should be displayed.
            var ret = true;
            //loop through each active filter.
            _.forEach(service.activeFilters, function(filter, index) {
                //if the advisor does not pass the filter, it should be removed.
                if (!filter(advisor)) {
                    //advisor did not pass filter, remove it from the filteredSearchResults
                    ret = false;
                    //break out of the forEach
                    return false;
                }
            });
            //returns true if advisor should be added to filteredSearchResults, returns false otherwise.
            return ret;
        }

        service.filter = function() {
            //loop through all searchResults and apply each filter in the array of active filters to get the filteredSearchResults
            service.filteredSearchResults = _.filter(service.filterRunnerService.allData, filterLooper);
        };

        //Filter searchResults based on advisor's spokenLanguage
        function filterLang(advisor) {
            /*
            bilingual advisors will always show up.
            otherwise advisors will only be displayed if they're spokenLanguage is equal to service.selectedFilters.lang.
             */
            console.log('advisor: ', advisor.spokenLanguage);
            console.log('value: ',service.filterRunnerService.filters.lang.values);
            console.log('FILTERS.lang.bilingual: ', service.filterRunnerService.filters.lang.defaultValues);
            //return (advisor.spokenLanguage === FILTERS.lang.bilingual || advisor.spokenLanguage === service.selectedFilters.lang);
            return (advisor.spokenLanguage === service.filterRunnerService.filters.lang.defaultValues[0] || advisor.spokenLanguage === service.filterRunnerService.filters.lang.values);
        }
        //Filter searchResults based on advisor's spokenLanguage
        function filterProv(advisor) {
            //only display advisors who match the selected province
            //return (advisor.partialBranchInfo.provinceAbbr === service.selectedFilters.province);


            var ret = false;
            //only display advisors who match the selected provinces
            _.forEach(service.selectedFilters.province, function(selectedProvince, index) {
                if (selectedProvince.label === advisor.partialBranchInfo.provinceAbbr) {
                    //Advisor's province matches atleast one of the selected province filter
                    ret = true;
                    //break out of forEach
                    return false;
                }
            });
            return ret;
        }

        //options to display in the language filter select
        service.filterOptions = {
            lang: FILTERS.lang.options,
            province: FILTERS.province.options
        };
        function formatForMultiSelect(dataArray) {

            var x = _.map(dataArray, function(obj,key){
                console.log('obj: ', obj);
                console.log('key: ', key);
                return {
                    label: obj
                };
            });
            console.log('x: ', x);
            return x;
        }
        /* values of active filters */
        service.selectedFilters = {
            lang: null,
            province: null
        };
        //array indicating which filters are to be applied.
        service.activeFilters = [];
        /*
            Array of advisors that match search criteria.
         */
        service.filterRunnerService.allData = [];

        //Subset of service.filterRunnerService.allData that passes filters.
        service.filteredSearchResults = [];
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
        service.objectName = 'filteredSearchResults'; //this string should be the same as the property holding your whole array of data.

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
            Function to find advisors matching search logic and add them to the service.filterRunnerService.allData array.
            Note: service.filterRunnerService.allData array will be emptied when this function is called, and then new matching advisors will be added.
         */
        service.search = search;

        //Function to sort service.filterRunnerService.allData
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
            if (service.mobileMaxNumDisplay < (service.filterRunnerService.allData.length - service.numPerPage) ) {
                service.mobileMaxNumDisplay += service.numPerPage;
            //There are not enough search results to increase the mobileMaxNumDisplay by the default, therefore just make it the same as the number of results.
            } else {
                service.mobileMaxNumDisplay = service.filterRunnerService.allData.length;
            }
        }

        //Load all advisors from backend
        function init() {
            //clear allAdvisors
            service.allAdvisors = [];

            //make http call for all advisors.
            return server.get(BASE_URL + ENDPOINT_URI + '/advisors', false, 'localStorage', false).then(function(data) {
                //all advisors have been retrieved. Dissable isLoading.

                //precompute names with punctuation, spacing and accents removed. This will speed up searches later.
                _.forEach(data.data, function(advisor, index){

                    var commonName = advisor.commonName ? removeDiacriticsService.remove(advisor.commonName).toLowerCase() : null;
                    var firstName = removeDiacriticsService.remove(advisor.firstName).toLowerCase();
                    var lastName = removeDiacriticsService.remove(advisor.lastName).toLowerCase();
                    var cName = stripPunctuation(commonName);
                    var fName = stripPunctuation(firstName);
                    var lName = stripPunctuation(lastName);

                    var cNameArr = cName ? cName.split(' ') : [];
                    var lNameArr = lName.split(' ');
                    var fNameArr = fName.split(' ');
                    //this section will make each name unique if advisors have the same name twice in their name, ie. "Jean paul Jean"
                    //I don't think we currently have anyone like this though.
                    _.forEach(cNameArr, function(cName, i){
                        for (var z = 0; z < i; z++) {
                            if (cNameArr[z] === cName) {
                                cNameArr[i] = cNameArr[i] + "0";
                                break;
                            }
                        }
                    });

                    _.forEach(lNameArr, function(lName, i){
                        for (var z = 0; z < i; z++) {
                            if (lNameArr[z] === lName) {
                                lNameArr[i] = lNameArr[i] + "0";
                                break;
                            }
                        }
                    });

                    _.forEach(fNameArr, function(fName, i){
                        for (var z = 0; z < i; z++) {
                            if (fNameArr[z] === fName) {
                                fNameArr[i] = fNameArr[i] + "0";
                                break;
                            }
                        }
                    });

                    data.data[index].cNameArr = cNameArr;
                    data.data[index].lNameArr = lNameArr;
                    data.data[index].fNameArr = fNameArr;
                });
                //Store all advisors.
                service.allAdvisors = data.data;

                service.isLoading = false;
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
                service.filterRunnerService.allData.sort(compareFirstname);
            //sort by last name.
            } else if (sortOption === service.sortableColumns[1]) {
                service.filterRunnerService.allData.sort(compareLastname);
            //sort by city.
            } else if (sortOption === service.sortableColumns[2]) {
                service.filterRunnerService.allData.sort(compareCity);
            //sort by province.
            } else if (sortOption === service.sortableColumns[3]){
                service.filterRunnerService.allData.sort(compareProvince);
            }
        }
        //we want to group all the single letter characters at the end.
        function singleLetterComparator(a,b) {
            if (a.length === 1) {
                return -1;
            } else if (b.length === 1) {
                return 1;
            } else {
                return 0;
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

            service.filteredSearchResults = [];
            service.filterRunnerService.allData = [];
            secondaryResults = [];
            //remove punctuation, accents and multispaces.
            service.searchPhrase = stripPunctuation(removeDiacriticsService.remove(searchTerm.replace(/ +(?= )/g,'')));
            //split the searchTerm into an array of words
            var subTerms = service.searchPhrase.toLowerCase().split(' ');
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
                var tempSearchTerm = service.searchPhrase.toLowerCase();
                /*
                loop through all advisors and see if either their:
                    1. firstName + " " + lastName combination, with accents/punctuation, and capitalization removed, matches the searchTerm.
                    2. commonName + " " + lastName combination, with accents/punctuation, and capitalization removed, matches the searchTerm.
                 */
                _.forEach(service.allAdvisors, function(advisor, index) {
                    containsSearch(advisor.cNameArr, advisor.fNameArr, advisor.lNameArr,  subTerms, index);
                });
                if (service.filterRunnerService.allData.length === 0) {
                    service.filterRunnerService.allData = secondaryResults;
                }
            } else {
                //none of the search functions were invoked, thus searchTerm must be too short.
                service.searchTermTooShort = true;
            }

            //reset sort order to default. Note: the default sort order is Ascending, but we set it to false because the sortby function will toggle it.
            sortAscending = false;

            //sort searchResults and update the pagination/infinite scroll related trackers(maxPages, mobileMaxNumDisplay, currentPage).
            sortBy('lastname');
            //service.filter();

            service.filteredSearchResults = service.filterRunnerService.filter();
            updatePaginationInfiniteScroll();
        }

        /*
            alreadyMatched only applies to single characters. This ensures we aren't matching the same word again different single character search terms.
            For example searching "a a" should find writers who have atleast two names that start with a.
            Only show writers with one name that starts with a if there are no writers with two names that start with a.
            A partial search term and a single character search term can still match on the same word. Will need maximum matching bipartite graph algorithm to solve that.
         */
        function termComparator(name, searchTerm, alreadyMatched) {
            if (searchTerm.length === 1) {
                if (alreadyMatched.indexOf(name) < 0) {
                    if (name.substring(0, 1) === searchTerm) {
                        alreadyMatched.push(name);
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            } else {
                return name.indexOf(searchTerm) >= 0;
            }
        }

        function containsSearch(cNameArr, fNameArr, lNameArr, searchTerms, index) {
            var showCommon = false;

            var alreadyMatched = [];
            var remainingSearchTerms = [];
            var partialMatch = false;
            var numMatchedSearchTerms = 0;
            _.forEach(searchTerms, function(searchTerm, searchIndex) {
                _.forEach(lNameArr, function(lName){
                    if (termComparator(lName, searchTerm, alreadyMatched)) {
                        partialMatch = true;
                        numMatchedSearchTerms++;
                    } else {
                        remainingSearchTerms.push(searchTerm);
                    }
                });
            });
            var countMatches = 0;
            if (numMatchedSearchTerms === searchTerms.length) {
                service.allAdvisors[index].showCommon = false;
                service.filterRunnerService.allData.push(service.allAdvisors[index]);
                return;
            }
            if (remainingSearchTerms.length) {
                _.forEach(remainingSearchTerms, function (searchTerm, searchIndex) {
                    _.forEach(cNameArr, function (commonName) {
                        if (termComparator(commonName, searchTerm, alreadyMatched)) {
                            partialMatch = true;
                            countMatches++;
                            showCommon = true;
                        }
                    });
                });
                if (countMatches === remainingSearchTerms.length) {
                    if (remainingSearchTerms.length !== 0) {
                        service.allAdvisors[index].showCommon = true;
                    } else {
                        service.allAdvisors[index].showCommon = false;
                    }
                    service.filterRunnerService.allData.push(service.allAdvisors[index]);
                    return;
                }
                countMatches = 0;
                _.forEach(remainingSearchTerms, function (searchTerm, searchIndex) {
                    _.forEach(fNameArr, function (firstName, searchIndex) {
                        if (termComparator(firstName, searchTerm, alreadyMatched)) {
                            partialMatch = true;
                            countMatches++;
                        }
                    });
                });
                if (countMatches === remainingSearchTerms.length) {
                    service.allAdvisors[index].showCommon = false;
                    service.filterRunnerService.allData.push(service.allAdvisors[index]);
                    return;
                }
            }
            if (partialMatch) {
                service.allAdvisors[index].showCommon = showCommon;
                secondaryResults.push(service.allAdvisors[index]);
            }
        };

        //update the pagination/infinite scroll related trackers(maxPages, mobileMaxNumDisplay, currentPage).
        function updatePaginationInfiniteScroll() {
            service.maxPages = Math.ceil(service.filterRunnerService.allData.length / service.numPerPage);
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
                    service.filterRunnerService.allData.push(advisor);
                //check if firstName CONTAINS the searchTerm
                } else if(firstName.indexOf(searchTerm) >= 0 || fName.indexOf(searchTerm) >= 0) {
                    service.allAdvisors[index].showCommon = false;
                    advisor.showCommon = false;
                    service.filterRunnerService.allData.push(advisor);
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
                    service.filterRunnerService.allData.push(advisor);
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
