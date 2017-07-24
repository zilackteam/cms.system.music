app.factory('Setting', function (RestService, urls, $http, $rootScope) {
  var rest = {};

  rest.get = function () {
    return $http.get(urls.BASE_API + 'setting/')
      .then(function (response) {
        return $rootScope.decrypt(response.data);
      });
  };

  rest.post = function (item) {
    return $http.post(urls.BASE_API + 'setting/', item)
      .then(function (response) {
        return $rootScope.decrypt(response.data);
      });
  };

  // Public API
  return {
    rest: rest
  }
});