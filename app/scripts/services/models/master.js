app.factory('Master', function(RestService, urls, $http, Upload) {
    var rest = new RestService('master/');

    var uploadAvatar = function(data) {
        //Default method is POST
        return Upload.upload({
            url: urls.BASE_API + 'auth/avatar',
            data: data
        });
    };

    // Public API
    return {
        rest: rest,
        uploadAvatar: uploadAvatar,
    }
});