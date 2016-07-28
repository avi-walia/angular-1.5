var defaultTimeout = 1000;
var browserSync = element(by.id('__bs_notify__'));
var _ = require('lodash');

//note isDisplayed and isPresent doesn't guarantee that the elements are onscreen. It only guarantees that they exist and are not hidden(ie. display:none).



//This function loads the specified url into a window with the specified dimensions and waits for angular to finish rendering.
//URL = the path to the page you want to load
//width = the width of the browser window
//height = the height of the browser window
var appName = "App Title"
function loadPageWait(URL, width, height) {
    browser.get(URL);
    if (typeof width == "number" && typeof height == "number") {
        browser.driver.manage().window().setSize(width, height);
    }
    browser.waitForAngular();
}

function footer() {
    var f = {};
    f.footer = element(by.id('footer'));
    f.expected = {
        text: '©2016 Name of Company',
        textVisibility: true,
        logoVisibility: false,
        mobileLogoVisibility: false,
        links: []
    };
    f.links = element.all(by.css('#footernav li a'));

    f.checkLinks = function(links) {
        if (links) {
            f.expected.links = links;
        }
        linkValidator(f.expected.links, f.links);
    }

    f.logo = element(by.css("#cilogo img[src='./assets/images/logos.svg']"));
    f.mobileLogo = element(by.css("#nav img[src='./assets/images/logos.svg']"));

    f.checkText = function(visibility, text) {

        if (visibility) {
            f.expected.textVisibility = visibility;
        }
        if (text) {
            f.expected.text = text;
        }
        expect(f.footer.isDisplayed()).toEqual(f.expected.textVisibility);
        expect(f.footer.isPresent()).toEqual(f.expected.textVisibility);
        expect(f.footer.getText()).toEqual(f.expected.text);
    }

    f.checkLogoVisibility = function(logoVisibility) {
        if (typeof logoVisibility == 'boolean') {
            f.expected.logoVisibility = logoVisibility;
        }
        expect(f.logo.isDisplayed()).toBe(f.expected.logoVisibility);
    }

    f.checkMobileLogoVisibility = function(mobileLogoVisibility) {
        if (typeof mobileLogoVisibility == 'boolean') {
            f.expected.mobileLogoVisibility = mobileLogoVisibility;
        }
        expect(f.mobileLogo.isDisplayed()).toBe(f.expected.mobileLogoVisibility);
    }
    return f;
}

//The common properties that all pages will have
function basePage() {
    var basePage = {};
    basePage.title = element(by.binding('Head.page.title'));
    basePage.windowTitle = browser.getTitle();
    basePage.content = element(by.id('content'));
    basePage.expected = {
        title:'',
        content:'',
        windowTitle:''
    };
    basePage.checkMobileTitle = function() {
        //every mobile page should have a title
        expect(basePage.title.isDisplayed()).toEqual(true);
        expect(basePage.title.getText()).toBe(basePage.expected.title);
    };
    basePage.checkMobileContent = function() {
        //every mobile page should have content
        expect(basePage.content.isDisplayed()).toEqual(true);
        expect(basePage.content.getText()).toBe(basePage.expected.content);
    };
    basePage.checkContent = function() {
        //every mobile page should have content
        expect(basePage.content.isDisplayed()).toEqual(true);
        expect(basePage.content.getText()).toBe(basePage.expected.desktopContent);
    }
    basePage.checkWindowTitle = function() {
        expect(basePage.windowTitle).toBe(basePage.expected.windowTitle);
    }
    return basePage;
}

function page1Template(expectedTitle, expectedContent, expectedDesktopContent, windowTitle) {
    var p = basePage();
    p.expected.title = expectedTitle;
    p.expected.content = expectedContent;
    p.expected.desktopContent = expectedDesktopContent;
    p.expected.windowTitle = windowTitle;
    //add additional functions/properties that are specific to page1
    return p;
}

function page2Template(expectedTitle, expectedContent, expectedDesktopContent, windowTitle) {
    var p = basePage();
    p.expected.title = expectedTitle;
    p.expected.content = expectedContent;
    p.expected.desktopContent = expectedDesktopContent;
    p.expected.windowTitle = windowTitle;
    //add additional functions/properties that are specific to page2
    return p;
}

