var advisorList30610 = ({ id: 30610, firstName: 'Lorea', commonName: 'Lorea', lastName: 'Declercq', titlesEN: [  ], titlesFR: [  ], designationsEN: [ 'CFP<sup>&reg;</sup>', 'EPC' ], designationsFR: [ 'CFP<sup>MC</sup>', 'EPC' ], spokenLanguage: 'English', profilePictureUrl: 'http://dev.assante.com/advisors/pmacrae/images/images/DeClercq Lorea Bio.jpg', phone: '', email: 'ldeclercq@assante.com', styleNameEN: null, styleNameFR: null, website: '', partialBranchInfo: Object({ id: 5410, dealerShip: 'AFM', geoLocation: Object({ lng: -123.115952, lat: 49.285248, _persistence_fetchGroup: null }), address1: '800 West Pender Street', address2: 'Suite 1600', city: 'Vancouver', provinceAbbr: 'BC', postalCode: 'V6C 2V6', fax: '604-685-9815', _persistence_fetchGroup: null }), _persistence_fetchGroup: null, userMarker: Object({ geoLocation: Object({ lat: 49.285248, lng: -123.115952 }), zoom: 15 }), fullAddress: '800+West+Pender+StreetSuite+1600Vancouver' });

describe('advisor detail component', function () {
    beforeEach(module('advisorLocator.features.searchByName'));

    var scope ={};
    var controller ={};
    var $stateParams = {};
    var pageStateResolver = {};
    var detectMobile = {};
    var GOOGLE_MAPS_URL ={};
    var advisorDetailService;
    var stateTrackerService;
    var advisorService;
    beforeEach(function(){
        module(function($provide){
            $provide.service('advisorDetailService', function(){
                this.getAdvisorDetail= function() {
                    return advisorList30610;
                }

            });
        });

        module(function($provide){
            $provide.service('stateTrackerService', function(){

                this.previousState = {name:"main.advisorLocator.advisorList"};


            });
        });

        module(function($provide){
            $provide.service('advisorService', function(){

                this.isLoading = false;

            });
        });

        module('advisorLocator.features.searchByLocation');
    });
    beforeEach(function() {

        inject(['$injector', '$componentController', '$rootScope','advisorDetailService', 'advisorService', 'stateTrackerService', function ($injector, $componentController, $rootScope, _advisorDetailService_, _advisorService_, _stateTrackerService_) {
            advisorDetailService = _advisorDetailService_;
            advisorService = _advisorService_;
            stateTrackerService = _stateTrackerService_;
            scope = $rootScope.$new();
            controller = $componentController('advisorDetail', {$rootScope: scope, $stateParams:$stateParams,pageStateResolver:pageStateResolver,detectMobile:detectMobile,GOOGLE_MAPS_URL:GOOGLE_MAPS_URL,
                GOOGLE_MAPS_URL:GOOGLE_MAPS_URL, advisorDetailService: advisorDetailService, stateTrackerService:stateTrackerService, advisorService:advisorService}
            );

        }]);

    });

    it('should expose googleMapsUrl', function() {

        expect(controller.googleMapsUrl).toBeDefined();

    });

    it('should expose pageStateResolver', function() {

        expect(controller.pageStateResolver).toBeDefined();

    });

    it('should expose detectMobile', function() {
        console.log("lets see value of controller", controller);
        console.log("value of controller's stateTrackerService", controller.stateTrackerService );
        expect(controller.detectMobile).toBeDefined();

    });

    it('previous State should be Name Search', function() {

        expect(controller.stateTrackerService.previousState.name).toEqual("main.advisorLocator.advisorList");

    });

    it('getAdvisorDetail method should return the details of the advisor whose id is being passed', function() {

        expect(controller.advisorDetailService.getAdvisorDetail(30610)).toEqual(advisorList30610);

    });

});