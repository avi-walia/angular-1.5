var defaultTimeout = 1000;
var browserSync = element(by.id('__bs_notify__'));
var _ = require('lodash');
function mobileNavBar() {
    var mnb = this;
    mnb.container = element(by.id('nav'));
    mnb.hamburger = $("#drawerlink");
    mnb.links = element.all(by.css('#nav li a'));
    mnb.logo = element(by.css("#nav>span>img[src='./assets/images/logos.svg']"));

    mnb.newLink = function(text, href, visibility) {
        if (visibility == undefined){
            visibility = true;
        }
        return {
            text: text,
            href: href,
            visibility: visibility
        };
    }
    mnb.clickHamburger = function() {
        mnb.container.isDisplayed().then(function(isDisplayed) {
            if(!isDisplayed) {
                //browser sync sometimes covers hamburger so we have to wait for it to go away before we can click on the hamburger
                browser.wait(protractor.ExpectedConditions.stalenessOf(browserSync) || protractor.ExpectedConditions.invisibilityOf(browserSync), defaultTimeout);
                $("#drawerlink").click();
                browser.wait(protractor.ExpectedConditions.visibilityOf(mnb.links.get(0)), defaultTimeout);
                console.log('shown');
            } else {
                //browser sync sometimes covers hamburger so we have to wait for it to go away before we can click on the hamburger
                browser.wait(protractor.ExpectedConditions.stalenessOf(browserSync) || protractor.ExpectedConditions.invisibilityOf(browserSync), defaultTimeout);
                $("#drawerlink").click();
                browser.wait(protractor.ExpectedConditions.invisibilityOf(mnb.links.get(0)), defaultTimeout);
                console.log('hidden');
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
        _.forEach(expectedLinks, function(expectedLink, index) {
            expect(mnb.links.get(index).isDisplayed()).toEqual(expectedLink.visibility);
            if (expectedLink.visibility) {
                expect(mnb.links.get(index).getText()).toEqual(expectedLink.text);
            } else {
                expect(mnb.links.get(index).getText()).toEqual('');
            }
            if (expectedLinks.href != null) {
                expect(mnb.links.get(index).getAttribute('href')).toEqual(expectedLink.href);
            }
        });
    };
    return this;
}
module.exports = {
    mobileNavBar: mobileNavBar(),
    browserSync: browserSync,
    defaultTimeout: defaultTimeout
};