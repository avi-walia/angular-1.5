(function () {
  'use strict';
    angular.module('advisorLocator.utils')
      .directive('ciSortableHeader', ciSortableHeaderDirective);

  function ciSortableHeaderDirective() {
       return {
         restrict: 'A',
         scope: {},
         bindToController: {
            columnsData: '=',
            sortedData: '=',
            pagedResults:'=?',
            paginate:'=?'
         },
         replace: true,
         templateUrl: 'app/utils/directives/ci-sortable/ci-sortable.directive.tpl.html',
         controllerAs: 'ctrl',
         controller: CiSortableHeaderController
       };
  }
    CiSortableHeaderController.$inject = [];
    /* @ngInject */
    function CiSortableHeaderController() {
        var vm = this;
        vm.sort = sort;
        function sort(val) {
            var order = findOrder(vm.columnsData, val);
            vm.sortedData = _.orderBy(vm.sortedData, val, order);
            if (vm.pagedResults && vm.paginate) {
                vm.pagedResults = vm.paginate(vm.sortedData);
            }
        }

        var sortedColumn = findSortedColumn(vm.columnsData);
        // console.log('sortedColumn: ',sortedColumn);
        if (sortedColumn) {
            vm.sort(sortedColumn);
        }




        function findOrder(data, val) {
            var order = 'asc';
            _.forEach(data, function(value){
                if(value.property === val){
                    //value.sorted = !value.sorted;
                    //value.class = value.sorted ? 'sortasc' : 'sortdesc';
                    // console.log('value.sorted: ', value.sorted);
                    if (value.class === 'sortasc') {
                        order = 'desc';
                        value.class = 'sortdesc';
                    } else {
                        order = 'asc';
                        value.class = 'sortasc';
                    }
                }
                else{
                    if(value.sortable){
                        value.class = 'sortable';
                    }
                }
            });
            return order;
        }
        function findSortedColumn(data) {
            var column = null;
            _.forEach(data, function(value){
                if (value.class === 'sortasc' || value.class === 'sortdesc') {
                    value.class = value.class === 'sortdesc' ? 'sortasc' : 'sortdesc';
                    column =  value.property;
                }
            });

            return column;
        }

    }

})();