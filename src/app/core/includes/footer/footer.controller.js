(function () {
    'use strict';

    angular
        .module('aio.core.main')
        .controller('FooterCtrl', FooterCtrl);

    FooterCtrl.$inject = ['$scope', '$translate', 'BASE_URL'];

    /* @ngInject */
    function FooterCtrl($scope, $translate, BASE_URL) {
        var vm = this;
        //var lang = $rootScope.documentLanguage;
        vm.serverDate = new Date();

        vm.legalNoticeLink = $translate.instant('universal.legal-notices-link');
        vm.userAgreementLink = $translate.instant('registration.info.userAgreement.pdf');
        vm.privacyPolicyLink = $translate.instant('universal.privacy-policy-link');
        vm.emailSecurityLink = $translate.instant('universal.email-security-link');
        vm.copyrightLink = $translate.instant('universal.assante-footer-link');




        //vm.date = new Date();
        vm.BASE_URL = BASE_URL;

        $scope.openInExternalBrowser = function(isExternal, link)
        {
            // Open in external browser

            console.warn("open in external browser ", link);
            window.open( (!isExternal ? BASE_URL+"/aiol"+link: link),'_system','location=yes');

        };
    }



})();

