app.factory('Song', function(RestService, urls, $http, Upload) {
    var rest = new RestService('song/');

    rest.update = function(item) {
        //Default method is POST
        angular.forEach(item, function(v, k) {
           if (v == null) item[k] = undefined;
        });

        return Upload.upload({
            url: urls.BASE_API + 'song/' + item.id,
            data: item
        }).then(function(response) {
            return response.data;
        });
    };

    // Public API
    return {
        rest: rest
    }
});