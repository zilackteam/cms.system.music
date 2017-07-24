app.factory('Video', function(RestService, urls, $http, Upload, $rootScope) {
    var rest = new RestService('video/');

    function upload(data) {
        return Upload.upload({
            url: urls.BASE_API + 'video/upload',
            data: data
        }).then(function (response) {
            var data = $rootScope.decrypt(response.data);
            return data.link;
        });
    }

    // Public API
    return {
        rest: rest,
        upload: upload
    }
});