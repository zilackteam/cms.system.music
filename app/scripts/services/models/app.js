app.factory('App', function(RestService, urls, $http, Upload, $rootScope) {
    var rest = new RestService('apps/');

    rest.update = function(item) {
        //Default method is POST
        angular.forEach(item, function(v, k) {
            if (v == null) item[k] = undefined;
        });

        return Upload.upload({
            url: urls.BASE_API + 'apps/' + item.content_id,
            data: item
        }).then(function(response) {
            return $rootScope.decrypt(response.data);
        });
    };

    // Public API
    return {
        rest: rest,
    }
});