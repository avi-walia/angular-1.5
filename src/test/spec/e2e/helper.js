var defaultTimeout = 1000;
var browserSync = element(by.id('__bs_notify__'));
var _ = require('lodash');

//This function loads the specified url into a window with the specified dimensions and waits for angular to finish rendering.
//URL = the path to the page you want to load
//width = the width of the browser window
//height = the height of the browser window
var appName = "App Title"
var year = new Date().getFullYear();

function newLink(text, href, visibility) {
    if (visibility == undefined){
        visibility = true;
    }
    return {
        text: text,
        href: href,
        visibility: visibility
    };
};

function loadPageWait(URL, width, height) {
    browser.get(URL);
    if (typeof width == "number" && typeof height == "number") {
        //this only works once per describe.
        browser.driver.manage().window().setSize(width, height);
    }
    browser.waitForAngular();
}

function footer(expected) {
    var f = {};

    f.footer = element(by.id('footer'));
    if (expected) {
        f.expected = expected;
    } else {
        f.expected = {
            text: '©2016 Name of Company',
            textVisibility: true,
            logoVisibility: false,
            links: []
        };
    }
    f.links = element.all(by.css('#footernav li a'));

    f.checkLinks = function(links) {
        if (links) {
            f.expected.links = links;
        }
        linkValidator(f.expected.links, f.links);
    }

    f.logo = element(by.css("#cilogo img[src='./assets/images/logos.svg']"));

    f.checkText = function(visibility, text) {

        if (typeof visibility == 'boolean') {
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
    return f;
}

//The common properties that all pages will have
function basePage(expected) {
    var basePage = {};
    basePage.title = element(by.binding('Head.page.title'));
    basePage.windowTitle = browser.getTitle();
    basePage.content = element(by.id('content'));
    if (expected) {
        basePage.expected = expected;
    } else {
        basePage.expected = {
            mobile: {
                title: '',
                content: '',
                windowTitle: ''
            },
            desktop: {
                title: '',
                content: '',
                windowTitle: ''
            }
        };
    }
    basePage.mobile = {
        checkTitle: checkMobileTitle,
        checkContent: checkMobileContent,
        checkWindowTitle: checkMobileWindowTitle
    };

    basePage.desktop = {
        checkContent: checkContent,
        checkWindowTitle: checkDesktopWindowTitle
    }

    function checkMobileTitle() {
        //every mobile page should have a title
        expect(basePage.title.isDisplayed()).toEqual(true);
        expect(basePage.title.getText()).toBe(basePage.expected.mobile.title);
    };

    function checkMobileContent() {
        //every mobile page should have content
        expect(basePage.content.isDisplayed()).toEqual(true);
        expect(basePage.content.getText()).toBe(basePage.expected.mobile.content);
    };
    function checkContent() {
        //every desktop page should have content
        expect(basePage.content.isDisplayed()).toEqual(true);
        expect(basePage.content.getText()).toBe(basePage.expected.desktop.content);
    }
    function checkDesktopWindowTitle() {
        expect(basePage.windowTitle).toBe(basePage.expected.desktop.windowTitle);
    }
    function checkMobileWindowTitle() {
        expect(basePage.windowTitle).toBe(basePage.expected.mobile.windowTitle);
    }

    return basePage;
}

function page1Template(expected) {
    var p = basePage(expected);
    //add additional functions/properties that are specific to page1
    return p;
}

function page2Template(expected) {
    var p = basePage(expected);
    //add additional functions/properties that are specific to page2
    return p;
}

function page3Template(expected) {
    var p = basePage(expected);
    //add additional functions/properties that are specific to page3
    return p;
}

function page4Template(expected) {
    var p = basePage(expected);
    //add additional functions/properties that are specific to page4
    return p;
}

function page5Template(expected) {
    var p = basePage(expected);
    //add additional functions/properties that are specific to page5
    return p;
}

function header(expected) {
    var header = {};
    header.container = element(by.id('bluebar .container'));
    header.links = element.all(by.css('#primary ul li a'));
    header.logo = element(by.css("#logo>img[src='./assets/images/logos.svg']"));
    header.navLinks = element.all(by.css('#primary li a'));
    if (expected) {
        header.expected = expected;
    } else {
        header.expected = {
            logoVisibility: true,
            links:[]
        }
    }

    header.click = function(index, pageTitle) {
        header.links.get(index).click();
        browser.wait(protractor.ExpectedConditions.titleIs(pageTitle), defaultTimeout);
    }

    /*
     expectedLinks is an array of objects, where each object is of the form:
     {
         text: string representation of the text the user sees
         href: the value(a url) of the href associated with the text
         visibility: check if element is visible or not, defaults to true if not specified.
     }
     */
    header.checkNavLinks = function(expectedLinks) {
        if (expectedLinks) {
            header.expected.links = expectedLinks;
        }
        linkValidator(header.expected.links, header.navLinks, true);
    };

    header.checkLogo = function(expectedVisibility) {
        if (expectedVisibility) {
            header.expected.logoVisibility = expectedVisibility;
        }
        expect(header.logo.isDisplayed()).toEqual(header.expected.logoVisibility);
    }
    return header;
}

function drawer(expected) {
    var drawer = {};
    drawer.container = element(by.id('nav'));
    drawer.hamburger = $("#drawerlink");
    drawer.links = element.all(by.css('#nav li a'));
    drawer.logo = element(by.css("#nav>span>img[src='./assets/images/logos.svg']"));
    drawer.homeLink = element(by.css('[href="NameOfMyNewSite.com"]'))
    if (expected) {
        drawer.expected = expected;
    } else {
        drawer.expected = {
            links: [],
            hamburgerVisibility: false,
            logoVisibility: false,
            homeLinkVisibility: true
        }
    }

    drawer.checkHomeLink = function(expectedVisibility) {
        if (typeof expectedVisibility == 'boolean') {
            drawer.expected.homeLinkVisibility = expectedVisibility;
        }
        expect(drawer.homeLink.isDisplayed()).toEqual(drawer.expected.homeLinkVisibility);
    }

    drawer.checkLogo = function(expectedVisibility) {
        if (typeof expectedVisibility == 'boolean') {
            drawer.expected.logoVisibility = expectedVisibility;
        }
        expect(drawer.logo.isDisplayed()).toEqual(drawer.expected.logoVisibility);
    }

    drawer.newLink = function(text, href, visibility) {
        if (visibility == undefined){
            visibility = true;
        }
        return {
            text: text,
            href: href,
            visibility: visibility
        };
    };
    drawer.checkHamburgerVisibility = function(expectedVisibility) {
        if (typeof expectedVisibility == 'boolean') {
            drawer.expected.hamburgerVisibility = expectedVisibility;
        }
        expect($("#drawerlink").isDisplayed()).toEqual(drawer.expected.hamburgerVisibility);
    }
    drawer.clickHamburger = function() {
        drawer.container.isDisplayed().then(function(isDisplayed) {
            if(!isDisplayed) {
                //browser sync sometimes covers hamburger so we have to wait for it to go away before we can click on the hamburger
                browser.wait(protractor.ExpectedConditions.stalenessOf(browserSync) || protractor.ExpectedConditions.invisibilityOf(browserSync), defaultTimeout);
                $("#drawerlink").click();
                browser.wait(protractor.ExpectedConditions.visibilityOf(drawer.links.get(0)), defaultTimeout);
            } else {
                //browser sync sometimes covers hamburger so we have to wait for it to go away before we can click on the hamburger
                browser.wait(protractor.ExpectedConditions.stalenessOf(browserSync) || protractor.ExpectedConditions.invisibilityOf(browserSync), defaultTimeout);
                $("#drawerlink").click();
                browser.wait(protractor.ExpectedConditions.invisibilityOf(drawer.links.get(0)), defaultTimeout);
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
    drawer.verifyLinks = function(expectedLinks) {
        if (expectedLinks) {
            drawer.expected.links = expectedLinks;
        }
        linkValidator(drawer.expected.links, drawer.links);
    };
    return drawer;
}

function linkValidator(expectedLinks, links, sref) {
    _.forEach(expectedLinks, function(expectedLink, index) {
        expect(links.get(index).isDisplayed()).toEqual(expectedLink.visibility);
        if (expectedLink.visibility) {
            expect(links.get(index).getText()).toEqual(expectedLink.text);
        } else {
            expect(links.get(index).getText()).toEqual('');
        }
        if (expectedLink.href && expectedLink.href != null) {
            if (!sref) {
                expect(links.get(index).getAttribute('href')).toEqual(expectedLink.href);
            } else {
                expect(links.get(index).getAttribute('ui-sref')).toEqual(expectedLink.href);
            }
        }
    });
}

function translate(key, locale) {
    /*
    if (locale == 'fr') {
        return localeFr.key;
    } else if (locale == 'en') {
        return localeEn.key;
    }*/
    //copyright is a complextranslation with nested translations, so we have to hardcode it.
    if (key == 'copyright') {
        return "©" + year + " " + translate("company", locale);
    }

    var keys = key.split(".");
    var temp = browser.params[locale];
    _.forEach(keys, function(value, index) {
        temp = temp[value];
    });
    return temp;
}

module.exports = {
    drawer: drawer,
    browserSync: browserSync,
    defaultTimeout: defaultTimeout,
    page1Template: page1Template,
    page2Template: page2Template,
    page3Template: page3Template,
    page4Template: page4Template,
    page5Template: page5Template,
     loadPageWait: loadPageWait,
    newLink: newLink,
    header: header,
    footer: footer,
    appName: appName,
    translate: translate,
     year: year
};