app.factory('Show', function(RestService, urls, $http, Upload) {
    var rest = new RestService('show/');

    // Public API
    return {
        rest: rest
    }
});