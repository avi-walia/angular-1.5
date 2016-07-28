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

describe('advisorLocator mobile Navigation', function() {
    it('should be able to go to page 1', function() {
        //Navigate to page 1 of the app, resize the window to force the mobile view, and wait for angular to finish.
        /*
        browser.get('http://localhost:3000/#/en/advisorLocator/page1');
        browser.driver.manage().window().setSize(500, 500);
        browser.waitForAngular();*/
        loadPageWait('http://localhost:3000/#/en/advisorLocator/page1', 500, 500);


        //Make sure the page content is visible and what we expect it to be
        var page1 = page1Template('Page 1 Title','Temporary page 1 content\n\n\nbottom');
        page1.checkMobileTitle();
        page1.checkMobileContent();
        footer.checkText();
        footer.checkLogoVisibility();
        footer.checkMobileLogoVisibility();

        expect($("#drawerlink").isDisplayed()).toEqual(true);


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
        footer.checkLogoVisibility();
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
        footer.checkLogoVisibility();
        footer.checkMobileLogoVisibility(false);

        _.forEach(expectedLinks, function(value, index){
            value.visibility = false;
        });
        //verify navbar links and logo are hidden again
        mnb.verifyLinks(expectedLinks);
        expect(mnb.logo.isDisplayed()).toEqual(false);

    });
/*
    it('should be able to go to page 2', function() {
        browser.get('http://localhost:3000/#/en/advisorLocator/page2');
        browser.driver.manage().window().setSize(500, 500);
        browser.waitForAngular();
        expect(element(by.binding('Head.page.title')).getText()).toEqual('Page 2 Title');
    });
    it('should be able to go to page 3', function() {
        browser.get('http://localhost:3000/#/en/advisorLocator/page3/subpage');
        browser.driver.manage().window().setSize(500, 500);
        browser.waitForAngular();
        expect(element(by.binding('Head.page.title')).getText()).toEqual('Page 3 Title');
    });
    it('should be able to go to page 4', function() {
        browser.get('http://localhost:3000/#/en/advisorLocator/page4');
        browser.driver.manage().window().setSize(500, 500);
        browser.waitForAngular();
        expect(element(by.binding('Head.page.title')).getText()).toEqual('Page 4 Title');
    });
    it('should be able to go to page 5', function() {
        browser.get('http://localhost:3000/#/en/advisorLocator/page5');
        browser.driver.manage().window().setSize(500, 500);
        browser.waitForAngular();
        expect(element(by.binding('Head.page.title')).getText()).toEqual('Page 5 Title');
    });
*/
});