app.controller('UserCtrl', function($rootScope, $scope, $window, $timeout, $mdDialog, $location, $state, $stateParams, store, jwtHelper, User) {
    $rootScope.currentPage = {
        class: 'page-user',
        name: 'User Management'
    };
    
    $scope.currentUser = store.get('currentUser');
    if ($scope.currentUser.role == "admin") {
    	$scope.isAdmin = true;
    }
    
    // List page
    $scope.query = {
        filter: '',
        order: '',
        limit: 10,
        page: 1
    };

    $scope.users = [];
    User.rest.getList().then(function(response){
        $scope.users = response.data;
    })
    
    $scope.deleteUser = function(user) {
    	if (confirm('Are you sure want to delete user ' + user.email + ' ?')) {
    		User.rest.delete(user.id).then(function(response) {
                alert('User deleted successfully!');
                location.reload();
            }, function(responseError) {
                alert('Unable to delete user');
            })
        }
    }

});

app.controller('UserCreateCtrl', function($rootScope, $scope, $window, $timeout, $mdDialog, $location, $state, $stateParams, store, jwtHelper, User) {
    $rootScope.currentPage = {
        class: 'page-add-user',
        name: 'New User'
    };

    $scope.user = {};
    $scope.createUser = function() {
        User.rest.add($scope.user).then(function(response) {
            $scope.errorMsgs = [];
            alert('New user has been created successfully!');
            $state.go('user');
        }, function(responseError) {
            $scope.errorMsgs = responseError.data.error;
        })
    }


});

app.controller('UserUpdateCtrl', function($rootScope, $scope, $window, $timeout, $mdDialog, $location, $state, $stateParams, $filter, store, jwtHelper, User, Upload, urls) {
    $rootScope.currentPage = {
        class: 'page-update-user',
        name: 'Update User'
    };

    var userId = $stateParams.userId;

    //Get user info
    $scope.user = {};
    $scope.user.dob = ' ';
    User.rest.get(userId).then(function(response) {
        $scope.user = response.data;
        
        if ($scope.user.role == "mod") {
        	$scope.isMod = true;
        	
        	console.log($scope.user.singer);
        }
    },function(responseError) {
        if (responseError.status == 404) {
            alert('User not found');
        } else {
            alert('Invalid request');
        }
        $state.go('user');
    });
    
    User.rest.getList({"singer": true}).then(function(response){
        $scope.singers = response.data;
    })

    $scope.doUpdate= function() {
        User.rest.update($scope.user).then(function(response) {
            $scope.errorMsgs = [];

            //Reload object user
            $scope.user = response.data;

            //Inform user
            alert('User has been updated successfully!');
        }, function(responseError) {
            $scope.errorMsgs = responseError.data.error;
        })
    };

    // Upload avatar
    $scope.uploadAvatar = function(avatar) {
        User.uploadAvatar({
            id: userId,
            avatar: avatar
        })
            .then(function(response) {
                $scope.user.avatar = response.data.data;
                avatar.uploaded = true;
                alert('Avatar updated');
            }, function(responseError) {
                $scope.uploadErrors = responseError.data.error;
                alert('Unable to upload avatar. Please try again!');
            }, function (evt) {
                avatar.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
    };

    $scope.clearUpload = function() {
        $scope.avatar = null;
        $scope.uploadErrors = [];
    }

});