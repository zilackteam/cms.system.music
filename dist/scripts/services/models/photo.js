app.factory('Photo', function(RestService, urls, $http, Upload) {
    var rest = new RestService('photo/');

    function upload(data) {
        return Upload.upload({
            url: urls.BASE_API + 'photo/upload',
            data: data
        }).then(function (resp) {
            return resp.data;
        });
    }

    // Public API
    return {
        rest: rest,
        upload: upload
    }
});