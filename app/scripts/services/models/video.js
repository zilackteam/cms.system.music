app.factory('Video', function(RestService, urls, $http, Upload) {
    var rest = new RestService('video/');

    function upload(data) {
        return Upload.upload({
            url: urls.BASE_API + 'video/upload',
            data: data
        }).then(function (resp) {
            return resp.data.link;
        });
    }

    // Public API
    return {
        rest: rest,
        upload: upload
    }
});