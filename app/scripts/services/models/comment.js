app.factory('Comment', function(RestService, urls, $http, Upload) {
    var rest = new RestService('comment/');

    // Public API
    return {
        rest: rest,
        upload: upload
    }
});