app.factory('Album', function(RestService, urls, $http, Upload) {
    var rest = new RestService('album/');

    rest.add = function(item) {
        //Default method is POST
        angular.forEach(item, function(v, k) {
            if (v == null) item[k] = undefined;
        });

        return Upload.upload({
            url: urls.BASE_API + 'album',
            data: item
        }).then(function(response) {
            return response.data
        });
    };

    rest.update = function(item) {
        //Default method is POST
        angular.forEach(item, function(v, k) {
            if (v == null) item[k] = undefined;
        });

        return Upload.upload({
            url: urls.BASE_API + 'album/' + item.id,
            data: item
        }).then(function(response) {
            return response.data
        });
    };

    rest.removeSong = function(item) {
        //Default method is POST
        angular.forEach(item, function(v, k) {
            if (v == null) item[k] = undefined;
        });

        return Upload.upload({
            url: urls.BASE_API + 'album/' + item.id + '/removeSong',
            data: item
        }).then(function(response) {
            return response.data
        });
    };

    // Public API
    return {
        rest: rest
    }
});