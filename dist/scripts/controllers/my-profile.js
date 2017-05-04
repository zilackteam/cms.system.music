app.controller('MyProfileCtrl', function($rootScope, $scope, $window, $timeout, $mdDialog, $location, $state, $stateParams, store, jwtHelper, User) {
  User.getAuthenticatedUser().then(function(response) {
    $scope.currentUser = response.data;
  });
  
  $scope.changePassword = function(user) {
  	User.changePassword(user).then(function(response) {
        $scope.errorMsgs = [];

        //Reload object user
        $scope.currentUser = response.data;

        //Inform user
        alert('Password has been changed successfully!');
    }, function(responseError) {
        $scope.errorMsgsPassword = responseError.data.error;
    })
  }
  
  $scope.updateProfile = function(user) {
  	User.changeInfo(user).then(function(response) {
        $scope.errorMsgs = [];

        //Reload object user
        $scope.currentUser = response.data;

        //Inform user
        alert('User has been updated successfully!');
    }, function(responseError) {
        $scope.errorMsgsProfile = responseError.data.error;
    })
  }
});