app.factory('Website', function (RestService, urls, $http, Upload) {
  var rest = new RestService('website/');

  rest.add = function(singerId) {
    return $http.post(urls.BASE_API + 'website/' + singerId + '/setup/', [])
      .then(function(response) {
        return response.data
      })
  };

  rest.get = function (singerId, type) {
    return $http.get(urls.BASE_API + 'website/' + singerId + '/content/' + type, [])
      .then(function (response) {
        return response.data
      })
  };

  rest.update = function (data) {
    return $http.put(urls.BASE_API + 'website/' + data.singer_id + '/update/', data)
      .then(function (response) {
        return response.data
      })
  };

  function upload(data) {
    return Upload.upload({
      url: urls.BASE_API + 'website/upload',
      data: data
    }).then(function (resp) {
      return resp.data.link;
    });
  }

  // Public API
  return {
    rest: rest,
    upload: upload
  }
});