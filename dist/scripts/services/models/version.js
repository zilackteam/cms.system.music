app.factory('Version', function (RestService, urls, $http, Upload, $rootScope) {
  var rest = new RestService('version/');

  rest.listing = function(options) {
    var params = options || {};

    return $http
      .get(urls.BASE_API + 'version/listing', {
        params: params
      })
      .then(function(response) {
        return $rootScope.decrypt(response.data);
      });
  };

  // Public API
  return {
    rest: rest,
  }
});