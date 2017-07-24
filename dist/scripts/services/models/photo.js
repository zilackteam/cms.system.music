app.factory('Photo', function(RestService, urls, $http, Upload, $rootScope) {
    var rest = new RestService('photo/');

    function upload(data) {
        return Upload.upload({
            url: urls.BASE_API + 'photo/upload',
            data: data
        }).then(function (response) {
            return $rootScope.decrypt(response.data);
        });
    }

    // Public API
    return {
        rest: rest,
        upload: upload
    }
});