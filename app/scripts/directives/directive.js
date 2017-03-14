app.directive('errorBlock', function() {
    return {
        restrict: 'EA',
        templateUrl: 'views/partials/error-messages.html',
        scope: {
            messages: '='
        },
        link: function(scope, ele, attr) {

        }
    }
});

app.directive('stopEvent', function() {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if(attr && attr.stopEvent)
                element.bind(attr.stopEvent, function (e) {
                    e.stopPropagation();
                });
        }
    };
})