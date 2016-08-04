var defaultTimeout = 3000;
var browserSync = element(by.id('__bs_notify__'));
var _ = require('lodash');
var EC = protractor.ExpectedConditions;
var locale = 'en';

//This function loads the specified url into a window with the specified dimensions and waits for angular to finish rendering.
//URL = the path to the page you want to load
//width = the width of the browser window
//height = the height of the browser window
var appName = "App Title"
var year = new Date().getFullYear();
var waitTime = 75;//sometimes browser.wait is not enough, and we still need a manual delay. Or maybe I'm waiting on the wrong condition?



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
            mobile: {
                text: translate('copyright', locale),
                textVisibility: true,
                logoVisibility: false,
                links: []
            },
            desktop: {
                text: translate('copyright', locale),
                textVisibility: true,
                logoVisibility: false,
                links: [
                    newLink(translate('footer.linkText1', locale), translate('footer.link1', locale), true),
                    newLink(translate('footer.linkText2', locale), translate('footer.link2', locale), true),
                    newLink(translate('footer.linkText3', locale), translate('footer.link3', locale), true),
                    newLink(translate('footer.linkText4', locale), translate('footer.link4', locale), true),
                ]
            }
        };
    };
    //this is only available on desktop view. In mobile, links are part of the drawer.
    f.links = element.all(by.css('#footernav ul li a'));
    f.desktop = {
        checkLinks: checkLinks,
        checkText: checkDesktopText,
        checkLogoVisibility: checkDesktopLogoVisibility
    };
    f.mobile = {
        checkText: checkMobileText,
        checkLogoVisibility: checkMobileLogoVisibility
    }
    //only for desktop
    function checkLinks(links) {
        if (links) {
            f.expected.desktop.links = links;
        }
        linkValidator(f.expected.desktop.links, f.links);
    };
    //only available on desktop view
    f.logo = element(by.css("#cilogo img[src='./assets/images/logos.svg']"));

    function checkMobileText(visibility, text) {

        if (typeof visibility == 'boolean') {
            f.expected.mobile.textVisibility = visibility;
        }
        if (text) {
            f.expected.mobile.text = text;
        }
        expect(f.footer.isDisplayed()).toEqual(f.expected.mobile.textVisibility);
        expect(f.footer.isPresent()).toEqual(f.expected.mobile.textVisibility);
        expect(f.footer.getText()).toEqual(f.expected.mobile.text);
    };

    function checkDesktopText(visibility, text) {

        if (typeof visibility == 'boolean') {
            f.expected.desktop.textVisibility = visibility;
        }
        if (text) {
            f.expected.desktop.text = text;
        }
        expect(f.footer.isDisplayed()).toEqual(f.expected.desktop.textVisibility);
        expect(f.footer.isPresent()).toEqual(f.expected.desktop.textVisibility);
        expect(f.footer.getText()).toEqual(f.expected.desktop.text);
    };

    function checkDesktopLogoVisibility(logoVisibility) {
        if (typeof logoVisibility == 'boolean') {
            f.expected.desktop.logoVisibility = logoVisibility;
        }
        expect(f.logo.isDisplayed()).toBe(f.expected.desktop.logoVisibility);
    }


    function checkMobileLogoVisibility(logoVisibility) {
        if (typeof logoVisibility == 'boolean') {
            f.expected.mobile.logoVisibility = logoVisibility;
        }
        expect(f.logo.isDisplayed()).toBe(f.expected.mobile.logoVisibility);
    }

    function checkDesktopLogoVisibility(logoVisibility) {
        if (typeof logoVisibility == 'boolean') {
            f.expected.desktop.logoVisibility = logoVisibility;
        }
        expect(f.logo.isDisplayed()).toBe(f.expected.desktop.logoVisibility);
    }
    return f;
}

//The common properties that all pages will have
function basePage(expected) {
    var basePage = {};
    basePage.title = element(by.binding('Head.page.title'));
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
        expect(browser.getTitle()).toBe(basePage.expected.desktop.windowTitle);
    }
    function checkMobileWindowTitle() {
        expect(browser.getTitle()).toBe(basePage.expected.mobile.windowTitle);
    }

    return basePage;
}

function page1Template(expected) {
    var expected2;
    var pageName = translate('pages.page1.title', locale);

    if (!expected) {
        expected2 = {
            mobile: {
                title: pageName,
                content: 'Temporary page 1 content\n\n\nbottom',
                windowTitle: appName + ' - ' + pageName
            },
            desktop: {
                content: 'Temporary page 1 content\n\n\nbottom',
                windowTitle: appName + ' - ' + pageName
            }
        }
    } else {
        expected2 = expected;
    }


    var p = basePage(expected2);
    //add additional functions/properties that are specific to page1
    return p;
}

function page2Template(expected) {
    var expected2;
    var pageName = translate('pages.page2.title', locale);

    if (!expected) {
        expected2 = {
            mobile: {
                title: pageName,
                content: 'Temporary page 2 content',
                windowTitle: appName + ' - ' + pageName
            },
            desktop: {
                content: 'Temporary page 2 content',
                windowTitle: appName + ' - ' + pageName
            }
        }
    } else {
        expected2 = expected;
    }


    var p = basePage(expected2);
    //add additional functions/properties that are specific to page1
    return p;
}

