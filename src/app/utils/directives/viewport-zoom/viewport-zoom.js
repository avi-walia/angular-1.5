(function () {
    'use strict';
    angular.module('advisorLocator.utils')
        .directive('select', viewportZoomingDirective)
        .directive('input', viewportZoomingDirective);

    viewportZoomingDirective.$inject = ['$document'];

    function viewportZoomingDirective($document) {
        var maxScale = ',maximum-scale=',
            maxScaleRegex = /,*maximum\-scale\=\d*\.*\d*/;

        var viewport = _.find(
            $document[0].getElementsByTagName('meta'),
            function (tag) {
                return tag.name === 'viewport';
            }
        );
        var content = viewport.content;

        function changeViewport(event) {
            // http://nerd.vasilis.nl/prevent-ios-from-zooming-onfocus/
            if (event.type === 'blur') {
                viewport.content = content + (
                        content.match(maxScaleRegex, '') ? '' : maxScale + 10
                    );
            }
            else {
                viewport.content = content + maxScale + 1;
            }
        }

        return {
            link: function (scope, element) {
                element.on('focus blur', changeViewport);
            }
        };
    }


})();