function page3Template(expectedTitle, expectedContent, expectedDesktopContent, windowTitle) {
    var p = basePage();
    p.expected.title = expectedTitle;
    p.expected.content = expectedContent;
    p.expected.desktopContent = expectedDesktopContent;
    p.expected.windowTitle = windowTitle;
    //add additional functions/properties that are specific to page3
    return p;
}

function page4Template(expectedTitle, expectedContent, expectedDesktopContent, windowTitle) {
    var p = basePage();
    p.expected.title = expectedTitle;
    p.expected.content = expectedContent;
    p.expected.desktopContent = expectedDesktopContent;
    p.expected.windowTitle = windowTitle;
    //add additional functions/properties that are specific to page4
    return p;
}

function page5Template(expectedTitle, expectedContent, expectedDesktopContent, windowTitle) {
    var p = basePage();
    p.expected.title = expectedTitle;
    p.expected.content = expectedContent;
    p.expected.desktopContent = expectedDesktopContent;
    p.expected.windowTitle = windowTitle;
    //add additional functions/properties that are specific to page5
    return p;
}

function mobileNavBar() {
    var mnb = {};
    mnb.container = element(by.id('nav'));
    mnb.hamburger = $("#drawerlink");
    mnb.links = element.all(by.css('#nav li a'));
    mnb.logo = element(by.css("#nav>span>img[src='./assets/images/logos.svg']"));
    mnb.desktopNavLinks = element.all(by.css('#primary li a'));

    mnb.verifyDesktopNavLinks = function(expectedLinks) {
        linkValidator(expectedLinks, mnb.desktopNavLinks, true);
    };



    mnb.newLink = function(text, href, visibility) {
        if (visibility == undefined){
            visibility = true;
        }
        return {
            text: text,
            href: href,
            visibility: visibility
        };
    };
    mnb.checkHamburgerVisibility = function(expectedVisibility) {
        expect($("#drawerlink").isDisplayed()).toEqual(expectedVisibility);
    }
    mnb.clickHamburger = function() {
        mnb.container.isDisplayed().then(function(isDisplayed) {
            if(!isDisplayed) {
                //browser sync sometimes covers hamburger so we have to wait for it to go away before we can click on the hamburger
                browser.wait(protractor.ExpectedConditions.stalenessOf(browserSync) || protractor.ExpectedConditions.invisibilityOf(browserSync), defaultTimeout);
                $("#drawerlink").click();
                browser.wait(protractor.ExpectedConditions.visibilityOf(mnb.links.get(0)), defaultTimeout);
            } else {
                //browser sync sometimes covers hamburger so we have to wait for it to go away before we can click on the hamburger
                browser.wait(protractor.ExpectedConditions.stalenessOf(browserSync) || protractor.ExpectedConditions.invisibilityOf(browserSync), defaultTimeout);
                $("#drawerlink").click();
                browser.wait(protractor.ExpectedConditions.invisibilityOf(mnb.links.get(0)), defaultTimeout);
            }
        });
    };
    /*
        links is an array of objects, where each object is of the form:
        {
            text: string representation of the text the user sees
            href: the value(a url) of the href associated with the text
            visibility: check if element is visible or not, defaults to true if not specified.
    */
    mnb.verifyLinks = function(expectedLinks) {
        linkValidator(expectedLinks, mnb.links);
    };
    return mnb;
}

function linkValidator(expectedLinks, links, sref) {
    _.forEach(expectedLinks, function(expectedLink, index) {
        expect(links.get(index).isDisplayed()).toEqual(expectedLink.visibility);
        if (expectedLink.visibility) {
            expect(links.get(index).getText()).toEqual(expectedLink.text);
        } else {
            expect(links.get(index).getText()).toEqual('');
        }
        if (expectedLink.href != null) {
            if (!sref) {
                expect(links.get(index).getAttribute('href')).toEqual(expectedLink.href);
            } else {
                expect(links.get(index).getAttribute('ui-sref')).toEqual(expectedLink.href);
            }
        }
    });
}

module.exports = {
    mobileNavBar: mobileNavBar(),
    browserSync: browserSync,
    defaultTimeout: defaultTimeout,
    page1Template: page1Template,
    page2Template: page2Template,
    page3Template: page3Template,
    page4Template: page4Template,
    page5Template: page5Template,
     loadPageWait: loadPageWait,
    footer: footer(),
    appName: appName
};