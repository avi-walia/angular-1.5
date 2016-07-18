(function () {
    'use strict';

    var errorsCacheKey = 'errors',
       // emptyHttpErrorMessageObj = {},
       // emptyFeMessageMessageObj = {},
    // holds cached errors object
        errorsCacheMap;
    // holds app errors object


    angular
        .module('aio.core.main')
        .constant('NOTES_EVENTS', {
            all: 'notification-update',
            http: 'notification-http-error-update',
            fe: 'notification-fe-update'
        })
        .service('NotificationService', notifications);

    notifications.$inject = [
        '$rootScope',
        'NOTES_EVENTS',
        'notificationsCacheService',
        '$anchorScroll'
    ];

    /* @ngInject */
    function notifications($rootScope, NOTES_EVENTS, notificationsCacheService, $anchorScroll) {
        var service = this;

        service.messages = {
            httpErrorMessages: {},
            FeMessages: {}
        };
        $anchorScroll.yOffset = 99;
        //service.subscribe = subscribe;

        //service.getAll = getAllErrorMessages;
        service.getHttpErrors = getHttpErrorMessages;
        service.getFEs = getFEs;

        service.setHttpError = function (key, value) {
            set(NOTES_EVENTS.http, key, value);
            $rootScope.$emit('dismissFYI');

        };
        service.setFE = function (key, value) {          
            set(NOTES_EVENTS.fe, key, value);
            $rootScope.$emit('dismissFYI');

        };

        service.delete = function () {
            remove(NOTES_EVENTS.all);
        };
        service.deleteHttpErrors = function (key) {
            remove(NOTES_EVENTS.http, key);
        };
        service.deleteFEs = function (key) {
            remove(NOTES_EVENTS.fe, key);
        };

        service.isEmpty = isEmpty;

        init();

        //---------------- implementation starts here ---------------- //

        /*function publish(event) {
            $rootScope.$emit(event);
        }*/

        /*function subscribe(scope, callback) {
            var handlerAll = scope.$on(NOTES_EVENTS.all, callback),
                httpErrorHandler = $rootScope.$on(NOTES_EVENTS.http, callback),
                feHandler = $rootScope.$on(NOTES_EVENTS.fe, callback);

            scope.$on('$destroy', handlerAll);
            scope.$on('$destroy', httpErrorHandler);
            scope.$on('$destroy', feHandler);
        }*/

        /**
         * initialize cached errors object
         */
        function init() {
            // is it already cached ? Then, use it.
            errorsCacheMap = notificationsCacheService.get(errorsCacheKey);
            if (_.isUndefined(errorsCacheMap)) {
                // OR initialize it to default app errors object
                notificationsCacheService.put(errorsCacheKey, service.messages);
            } else {
                // update app errors obj to cached value
                service.messages = errorsCacheMap;
            }
            //publish(NOTES_EVENTS.all);
        }

        function getHttpErrorMessages() {
            // load error list from cache
            errorsCacheMap = notificationsCacheService.get(errorsCacheKey);
            // update app errors obj to cached value
            service.messages.httpErrorMessages = errorsCacheMap.httpErrorMessages;

            return service.messages.httpErrorMessages;
        }

        function getFEs() {
            // load error list from cache
            errorsCacheMap = notificationsCacheService.get(errorsCacheKey);
            // update app errors obj to cached value
            service.messages.FeMessages = errorsCacheMap.FeMessages;

            return service.messages.FeMessages;
        }

        function set(event, key, value) {
            console.log('Notifications, SET TO CACHE:', event, key, value);
            // load error list from cache
            errorsCacheMap = notificationsCacheService.get(errorsCacheKey);

            // update app & cached errors object
            switch (event) {
                case NOTES_EVENTS.http:
                    errorsCacheMap.httpErrorMessages[key] = service.messages.httpErrorMessages[key] = value;
                    break;
                case NOTES_EVENTS.fe:
                    errorsCacheMap.FeMessages[key] = service.messages.FeMessages[key] = value;
                    break;
            }

            // add error to caches to persist a page refresh
            notificationsCacheService.put(errorsCacheKey, errorsCacheMap);
            //publish(event);

            //scroll to the notification

            $anchorScroll('notifications');


        }

        function remove(event, key) {
            console.log('Notifications, REMOVE FROM CACHE:', event);

            // load error list from cache
            errorsCacheMap = notificationsCacheService.get(errorsCacheKey);

            if (angular.isUndefined(errorsCacheMap)) {
                console.error('errorsCacheMap is undefined.');
            }
            // empty app & cached errors object
            switch (event) {
                case NOTES_EVENTS.http:
                    if(_.isUndefined(key)) {
                        if(!_.isUndefined(errorsCacheMap)) {
                            errorsCacheMap.httpErrorMessages = {};
                        }
                        service.messages.httpErrorMessages = {};
                    }
                    else{
                        if (angular.isUndefined(errorsCacheMap)){
                            console.error('Cannot delete httpErrorMessages');
                            console.error('Did you just delete the localStorage or sessionStorage?');
                            console.error('If so, hard reload browser.');
                        }
                        delete  errorsCacheMap.httpErrorMessages[key];
                        delete  service.messages.httpErrorMessages[key];
                    }
                    break;
                case NOTES_EVENTS.fe:
                    if(_.isUndefined(key)) {
                        if(!_.isUndefined(errorsCacheMap)) {
                            errorsCacheMap.FeMessages = {};
                        }
                         service.messages.FeMessages = {};
                    }
                    else{
                        delete  errorsCacheMap.FeMessages[key];
                        delete  service.messages.FeMessages[key];
                    }
                    break;
                case NOTES_EVENTS.all:
                    /*errorsCacheMap = service.messages = {
                        httpErrorMessages: emptyHttpErrorMessageObj,
                        FeMessages: emptyFeMessageMessageObj
                    };*/
                    if(!_.isUndefined(errorsCacheMap)) {
                        errorsCacheMap.httpErrorMessages = {};
                        errorsCacheMap.FeMessages = {};
                    }
                   service.messages.httpErrorMessages = {};
                   service.messages.FeMessages = {};

                    break;
            }

            // add error to caches to persist a page refresh
            notificationsCacheService.put(errorsCacheKey, errorsCacheMap);
            //publish(event);
        }

        function isEmpty(val) {
            if (angular.isUndefined(val)) {
                if (_.isEmpty(service.messages.httpErrorMessages) && _.isEmpty(service.messages.FeMessages)) {
                    return true;
                } else {
                    return false;
                }
            }
            else{
                if(_.isEmpty(val)){
                    return true;
                }
                else{
                    return false;
                }
            }
        }

        //function getAllErrorMessages() {
        //    // load error list from cache
        //    errorsCacheMap = notificationsCacheService.get(errorsCacheKey);
        //    // update app errors obj to cached value
        //    messages.httpErrorMessages = errorsCacheMap.httpErrorMessages;
        //    messages.FeMessages = errorsCacheMap.FeMessages;
        //
        //    return messages;
        //}

    }

})();
