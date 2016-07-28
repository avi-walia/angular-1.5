var helper = require('./helper.js');
var _ = require('lodash');
var mnb = helper.mobileNavBar;
describe('advisorLocator mobile Navigation', function() {
    it('should be able to go to page 1', function() {
        browser.get('http://localhost:3000/#/en/advisorLocator/page1');
        browser.driver.manage().window().setSize(500, 500);
        browser.waitForAngular();

        expect(element(by.binding('Head.page.title')).isDisplayed()).toEqual(true);
        expect(element(by.binding('Head.page.title')).getText()).toBe('Page 1 Title');
        expect($("#content").getText()).toEqual('Temporary page 1 content\n\n\nbottom');
        expect($("#content").isDisplayed()).toEqual(true);
        expect($("#footer").getText()).toEqual('©2016 Name of Company');
        expect($("#footer").isDisplayed()).toEqual(true);
        var mypic = element(by.css("img[src='./assets/images/logos.svg']"));
        expect(mypic.isDisplayed()).toBe(false);
        expect($("#drawerlink").isDisplayed()).toEqual(true);

        //browser.wait(protractor.expectedConditions.elementIsNotVisible($('__bs_notify__')), 5000, 'Element not clickable');
        /*
        browser.wait(protractor.ExpectedConditions.stalenessOf($('#__bs_notify__')) || protractor.ExpectedConditions.invisibilityOf($('#__bs_notify__')), 5000);
        $("#drawerlink").click();
        browser.wait(protractor.ExpectedConditions.visibilityOf($("#nav li")), 5000);
        */


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
        expect(mnb.logo.isDisplayed()).toEqual(false);
        //open mobile navbar
        mnb.clickHamburger();
        //now we should expect the mobile navbar links to be visible
        var drawerNavItems = element.all(by.css('#nav li a'));
        _.forEach(expectedLinks, function(value, index){
            value.visibility = true;
        });
        //verify navbar.
        mnb.verifyLinks(expectedLinks);
        expect(mnb.logo.isDisplayed()).toEqual(true);

        /*
        expect(drawerNavItems.get(0).isDisplayed()).toEqual(true);
        expect(drawerNavItems.get(0).getText()).toEqual('Français');

        expect(drawerNavItems.get(1).isDisplayed()).toEqual(true);
        expect(drawerNavItems.get(1).getText()).toEqual('Page 1 Title');
        expect(drawerNavItems.get(2).isDisplayed()).toEqual(true);
        expect(drawerNavItems.get(2).getText()).toEqual('Page 2 Title');
        expect(drawerNavItems.get(3).isDisplayed()).toEqual(true);
        expect(drawerNavItems.get(3).getText()).toEqual('Page 3 Title');
        expect(drawerNavItems.get(4).isDisplayed()).toEqual(true);
        expect(drawerNavItems.get(4).getText()).toEqual('Page 4 Title');
        expect(drawerNavItems.get(5).isDisplayed()).toEqual(true);
        expect(drawerNavItems.get(5).getText()).toEqual('Page 5 Title');
        expect(drawerNavItems.get(6).isDisplayed()).toEqual(true);
        expect(drawerNavItems.get(6).getText()).toEqual('Help');

        //var drawerAnchors = element.all($('#nav li a'));

        expect(drawerNavItems.get(7).isDisplayed()).toEqual(true);
        expect(drawerNavItems.get(7).getText()).toEqual('Link 1');
        expect(drawerNavItems.get(7).getAttribute('href')).toEqual('https://www.google.ca/');
        expect(drawerNavItems.get(8).isDisplayed()).toEqual(true);
        expect(drawerNavItems.get(8).getText()).toEqual('Link 2');
        expect(drawerNavItems.get(8).getAttribute('href')).toEqual('https://www.yahoo.ca/');
        expect(drawerNavItems.get(9).isDisplayed()).toEqual(true);
        expect(drawerNavItems.get(9).getText()).toEqual('Link 3');
        expect(drawerNavItems.get(9).getAttribute('href')).toEqual('https://www.ci.com/');
        expect(drawerNavItems.get(10).isDisplayed()).toEqual(true);
        expect(drawerNavItems.get(10).getText()).toEqual('Link 4');
        expect(drawerNavItems.get(10).getAttribute('href')).toEqual('https://www.assanteservices.com/aiol/#/en/aio/landing/');
        */

        /*
        expect(element(by.binding('pages.page1.title')).isDisplayed()).toEqual(true);
        expect(element(by.binding('pages.page2.title')).isDisplayed()).toEqual(true);
        expect(element(by.binding('pages.page3.title')).isDisplayed()).toEqual(true);
        expect(element(by.binding('pages.page4.title')).isDisplayed()).toEqual(true);
        expect(element(by.binding('pages.page5.title')).isDisplayed()).toEqual(true);
        */

        /* check if image exists before running some other tests
        browser.isElementPresent(mypic).then(function (result) {
            if(result){
                //  DO STUFF
                console.log('my Stuff: ', result);
            }
        });
        */
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