
(function () {
    'use strict';

    angular
        .module('advisorLocator.core.main')
        .component('ciValidation', {
            bindings: {
                messageObject: '<'
            },
            controller: validationCtrl,
            templateUrl:'app/core/components/validation/validation.tpl.html'
        });


    /* @ngInject */

    validationCtrl.$inject = [

    ];
    /* @ngInject */
    function validationCtrl(
    ) {
        var vm = this;

        vm.isEmpty = isEmpty;


        vm.$onChanges = function(changes){

            if(changes.messageObject) {

                vm.messageObject = angular.copy(vm.messageObject);
                vm.messageObject = angular.copy(changes.messageObject.currentValue);

            }
        };

        function isEmpty(val){
            if(_.isEmpty(val)){
                return true;
            }
            else{
                return false;
            }
        }

    }

})();
