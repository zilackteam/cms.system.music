app.factory('Category', function(RestService, urls, $http) {
    var rest = new RestService('category/');

    // Public API
    return {
        rest: rest
    }
});