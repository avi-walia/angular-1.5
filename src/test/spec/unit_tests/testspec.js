describe('example test', function() {
    it('should be true', function() {
        expect('foo').toBe('foo');
    });
});



(function () {
    describe('dataCacheSessionStorage', function () {

        beforeEach(angular.mock.module('aio.utils'));
        //Don't need to mock moment as it's not one of our functions
        var screenSize;
        beforeEach(function() {
            module(function($provide) {
               $provide.service('$window', function(){
                  this.alert
               });
            });
        });

    });
})();




