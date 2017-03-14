app.factory('Setting', function (RestService, urls, $http) {
  var rest = {};

  rest.get = function () {
    return $http.get(urls.BASE_API + 'setting/')
      .then(function (response) {
        return response.data
      });
  };

  rest.post = function (item) {
    return $http.post(urls.BASE_API + 'setting/', item)
      .then(function (response) {
        return response.data
      });
  };

  // Public API
  return {
    rest: rest
  }
});