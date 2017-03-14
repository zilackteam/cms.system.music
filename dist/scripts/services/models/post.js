app.factory('Post', function(RestService, urls, $http, Upload) {
    var rest = new RestService('post/');

    function upload(data) {
        return Upload.upload({
            url: urls.BASE_API + 'post/upload',
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