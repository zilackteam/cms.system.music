app.factory('Song', function(RestService, urls, $http, Upload, $rootScope) {
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
            return $rootScope.decrypt(response.data);
        });
    };

    var deleteSongs = function(item){
        return $http
            .post(urls.BASE_API + 'song/delete', item)
            .then(function(response) {
                return $rootScope.decrypt(response.data);
            });
    };

    var featureSongs = function(item){
        return $http
            .post(urls.BASE_API + 'song/feature', item)
            .then(function(response) {
                return $rootScope.decrypt(response.data);
            });
    };

    var publicSongs = function(item){
        return $http
            .post(urls.BASE_API + 'song/set-public', item)
            .then(function(response) {
                return $rootScope.decrypt(response.data);
            });
    };

    // Public API
    return {
        rest: rest,
        deleteSongs: deleteSongs,
        featureSongs: featureSongs,
        publicSongs: publicSongs
    }
});