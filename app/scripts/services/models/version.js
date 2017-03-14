app.factory('Version', function (RestService, urls, $http, Upload) {
  var rest = new RestService('version/');
  
  // Public API
  return {
    rest: rest,
  }
});