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
var translate = helper.translate;
//currently locale only has two values, 'en' and 'fr'
var locale = 'en';
var appName = translate('appTitle', locale);

describe('desktop app should work', function() {

    it('should be able to go to page 1(desktop view)', function() {
        var pageName = translate('pages.page1.title', locale);
        loadPageWait('http://localhost:3000/#/en/advisorLocator/page1');

        //Make sure the page content is visible and what we expect it to be
        var page1 = page1Template();
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
        };
        var header = headerTemplate(expected);
        header.checkNavLinks();
        header.checkSelected(0);

        var expected = {
            desktop: {
                text: translate('copyright', locale),
                textVisibility: true,
                logoVisibility: true,
                links: [
                    newLink(translate('footer.linkText1', locale), translate('footer.link1', locale), true),
                    newLink(translate('footer.linkText2', locale), translate('footer.link2', locale), true),
                    newLink(translate('footer.linkText3', locale), translate('footer.link3', locale), true),
                    newLink(translate('footer.linkText4', locale), translate('footer.link4', locale), true)
                ]
            }
        };
        footer = footerTemplate(expected);
        //mobile nav is not open, links should be on the page, but not visible
        //console.log('expectedLinks ', expectedLinks);
        footer.desktop.checkLinks();
        //verify that we can't see mobile nav logo when mobile nav is closed
        footer.desktop.checkLogoVisibility();
    });

    it('should navigate to page 2', function() {

        var header = headerTemplate();
        var page2 = page2Template();
        header.click(1, page2.expected.desktop.windowTitle);
        header.checkSelected(1);
        //loadPageWait('http://localhost:3000/#/en/advisorLocator/page5', 500, 500);
        //page5.desktop.checkTitle();
        page2.desktop.checkContent();
        page2.desktop.checkWindowTitle();

    });

    it('should navigate to page 3', function() {

        var header = headerTemplate();
        var page3 = page3Template();
        header.click(2, page3.expected.desktop.windowTitle);
        header.checkSelected(2);
        //loadPageWait('http://localhost:3000/#/en/advisorLocator/page5', 500, 500);
        page3.desktop.checkContent();
        page3.desktop.checkWindowTitle();

    });

    it('should navigate to page 4', function() {

        var header = headerTemplate();
        var page4 = page4Template();
        header.click(3, page4.expected.desktop.windowTitle);
        header.checkSelected(3);
        //loadPageWait('http://localhost:3000/#/en/advisorLocator/page5', 500, 500);
        //page4.desktop.checkTitle();
        page4.desktop.checkContent();
        page4.desktop.checkWindowTitle();

    });

    it('should navigate to page 5', function() {

        var header = headerTemplate();
        var pageName = translate('pages.page5.title', locale);
        header.click(4, appName + ' - ' + pageName);
        header.checkSelected(4);
        //loadPageWait('http://localhost:3000/#/en/advisorLocator/page5', 500, 500);
        var expected = {
            desktop: {
                content: 'Temporary page 5 content',
                windowTitle: appName + ' - ' + pageName
            }
        };
        var page5 = page5Template(expected);
        //page5.desktop.checkTitle();
        page5.desktop.checkContent();
        page5.desktop.checkWindowTitle();

    });

});

describe('mobile app should work', function() {


    it('should be able to go to page 1(mobile view)', function() {
        var pageName = translate('pages.page1.title', locale);
        loadPageWait('http://localhost:3000/#/en/advisorLocator/page1', 500, 500);

        //Make sure the page content is visible and what we expect it to be
        var page1 = page1Template();
        page1.mobile.checkTitle();
        page1.mobile.checkContent();
        page1.mobile.checkWindowTitle();
    });

    it('should have a mobile nav and footer', function() {

        //expect($("#drawerlink").isDisplayed()).toEqual(true);
        var expected = {
            links: [
                newLink(translate('navbar.FR', locale), null, false),
                newLink(translate('pages.page1.title', locale), null, false),
                newLink(translate('pages.page2.title', locale), null, false),
                newLink(translate('pages.page3.title', locale), null, false),
                newLink(translate('pages.page4.title', locale), null, false),
                newLink(translate('pages.page5.title', locale), null, false),
                newLink(translate('helpLabel', locale), null, false),
                newLink(translate('footer.linkText1', locale), translate('footer.link1', locale), false),
                newLink(translate('footer.linkText2', locale), translate('footer.link2', locale), false),
                newLink(translate('footer.linkText3', locale), translate('footer.link3', locale), false),
                newLink(translate('footer.linkText4', locale), translate('footer.link4', locale), false)
            ],
            hamburgerVisibility: true,
            logoVisibility: false,
            homeLinkVisibility: false
        }
        var drawer = drawerTemplate(expected);
        drawer.checkHamburgerVisibility();
        drawer.checkSelected(0);
        //mobile nav is not open, links should be on the page, but not visible
        drawer.verifyLinks();
        //verify that we can't see mobile nav logo when mobile nav is closed
        drawer.checkLogo();
        //open mobile navbar
        drawer.checkHomeLink();
        drawer.clickHamburger();
        drawer.checkHomeLink(true);


        var expected = {
            mobile: {
                text: translate('copyright', locale),
                textVisibility: true,
                logoVisibility: false,
                links: []
            }
        };
        footer = footerTemplate(expected);
        footer.mobile.checkText();
        footer.mobile.checkLogoVisibility();

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

        footer.mobile.checkText();
        footer.mobile.checkLogoVisibility();

        _.forEach(drawer.expected.links, function(value, index){
            drawer.expected.links[index].visibility = false;
        });
        //verify navbar links and logo are hidden again
        drawer.verifyLinks();
        drawer.checkLogo(false);
    });

     it('should be able to go to page 2', function() {
         var pageName = translate('pages.page2.title', locale);
         //loadPageWait('http://localhost:3000/#/en/advisorLocator/page2', 500, 500);
         var drawer = drawerTemplate();
         drawer.click(2, appName + ' - ' + pageName);
         drawer.checkSelected(1);

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
         var pageName = translate('pages.page3.title', locale);
         //loadPageWait('http://localhost:3000/#/en/advisorLocator/page3/subpage', 500, 500);
         var drawer = drawerTemplate();
         drawer.click(3, appName + ' - ' + pageName);
         drawer.checkSelected(2);

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
         var pageName = translate('pages.page4.title', locale);
        //loadPageWait('http://localhost:3000/#/en/advisorLocator/page4', 500, 500);
        var drawer = drawerTemplate();
         drawer.click(4, appName + ' - ' + pageName);
         drawer.checkSelected(3);
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
         var pageName = translate('pages.page5.title', locale);
         //loadPageWait('http://localhost:3000/#/en/advisorLocator/page5', 500, 500);
         var drawer = drawerTemplate();
         drawer.click(5, appName + ' - ' + pageName);
         drawer.checkSelected(4);
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