function page3Template(expected) {
    var expected2;
    var pageName = translate('pages.page3.title', locale);

    if (!expected) {
        expected2 = {
            mobile: {
                title: pageName,
                content: 'Temporary subpage content\nHello world\nTemporary subpage content',
                windowTitle: appName + ' - ' + pageName
            },
            desktop: {
                content: 'Temporary subpage content\nHello world\nTemporary subpage content',
                windowTitle: appName + ' - ' + pageName
            }
        }
    } else {
        expected2 = expected;
    }


    var p = basePage(expected2);
    //add additional functions/properties that are specific to page1
    return p;
}

function page4Template(expected) {
    var expected2;
    var pageName = translate('pages.page4.title', locale);

    if (!expected) {
        expected2 = {
            mobile: {
                title: pageName,
                content: 'Temporary page 4 content',
                windowTitle: appName + ' - ' + pageName
            },
            desktop: {
                content: 'Temporary page 4 content',
                windowTitle: appName + ' - ' + pageName
            }
        }
    } else {
        expected2 = expected;
    }


    var p = basePage(expected2);
    //add additional functions/properties that are specific to page1
    return p;
}

function page5Template(expected) {
    var expected2;
    var pageName = translate('pages.page5.title', locale);

    if (!expected) {
        expected2 = {
            mobile: {
                title: pageName,
                content: 'Temporary page 5 content',
                windowTitle: appName + ' - ' + pageName
            },
            desktop: {
                content: 'Temporary page 5 content',
                windowTitle: appName + ' - ' + pageName
            }
        }
    } else {
        expected2 = expected;
    }


    var p = basePage(expected2);
    //add additional functions/properties that are specific to page1
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
        browser.wait(EC.elementToBeClickable(header.links.get(index)), defaultTimeout);
        header.links.get(index).click();
        browser.wait(EC.titleIs(pageTitle), defaultTimeout);
    }

    //check that the proper header item is highlighted(orange text);
    header.checkSelected = function(targetIndex) {
        header.links.each(function(item, index) {
           if (targetIndex == index) {
               expect(item.getCssValue('color')).toEqual('rgba(205, 88, 6, 1)');
           } else {
               expect(item.getCssValue('color')).toEqual('rgba(255, 255, 255, 1)');
           }

        });

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

    drawer.checkSelected = function(targetIndex) {
        drawer.clickHamburger();
        element.all(by.css('#nav ul')).get(1).all(by.css('li a')).each(function(item, index) {
            if (targetIndex == index) {
                expect(item.getCssValue('color')).toEqual('rgba(163, 147, 101, 1)');
            } else {
                expect(item.getCssValue('color')).toEqual('rgba(221, 221, 221, 1)');
            }
        });
        drawer.clickHamburger();

    }

    drawer.click = function(index, pageTitle) {
        drawer.links.get(index).isDisplayed().then(function(isDisplayed){
            browser.getTitle().then(function(title){
                //if (title != pageTitle) {
                    //resolvedValues[0] is the visibility of the drawer.
                    if (!isDisplayed) {
                        drawer.clickHamburger();
                    }

                    browser.wait(EC.visibilityOf(drawer.links.get(index)), defaultTimeout);
                    browser.wait(EC.elementToBeClickable(drawer.links.get(index)), defaultTimeout);
                    //browser.pause();
                    drawer.links.get(index).click();
                    browser.wait(EC.invisibilityOf(drawer.links.get(index)), defaultTimeout);
                //}
            })
        })
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
    drawer.checkHamburgerVisibility = function(expectedVisibility) {
        if (typeof expectedVisibility == 'boolean') {
            drawer.expected.hamburgerVisibility = expectedVisibility;
        }
        expect(drawer.hamburger.isDisplayed()).toEqual(drawer.expected.hamburgerVisibility);
    };

    function checkDrawerPosition() {
        return drawer.hamburger.getLocation().then(function (coordinates) {
            //browser.driver.manage().window().getSize();
            //if (coordinates.x <= 180 || coordinates.x >= 445) {//these coordinates will change depending on device width. These work with browser with 500px width.
            return browser.driver.manage().window().getSize().then(function(data){
                if (coordinates.x <= data.width-320 || coordinates.x >= data.width-55) {//55 and 320 will change if the drawer width or hamburger size/positioning changes.
                    return true;
                } else {
                    //return false;
                    return checkDrawerPosition();
                }
            });

        });
        //return deferred.promise;
    }

    function waitForAnimation(xCoordinate, comp) {
        browser.wait(checkDrawerPosition(), defaultTimeout);
    }

    drawer.clickHamburger = function() {
        drawer.container.isDisplayed().then(function(isDisplayed) {
            if(!isDisplayed) {
                //browser sync sometimes covers hamburger so we have to wait for it to go away before we can click on the hamburger
                browser.wait(EC.stalenessOf(browserSync) || EC.invisibilityOf(browserSync), defaultTimeout);
                //sometimes the drawer is in the middle of opening or closing. Wait for it to finish
                waitForAnimation();
                drawer.hamburger.click();
                browser.wait(EC.visibilityOf(drawer.links.get(0)), defaultTimeout);
            } else {
                //browser sync sometimes covers hamburger so we have to wait for it to go away before we can click on the hamburger
                browser.wait(EC.stalenessOf(browserSync) || EC.invisibilityOf(browserSync), defaultTimeout);

                //sometimes the drawer is in the middle of opening or closing. Wait for it to finish
                waitForAnimation();
                drawer.hamburger.click();
                browser.wait(EC.invisibilityOf(drawer.container), defaultTimeout);
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