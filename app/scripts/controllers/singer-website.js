app.controller('SingerWebsiteCtrl', function ($rootScope, $scope, $window, $timeout, $mdDialog, $location, $state, $stateParams,
                                              store, jwtHelper, urls, User, Website) {
  $rootScope.currentPage = {
    class: 'page-singer-website',
    name: 'Singer Website ' + $stateParams.singerId
  };

  $scope.singerId = $stateParams.singerId;

  //Fetching data
  Website.rest.get($scope.singerId).then(function (success) {
    $scope.website = success.data;
  }, function (error) {
    if (error.status === 404) {
      alert('No website found. Please setup a new one');
      $scope.allowCreate = true;
    }
  });

  var setup = function () {
    Website.rest.add($scope.singerId)
      .then(function (success) {
        alert('Singer Website content is setup OK');
        $scope.allowCreate = false;
      }, function (error) {
        alert('Unable to setup Singer Website content');
        $scope.allowCreate = true;
      });
  };

  var update = function(type) {

    var request = {
      singer_id : $scope.singerId
    };
    request[type + '_title'] = $scope.website[type + '_title'];
    request[type + '_content'] = $scope.website[type + '_content'];
    
    if (type == 'bio') {
    	request['singer_info'] = $scope.website['singer_info'];
    	request['facebook'] = $scope.website['facebook'];
    	request['twitter'] = $scope.website['twitter'];
    	request['instagram'] = $scope.website['instagram'];
    }

    Website.rest.update(request).then(function (success) {
      alert('Updated successfully!');
    }, function (error) {
      $scope[type + 'Errors'] = error.data.error;
    });

  };

  $scope.websiteAction = {
    setup: setup,
    update: update
  };


  //CMS
  $scope.froalaOptions = {
    imageUploadURL:  urls.BASE_API + 'website/upload',
    imageUploadParams: {
      upload_type: 'image',
      singer_id: $scope.singerId
    },
    requestWithCORS: false,
    requestHeaders: {
      Authorization: 'Bearer ' + store.get('jwt')
    }
  };

});