app.factory('News', function(RestService, urls, $http, Upload) {
    var rest = new RestService('news/');

    function upload(data) {
        return Upload.upload({
            url: urls.BASE_API + 'news/upload',
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