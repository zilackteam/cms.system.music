app.factory('App', function(RestService, urls, $http, Upload) {
    var rest = new RestService('apps/');

    // Public API
    return {
        rest: rest,
    }
});