app.factory('Notification', function (RestService, urls, $http, Upload) {
    var rest = new RestService('notification/');

    // Public API
    return {
        rest: rest,
    }
});