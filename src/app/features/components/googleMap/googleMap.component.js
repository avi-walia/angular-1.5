
(function () {
    'use strict';

    angular
        .module('advisorLocator')
        .component('googleMap', {
            controller: googleMapCtrl,
            bindings: {
                onUpdateMarkers: '&?', /*will be used only for branch locations search*/
                markerList: '<?', /*will be used only for branch locations search*/
                locationList: '<?', /*will be used only for branch locations search*/
                position: '<?', /*will be used only for branch location search*/
                userMarker: '<?', /*{geoLocation: {lat: number, lng: number}, zoom: number}*/
                address: '<?', /*physical address of the marker (separate values by comma followed by space)*/
                location: '<?' /*used for get direction on the map*/
            },
            templateUrl:'app/features/components/googleMap/googleMap.tpl.html'
        });


    /* @ngInject */

    googleMapCtrl.$inject = [
        '$rootScope',
        '$scope',
        'pageStateResolver',
        'detectMobile',
        '$q',
        '$timeout',
        '$window',
        '$translate'
    ];
    /* @ngInject */
    function googleMapCtrl( $rootScope, $scope, pageStateResolver, detectMobile, $q, $timeout, $window, $translate
    ) {
        var vm = this;

        vm.pageStateResolver = pageStateResolver;
        vm.detectMobile = detectMobile;
        vm.lang = $rootScope.documentLanguage;
        vm.loadParameters = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD6y9w2sHNaVOAQN3ESPmYe_tSxCBE6d-Q&libraries=geometry,places&language='+vm.lang;
        vm.pathToIcon = 'assets/images/blue-marker.png';
        vm.linkToMap = 'https://www.google.com/maps/dir/';
        vm.from = '';
        vm.to = '';

        //https://www.google.com/maps/dir/760+West+Genesee+Street+Syracuse+NY+13204/314+Avery+Avenue+Syracuse+NY+13204?hl=en
        //https://maps.google.com?saddr=760+West+Genesee+Street+Syracuse+NY+13204&daddr=314+Avery+Avenue+Syracuse+NY+13204?hl=en


        vm.ca = {
            center: {lat: 60.5, lng: -101.0},
            zoom: 3,
            mapTypeControl: false,
            panControl: false,
            streetViewControl: false,
            zoomControl: false,
            draggable: true
        };

        vm.isLoading = true;

        vm.userLocationMarker = null;
        vm.markers = [];
        vm.infoWindow = new google.maps.InfoWindow({
            content: document.getElementById('info')
        });
        vm.markerInfo = null;
        vm.updateSearch = false;
        vm.dragEndEvent = false;

        vm.mapLoadedDeferred = $q.defer();



        vm.updateMarkers = updateMarkers;
        vm.onUserEvent = onUserEvent;
        vm.onDragEvent = onDragEvent;
        vm.setUserLocationMarker = setUserLocationMarker;
        vm.createMarkers = createMarkers;
        vm.clearMarkers = clearMarkers;
        vm.showInfoWindow = showInfoWindow;
        vm.initializeMap = initializeMap;

        function ZoomControl(controlDiv, map) {

            // Creating divs & styles for custom zoom control
            controlDiv.style.padding = '5px';

            // Set CSS for the control wrapper
            var controlWrapper = document.createElement('div');
            controlWrapper.style.backgroundColor = 'white';
            controlWrapper.style.borderStyle = 'solid';
            controlWrapper.style.borderColor = 'gray';
            controlWrapper.style.borderWidth = '1px';
            controlWrapper.style.cursor = 'pointer';
            //controlWrapper.style.textAlign = 'right';
            controlWrapper.style.width = '32px';
            controlWrapper.style.height = '64px';
            controlWrapper.style.float = 'right';
            controlWrapper.setAttribute("id", "test");
            controlWrapper.setAttribute("class", "gmnoprint gm-bundled-control gm-bundled-control-on-bottom");
            controlWrapper.setAttribute("draggable", "false");
            controlWrapper.setAttribute("controlwidth", "28");
            controlWrapper.setAttribute("controlheight", "55");
            controlWrapper.style.margin= '10px';
            controlWrapper.style['-webkit-user-select'] = 'none';
            controlWrapper.style.position = "absolute'"
            controlWrapper.style.bottom = "69px;"
            controlWrapper.style.right = "28px;"

            controlWrapper.setAttribute("id", "test");
            controlDiv.appendChild(controlWrapper);

            // Set CSS for the zoomIn
            var zoomInButton = document.createElement('button');
            zoomInButton.style.width = '32px';
            zoomInButton.style.height = '32px';
            zoomInButton.style['background-size'] = '100% 100%';
            /* Change this to be the .png image you want to use */
            //zoomInButton.style.backgroundImage = 'url("assets/images/BoxedPlusSign.gif")';
            zoomInButton.innerHTML = "+";
            zoomInButton.style['background-color'] = "white";
            zoomInButton.style['font-size'] = "200%";
            zoomInButton.style['font-weight'] = "bold";
            controlWrapper.appendChild(zoomInButton);

            // Set CSS for the zoomOut
            var zoomOutButton = document.createElement('button');
            zoomOutButton.style.width = '32px';
            zoomOutButton.style.height = '32px';
            /* Change this to be the .png image you want to use */
            //zoomOutButton.style.backgroundImage = 'url("assets/images/minus-sign.png")';
            zoomOutButton.innerHTML = "-";
            zoomOutButton.style['background-color'] = "white";
            zoomOutButton.style['font-size'] = "200%";
            zoomOutButton.style['font-weight'] = "bold";
            controlWrapper.appendChild(zoomOutButton);
            zoomInButton.setAttribute('aria-label', 'zoom in');
            zoomOutButton.setAttribute('aria-label', 'zoom out');

            // Setup the click event listener - zoomIn
            google.maps.event.addDomListener(zoomInButton, 'click', function() {
                vm.map.setZoom(vm.map.getZoom() + 1);
            });

            // Setup the click event listener - zoomOut
            google.maps.event.addDomListener(zoomOutButton, 'click', function() {
                vm.map.setZoom(vm.map.getZoom() - 1);
            });

        }



        function initializeMap(){
            var deferred = $q.defer();

            vm.map = new google.maps.Map(document.getElementById('map'), vm.ca);

            var zoomControlDiv = document.createElement('div');
            var zoomControl = new ZoomControl(zoomControlDiv, map);

            //zoomControlDiv.index = 1;
            vm.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(zoomControlDiv);
            console.log('google.map.controls: ', vm.map.controls);
            console.log('index: ', google.maps.ControlPosition);

            vm.map.addListener('idle', vm.onDragEvent);
            vm.map.addListener('dragend', function(){
                vm.dragEndEvent = true;
            });
            vm.map.addListener('zoom_changed', vm.onUserEvent);
            //vm.map.addListener('idle', vm.onUserEvent);
            google.maps.event.addListenerOnce(vm.map, 'tilesloaded', function(){
                vm.mapLoadedDeferred.resolve(vm.map);
                //document.getElementById('map').children[0].children[0].children[9].children[0].children[0].children[0].getElementsByTagName('img')[0].setAttribute("aria-label", $translate.instant('zoomIn'));
                //document.getElementById('map').children[0].children[0].children[9].children[0].children[0].children[2].getElementsByTagName('img')[0].setAttribute("aria-label", $translate.instant('zoomOut'));

            });
            vm.isLoading = false;
            $scope.$emit('mapIsInitialized', {map: vm.map}); // may should go under the talesloaded event?
            var test = function() {
                try {
                    var x = document.getElementById('map').children[0].children[0].children[1].children[0].children[0].children[0];
                    console.log('x: ', x);
                    if (!x || x.length === 0) {
                        $timeout(test, 50);
                    } else {
                        x.setAttribute('alt', 'Google Logo');
                    }
                } catch (Ex) {
                    $timeout(test, 50);
                }
            }
            $timeout(test, 50);
            deferred.resolve(vm.map);
            return deferred.promise;
        }




        vm.$onInit = function(){

            if(!vm.map){
                vm.initializeMap().then(function(){
                    if (vm.userMarker) {
                        initStaticCardMap();
                    }

                });
            }
            else{
                if (vm.userMarker) {
                    initStaticCardMap();
                }

            }

        };



        vm.$onChanges = function(changes){
            if(!vm.map){
                vm.initializeMap().then(function () {
                    if (changes.position) {
                        vm.updateSearch = false;
                        vm.position = angular.copy(changes.position.currentValue);
                      //  console.log('position on change', vm.position.lat());
                      //  console.log('position on change', vm.position.lng());
                        if (!_.isEmpty(vm.position)) {
                            var LatLng =  new google.maps.LatLng(vm.position.location.lat(), vm.position.location.lng());
                            if(vm.position.viewport){

                                console.log('viewport', vm.position.viewport);
                                vm.mapLoadedDeferred.promise.then(function(){

                                    vm.map.fitBounds(parseBounds(vm.position.viewport));
                                    vm.setUserLocationMarker(LatLng);
                                    if(vm.map.getZoom() > 13){
                                        vm.map.setZoom(13);
                                    }

                                    search(LatLng);
                                    vm.updateSearch = true;
                                });
                            }
                            else {
                                vm.mapLoadedDeferred.promise.then(function(){
                                    vm.map.panTo(LatLng);
                                    vm.map.setZoom(13);
                                    vm.setUserLocationMarker(LatLng);
                                    search(LatLng);
                                    vm.updateSearch = true;
                                });
                            }


                        }
                        else {
                            vm.setUserLocationMarker(null);
                            vm.map.setCenter({lat: 60.5, lng: -101.0});
                            vm.map.setZoom(3);
                        }

                    }
                    if (changes.locationList) {

                        vm.locationList = angular.copy(changes.locationList.currentValue);
                    }

                    if (changes.markerList) {

                        vm.markerList = angular.copy(changes.markerList.currentValue);
                        vm.clearMarkers();
                        console.log('marker list update', vm.markerList);
                        if (!_.isEmpty(vm.markerList)) {

                            vm.createMarkers();

                        }

                    }
                });
            }
            else{
                if (changes.position) {
                    vm.updateSearch = false;
                    vm.position = angular.copy(changes.position.currentValue);
                   // console.log('position on change', vm.position.lat());
                   // console.log('position on change', vm.position.lng());
                    if (!_.isEmpty(vm.position)) {
                        var LatLng =  new google.maps.LatLng(vm.position.location.lat(), vm.position.location.lng());
                        if(vm.position.viewport){
                          //  vm.mapLoadedDeferred.promise.then(function(){
                                vm.map.fitBounds(vm.position.viewport);
                                vm.setUserLocationMarker(LatLng);
                                if(vm.map.getZoom() > 13){
                                    vm.map.setZoom(13);
                                }
                                search(LatLng);
                                vm.updateSearch = true;
                          //  });
                        }
                        else{
                           // vm.mapLoadedDeferred.promise.then(function(){
                                vm.map.panTo(LatLng);
                                vm.map.setZoom(13);
                                vm.setUserLocationMarker(LatLng);
                                search(LatLng);
                                vm.updateSearch = true;
                          //  });
                        }

                    }
                    else {
                        vm.setUserLocationMarker(null);
                        vm.map.setCenter({lat: 60.5, lng: -101.0});
                        vm.map.setZoom(3);
                    }

                }
                if (changes.locationList) {

                    vm.locationList = angular.copy(changes.locationList.currentValue);
                }

                if (changes.markerList) {

                    vm.markerList = angular.copy(changes.markerList.currentValue);
                    vm.clearMarkers();
                    console.log('marker list update', vm.markerList);
                    if (!_.isEmpty(vm.markerList)) {

                        vm.createMarkers();

                    }

                }
            }

        };

        vm.$onDestroy = function(){
            vm.infoWindow.close();
            if(vm.markerInfo){
                vm.markerInfo = null;
            }
            if (vm.userLocationMarker){
                vm.userLocationMarker.setMap(null);
                vm.userLocationMarker = null;
            }
            vm.clearMarkers();
            window.google = {};
        };

        var infoWindow = $rootScope.$on('infoWindow', function(event, param){
            console.log('call info window', param.id);
            vm.markerInfo = _.find(vm.markers, {'id': param.id});
            console.log(vm.markerInfo);
            if(vm.markerInfo){
                google.maps.event.trigger(vm.markerInfo, 'click');
            }
        });
        $scope.$on('$destroy', infoWindow);



        function initStaticCardMap(){

            var promises = [];
            var translation = {};

            var LatLng = new google.maps.LatLng(vm.userMarker.geoLocation.lat, vm.userMarker.geoLocation.lng);
            vm.map.setCenter(LatLng);
            vm.map.setZoom(vm.userMarker.zoom);
            vm.setUserLocationMarker(LatLng);
            if (vm.address && vm.address !== '') {
                vm.to = vm.address.replace(/, /g, '+').replace(/\s/g, '+');
            }
            if (vm.location && vm.location !== ''){
                vm.from = vm.location.replace(/, /g, '+').replace(/\s/g, '+');
                console.log('GOOGLE LINK: ' + vm.linkToMap + vm.from + '/' + vm.to + '?hl=' + vm.lang);
                translation.link = vm.linkToMap + vm.from + '/' + vm.to + '?hl=' + vm.lang;
            }
            else {
              var fromPromise =  $translate('branchList.currentLocation');
                promises.push(fromPromise);

                fromPromise.then(function (current) {
                    vm.from = current;
                    console.log('GOOGLE LINK: ' + vm.linkToMap + vm.from + '/' + vm.to + '?hl=' + vm.lang);
                    translation.link = vm.linkToMap + vm.from + '/' + vm.to + '?hl=' + vm.lang;
                });
            }

            var titlePromise = $translate('branchList.linkToMap');
                promises.push(titlePromise);
                titlePromise.then(function (title){
                    translation.title = title;
                });

            $q.all(promises).then(function(){
                var centerControlDiv = document.createElement('div');
                var centerControl = new CenterControl(centerControlDiv, translation);

                centerControlDiv.index = 1;
                vm.map.controls[google.maps.ControlPosition.TOP_LEFT].push(centerControlDiv);
            });


        }

        function CenterControl(controlDiv, translation) {

            // Set CSS for the control border.
            var controlUI = document.createElement('div');
            controlUI.style.backgroundColor = '#fff';
            controlUI.style.border = '2px solid #fff';
            controlUI.style.borderRadius = '3px';
            controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
            controlUI.style.cursor = 'pointer';
            controlUI.style.marginBottom = '10px';
            controlUI.style.textAlign = 'center';
            controlUI.title = translation.title;
            controlDiv.appendChild(controlUI);

            // Set CSS for the control interior.
            var controlText = document.createElement('div');
            controlText.style.color = 'rgb(25,25,25)';
            controlText.style.fontFamily = 'Roboto, Arial,sans-serif';
            controlText.style.fontSize = '14px';
            controlText.style.lineHeight = '28px';
            controlText.style.paddingLeft = '5px';
            controlText.style.paddingRight = '5px';
            //controlText.innerHTML = "<button style='background-color:#fff;border:none;'>" +translation.title + "</button>";
            controlText.innerHTML = "<a id='getDirections' href='" + translation.link + "' target='_blank'>" +translation.title + "</a>";
            controlUI.appendChild(controlText);
        }

        function parseBounds(viewport) {
            var sw = {};
            var ne = {};
            sw =  new google.maps.LatLng(parseFloat(viewport.f.b), parseFloat(viewport.b.b));
            ne = new google.maps.LatLng(parseFloat(viewport.f.f), parseFloat(viewport.b.f));

            var bounds = new google.maps.LatLngBounds(sw,ne);


            return bounds;
        }



        function onUserEvent(){
            if(vm.userLocationMarker && vm.updateSearch){
                search(vm.userLocationMarker.getPosition());
            }
        }

        function onDragEvent(){
            if(vm.dragEndEvent){
                vm.dragEndEvent = false;
                onUserEvent();
            }
        }

        function updateMarkers(list){
            vm.onUpdateMarkers({markers: list});

        }

        function setUserLocationMarker(LatLng){
            if (vm.userLocationMarker){
                vm.userLocationMarker.setMap(null);
                vm.userLocationMarker = null;
            }
            if(LatLng) {
                if(vm.userMarker){
                    vm.userLocationMarker = new google.maps.Marker({
                        position: LatLng,
                        map: vm.map,
                        icon: vm.pathToIcon
                    });
                }
                else{
                    vm.userLocationMarker = new google.maps.Marker({
                        position: LatLng,
                        map: vm.map
                    });
                }
            }

        }


        function clearMarkers(){
            _.forEach(vm.markers, function(value, key){
                if(vm.markers[key]){
                    vm.markers[key].setMap(null);
                }

            });
            vm.markers = [];
        }

        function createMarkers(){
            _.forEach(vm.markerList, function(value, key){
                vm.markers[key] = new google.maps.Marker({
                    position: vm.markerList[key].geoLocation,
                    icon: vm.pathToIcon
                });
                vm.markers[key].customInfo = vm.markerList[key].address;
                vm.markers[key].id = vm.markerList[key].id;
                google.maps.event.addListener(vm.markers[key], 'click', vm.showInfoWindow);
                vm.markers[key].setMap(vm.map);
            });
        }

        function showInfoWindow(){
            vm.markerInfo = this;
            setVisibility();
            $timeout(function() {
                vm.infoWindow.open(vm.map, vm.markerInfo);
            });
        }

        function setVisibility(){
            _.forEach(vm.markers, function(value, key){
                vm.markers[key].visible = false;
            });
            vm.markerInfo.visible = true;
        }


        function search(currentPosition){
            console.log('currentPosition lat', currentPosition.lat());
            console.log('currentPosition lng', currentPosition.lng());

            var filteredList = filterMarkers(currentPosition);
            vm.updateMarkers(filteredList);
        }

        function filterMarkers(currentPosition){

            var bounds = vm.map.getBounds();
            var counter = 0;

            var sortedList = sortMarkers(currentPosition);
            var filteredList = isContain(sortedList, bounds);

            if(filteredList.length === 0 && !vm.updateSearch){
                bounds.extend(sortedList[0].LatLng); //get the first closest
                vm.map.fitBounds(bounds);
                vm.map.setCenter(bounds.getCenter());
                filteredList = isContain(sortedList, vm.map.getBounds());
                console.log('newFilteredList');
                console.log(filteredList);
            }


            return filteredList;
        }

        function sortMarkers(currentPosition){
            var sortedList = [];
            var LatLng = {};

            _.forEach(vm.locationList, function(value, key){
                LatLng = new google.maps.LatLng(vm.locationList[key].geoLocation.lat, vm.locationList[key].geoLocation.lng);
                sortedList.push(vm.locationList[key]);

                sortedList[key].distance = _.round(google.maps.geometry.spherical.computeDistanceBetween(LatLng, currentPosition) / 1000, 1);
                sortedList[key].LatLng = LatLng;
            });

            sortedList = _(sortedList)
                .orderBy('distance', 'asc')
                .value();


            return sortedList;
        }

        function isContain(sortedList, bounds){
            var filteredList = [];

            _.forEach(sortedList, function(value, key){
                if(bounds.contains(sortedList[key].LatLng)){
                    filteredList.push(sortedList[key]);
                }
            });


            console.log('filteredList');
            console.log(filteredList);

            return filteredList;
        }
    }

})();





