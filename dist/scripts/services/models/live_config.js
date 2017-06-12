app.factory('LiveConfig', function (RestService, urls, $http, Upload) {
    var rest = new RestService('live_config/');

    // Public API
    return {
        rest: rest,
    }
});