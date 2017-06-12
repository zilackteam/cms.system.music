app.factory('Live', function (RestService, urls, $http, Upload) {
    var rest = new RestService('live/');

    // Public API
    return {
        rest: rest,
    }
});