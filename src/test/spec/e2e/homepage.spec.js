var helper = require('./helper.js');
var _ = require('lodash');
var mnb = helper.mobileNavBar;
var page1Template = helper.page1Template;
var page2Template = helper.page2Template;
var page3Template = helper.page3Template;
var page4Template = helper.page4Template;
var page5Template = helper.page5Template;
var loadPageWait = helper.loadPageWait;
var footer = helper.footer;
var appName = helper.appName;

describe('app should work', function() {

    it('should be able to go to page 1(desktop view)', function() {
        var pageName = "Page 1 Title";
        loadPageWait('http://localhost:3000/#/en/advisorLocator/page1');


        //Make sure the page content is visible and what we expect it to be
        var page1 = page1Template(pageName, null, 'Temporary page 1 content\n\n\nbottom', appName + ' - ' + pageName);
        //page1.checkMobileTitle();
        page1.checkContent();
        page1.checkWindowTitle();
    });


    it('should have a desktop nav and footer', function() {

        //expect($("#drawerlink").isDisplayed()).toEqual(true);
        mnb.checkHamburgerVisibility(false);


        var expectedLinks = [
            mnb.newLink('Link 1', 'https://www.google.ca/', true),
            mnb.newLink('Link 2', 'https://www.yahoo.ca/', true),
            mnb.newLink('Link 3', 'https://www.ci.com/', true),
            mnb.newLink('Link 4', 'https://www.assanteservices.com/aiol/#/en/aio/landing/', true)
        ];
        //mobile nav is not open, links should be on the page, but not visible
        //console.log('expectedLinks ', expectedLinks);
        footer.checkLinks(expectedLinks);
        //verify that we can't see mobile nav logo when mobile nav is closed
        //browser.pause();
        footer.checkLogoVisibility(true);
        footer.checkMobileLogoVisibility(false);
        var expectedDesktopNavLinks = [
                mnb.newLink('PAGE 1 TITLE', "main.advisorLocator.page1", true),
            mnb.newLink('PAGE 2 TITLE', "main.advisorLocator.page2", true),
            mnb.newLink('PAGE 3 TITLE', "main.advisorLocator.page3.subpage", true),
            mnb.newLink('PAGE 4 TITLE', "main.advisorLocator.page4", true),
            mnb.newLink('PAGE 5 TITLE', "main.advisorLocator.page5", true)
        ];
        mnb.verifyDesktopNavLinks(expectedDesktopNavLinks);
    });


    it('should be able to go to page 1(mobile view)', function() {
        var pageName = "Page 1 Title";
        loadPageWait('http://localhost:3000/#/en/advisorLocator/page1', 500, 500);


        //Make sure the page content is visible and what we expect it to be
        var page1 = page1Template(pageName, 'Temporary page 1 content\n\n\nbottom', null, appName + ' - ' + pageName);
        page1.checkMobileTitle();
        page1.checkMobileContent();
        page1.checkWindowTitle();
    });

    it('should have a mobile nav and footer', function() {

        //expect($("#drawerlink").isDisplayed()).toEqual(true);
        mnb.checkHamburgerVisibility(true);

        var expectedLinks = [
            mnb.newLink('Français', null, false),
            mnb.newLink('Page 1 Title', null, false),
            mnb.newLink('Page 2 Title', null, false),
            mnb.newLink('Page 3 Title', null, false),
            mnb.newLink('Page 4 Title', null, false),
            mnb.newLink('Page 5 Title', null, false),
            mnb.newLink('Help', null, false),
            mnb.newLink('Link 1', 'https://www.google.ca/', false),
            mnb.newLink('Link 2', 'https://www.yahoo.ca/', false),
            mnb.newLink('Link 3', 'https://www.ci.com/', false),
            mnb.newLink('Link 4', 'https://www.assanteservices.com/aiol/#/en/aio/landing/', false)
        ];
        //mobile nav is not open, links should be on the page, but not visible
        mnb.verifyLinks(expectedLinks);
        //verify that we can't see mobile nav logo when mobile nav is closed
        expect(mnb.logo.isDisplayed()).toEqual(false);
        //open mobile navbar
        mnb.clickHamburger();


        footer.checkText(true);
        footer.checkLogoVisibility(false);
        footer.checkMobileLogoVisibility(true);

        //now we should expect the mobile navbar links to be visible
        var drawerNavItems = element.all(by.css('#nav li a'));
        _.forEach(expectedLinks, function(value, index){
            value.visibility = true;
        });
        //verify navbar.
        mnb.verifyLinks(expectedLinks);
        //verify that we can see the mobile nav logo when the nav is open
        expect(mnb.logo.isDisplayed()).toEqual(true);
        //close navbar
        mnb.clickHamburger();

        footer.checkText();
        footer.checkLogoVisibility(false);
        footer.checkMobileLogoVisibility(false);

        _.forEach(expectedLinks, function(value, index){
            value.visibility = false;
        });
        //verify navbar links and logo are hidden again
        mnb.verifyLinks(expectedLinks);
        expect(mnb.logo.isDisplayed()).toEqual(false);
    });
    it('should be able to go to page 2', function() {
        var pageName = 'Page 2 Title';
        loadPageWait('http://localhost:3000/#/en/advisorLocator/page2', 500, 500);
         var page2 = page2Template(pageName, 'Temporary page 2 content', null, appName + ' - ' + pageName);
         page2.checkMobileTitle();
         page2.checkMobileContent();
         page2.checkWindowTitle();
    });

    it('should be able to go to page 3', function() {
        var pageName = 'Page 3 Title';
        loadPageWait('http://localhost:3000/#/en/advisorLocator/page3/subpage', 500, 500);
        var page3 = page3Template(pageName, 'Temporary subpage content\nHello world\nTemporary subpage content', null, appName + ' - ' + pageName);
        page3.checkMobileTitle();
        page3.checkMobileContent();
        page3.checkWindowTitle();
    });

    it('should be able to go to page 4', function() {
        var pageName = 'Page 4 Title';
        loadPageWait('http://localhost:3000/#/en/advisorLocator/page4', 500, 500);
        var page4 = page4Template(pageName, 'Temporary page 4 content', null, appName + ' - ' + pageName);
        page4.checkMobileTitle();
        page4.checkMobileContent();
        page4.checkWindowTitle();
    });

    it('should be able to go to page 5', function() {
        var pageName = 'Page 5 Title';
        loadPageWait('http://localhost:3000/#/en/advisorLocator/page5', 500, 500);
        var page5 = page5Template(pageName, 'Temporary page 5 content', null, appName + ' - ' + pageName);
        page5.checkMobileTitle();
        page5.checkMobileContent();
        page5.checkWindowTitle();
    });

});