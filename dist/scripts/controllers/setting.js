app.controller('SettingCtrl', function ($rootScope, $scope, $window, $timeout, $mdDialog, $location,
  $state, $stateParams, store, jwtHelper, User, Setting) {

  User.getAuthenticatedUser()
    .then(function (response) {
      $scope.currentUser = response.data;
    });

  $scope.setting = {};
  Setting.rest.get()
    .then(function (sucessRsp) {
      $scope.setting = sucessRsp.data;
    }, function (errorRsp) {
      alert('Something wrong. Please refresh or re-login');
    });

  $scope.updateSetting = function() {
    Setting.rest.post($scope.setting)
      .then(function (successRsp) {
        alert('Updated filter rules')
      }, function (errorRsp) {
        $scope.errorMsgs = errorRsp.data.error;
      });
  }

});