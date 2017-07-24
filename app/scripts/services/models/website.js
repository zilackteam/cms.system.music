app.factory('Website', function (RestService, urls, $http, Upload, $rootScope) {
  var rest = new RestService('website/');

  rest.add = function(contentId) {
    return $http.post(urls.BASE_API + 'website/' + contentId + '/setup/', [])
      .then(function(response) {
        return $rootScope.decrypt(response.data);
      })
  };

  rest.get = function (contentId, type) {
    return $http.get(urls.BASE_API + 'website/' + contentId + '/content/' + type, [])
      .then(function (response) {
        return $rootScope.decrypt(response.data);
      })
  };

  rest.update = function (data) {
    return $http.put(urls.BASE_API + 'website/' + data.content_id + '/update/', data)
      .then(function (response) {
        return $rootScope.decrypt(response.data);
      })
  };

  function upload(data) {
    return Upload.upload({
      url: urls.BASE_API + 'website/upload',
      data: data
    }).then(function (response) {
      var data = $rootScope.decrypt(response.data);
      return data.link;
    });
  }

  // Public API
  return {
    rest: rest,
    upload: upload
  }
});