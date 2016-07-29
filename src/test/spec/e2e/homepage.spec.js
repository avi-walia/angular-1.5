var helper = require('./helper.js');
var _ = require('lodash');
var drawerTemplate = helper.drawer;
var page1Template = helper.page1Template;
var page2Template = helper.page2Template;
var page3Template = helper.page3Template;
var page4Template = helper.page4Template;
var page5Template = helper.page5Template;
var loadPageWait = helper.loadPageWait;
var headerTemplate = helper.header;
var newLink = helper.newLink;
var footerTemplate = helper.footer;
var appName = helper.appName;
var translate = helper.translate;
//currently locale only has two values, 'en' and 'fr'
var locale = 'en';

describe('desktop app should work', function() {

    it('should be able to go to page 1(desktop view)', function() {
        var pageName = "Page 1 Title";
        loadPageWait('http://localhost:3000/#/en/advisorLocator/page1');

        //Make sure the page content is visible and what we expect it to be
        var expected = {
            desktop: {
                content: 'Temporary page 1 content\n\n\nbottom',
                windowTitle: appName + ' - ' + pageName
            }
        };
        var page1 = page1Template(expected);
        page1.desktop.checkContent();
        page1.desktop.checkWindowTitle();
    });


    it('should have a desktop nav and footer', function() {

        //expect($("#drawerlink").isDisplayed()).toEqual(true);
        var expected = {
            logoVisibility: true,
            links: [
                newLink(translate('pages.page1.title', locale).toUpperCase(), "main.advisorLocator.page1", true),
                newLink(translate('pages.page2.title', locale).toUpperCase(), "main.advisorLocator.page2", true),
                newLink(translate('pages.page3.title', locale).toUpperCase(), "main.advisorLocator.page3.subpage", true),
                newLink(translate('pages.page4.title', locale).toUpperCase(), "main.advisorLocator.page4", true),
                newLink(translate('pages.page5.title', locale).toUpperCase(), "main.advisorLocator.page5", true)
            ]
        }
        var header = headerTemplate(expected);
        header.checkNavLinks();

        var expected = {
            text: '©2016 Name of Company',
            textVisibility: true,
            logoVisibility: true,
            links: [
                newLink('Link 1', 'https://www.google.ca/', true),
                newLink('Link 2', 'https://www.yahoo.ca/', true),
                newLink('Link 3', 'https://www.ci.com/', true),
                newLink('Link 4', 'https://www.assanteservices.com/aiol/#/en/aio/landing/', true)
            ]
        }
        footer = footerTemplate(expected);
        //mobile nav is not open, links should be on the page, but not visible
        //console.log('expectedLinks ', expectedLinks);
        footer.checkLinks();
        //verify that we can't see mobile nav logo when mobile nav is closed
        footer.checkLogoVisibility();
    });

});
/*

describe('mobile app should work', function() {


    it('should be able to go to page 1(mobile view)', function() {
        var pageName = "Page 1 Title";
        loadPageWait('http://localhost:3000/#/en/advisorLocator/page1', 500, 500);

        //Make sure the page content is visible and what we expect it to be

        var expected = {
            mobile: {
                title: pageName,
                content: 'Temporary page 1 content\n\n\nbottom',
                windowTitle: appName + ' - ' + pageName
            }
        };
        var page1 = page1Template(expected);
        page1.mobile.checkTitle();
        page1.mobile.checkContent();
        page1.mobile.checkWindowTitle();
    });

    it('should have a mobile nav and footer', function() {

        //expect($("#drawerlink").isDisplayed()).toEqual(true);
        var expected = {
            links: [
                newLink('Français', null, false),
                newLink('Page 1 Title', null, false),
                newLink('Page 2 Title', null, false),
                newLink('Page 3 Title', null, false),
                newLink('Page 4 Title', null, false),
                newLink('Page 5 Title', null, false),
                newLink('Help', null, false),
                newLink('Link 1', 'https://www.google.ca/', false),
                newLink('Link 2', 'https://www.yahoo.ca/', false),
                newLink('Link 3', 'https://www.ci.com/', false),
                newLink('Link 4', 'https://www.assanteservices.com/aiol/#/en/aio/landing/', false)
            ],
            hamburgerVisibility: true,
            logoVisibility: false,
            homeLinkVisibility: false
        }
        var drawer = drawerTemplate(expected);
        drawer.checkHamburgerVisibility();

        //mobile nav is not open, links should be on the page, but not visible
        drawer.verifyLinks();
        //verify that we can't see mobile nav logo when mobile nav is closed
        drawer.checkLogo();
        //open mobile navbar
        drawer.checkHomeLink();
        drawer.clickHamburger();
        drawer.checkHomeLink(true);


        var expected = {
            text: '©2016 Name of Company',
            textVisibility: true,
            logoVisibility: false,
            links: []
        };
        footer = footerTemplate(expected);
        footer.checkText();
        footer.checkLogoVisibility();

        //now we should expect the mobile navbar links to be visible
        _.forEach(drawer.expected.links, function(value, index){
            drawer.expected.links[index].visibility = true;
        });
        //verify navbar.
        drawer.verifyLinks();
        //verify that we can see the mobile nav logo when the nav is open
        drawer.checkLogo(true);
        //close navbar
        drawer.clickHamburger();
        drawer.checkHomeLink(false);

        footer.checkText();
        footer.checkLogoVisibility();

        _.forEach(drawer.expected.links, function(value, index){
            drawer.expected.links[index].visibility = false;
        });
        //verify navbar links and logo are hidden again
        drawer.verifyLinks();
        drawer.checkLogo(false);
    });

     it('should be able to go to page 2', function() {
     var pageName = 'Page 2 Title';
     loadPageWait('http://localhost:3000/#/en/advisorLocator/page2', 500, 500);


     var expected = {
         mobile: {
             title: pageName,
             content: 'Temporary page 2 content',
             windowTitle: appName + ' - ' + pageName
         }
     };
     var page2 = page2Template(expected);
     page2.mobile.checkTitle();
     page2.mobile.checkContent();
     page2.mobile.checkWindowTitle();
     });

     it('should be able to go to page 3', function() {
     var pageName = 'Page 3 Title';
     loadPageWait('http://localhost:3000/#/en/advisorLocator/page3/subpage', 500, 500);

     var expected = {
         mobile: {
             title: pageName,
             content: 'Temporary subpage content\nHello world\nTemporary subpage content',
             windowTitle: appName + ' - ' + pageName
         }
     };
     var page3 = page3Template(expected);
     page3.mobile.checkTitle();
     page3.mobile.checkContent();
     page3.mobile.checkWindowTitle();
     });

     it('should be able to go to page 4', function() {
     var pageName = 'Page 4 Title';
     loadPageWait('http://localhost:3000/#/en/advisorLocator/page4', 500, 500);
     var expected = {
         mobile: {
             title: pageName,
             content: 'Temporary page 4 content',
             windowTitle: appName + ' - ' + pageName
         }
     };
     var page4 = page4Template(expected);
     page4.mobile.checkTitle();
     page4.mobile.checkContent();
     page4.mobile.checkWindowTitle();
     });

     it('should be able to go to page 5', function() {
     var pageName = 'Page 5 Title';
     loadPageWait('http://localhost:3000/#/en/advisorLocator/page5', 500, 500);
     var expected = {
         mobile: {
             title: pageName,
             content: 'Temporary page 5 content',
             windowTitle: appName + ' - ' + pageName
         }
     };
     var page5 = page5Template(expected);
     page5.mobile.checkTitle();
     page5.mobile.checkContent();
     page5.mobile.checkWindowTitle();
     });

});
*/