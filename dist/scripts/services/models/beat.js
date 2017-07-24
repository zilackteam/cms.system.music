app.factory('Beat', function(RestService, urls, $http, Upload, $rootScope) {
    var rest = new RestService('beat/');

    rest.update = function(item) {
        //Default method is POST
        angular.forEach(item, function(v, k) {
            if (v == null) item[k] = undefined;
        });

        return Upload.upload({
            url: urls.BASE_API + 'beat/' + item.id,
            data: item
        }).then(function(response) {
            return $rootScope.decrypt(response.data);
        });
    };

    var deleteBeats = function(item){
        return $http
            .post(urls.BASE_API + 'beat/delete', item)
            .then(function(response) {
                return $rootScope.decrypt(response.data);
            });
    };

    var featureBeats = function(item){
        return $http
            .post(urls.BASE_API + 'beat/feature', item)
            .then(function(response) {
                return $rootScope.decrypt(response.data);
            });
    };

    var publicBeats = function(item){
        return $http
            .post(urls.BASE_API + 'beat/set-public', item)
            .then(function(response) {
                return $rootScope.decrypt(response.data);
            });
    };

    // Public API
    return {
        rest: rest,
        deleteBeats: deleteBeats,
        featureBeats: featureBeats,
        publicBeats: publicBeats
    }
});