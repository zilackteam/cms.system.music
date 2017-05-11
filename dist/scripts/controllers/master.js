app.controller('MasterCtrl', function($rootScope, $scope, $window, $timeout, $mdDialog, $location, $state, $stateParams, store, jwtHelper, Master) {
    $rootScope.currentPage = {
        class: 'page-master',
        name: 'Master Management'
    };

    $scope.currentUser = store.get('currentUser');

    // List page
    $scope.query = {
        filter: '',
        order: '',
        limit: 10,
        page: 1
    };

    $scope.masters = [];
    Master.rest.getList().then(function(response){
        $scope.masters = response.data;
    })

    $scope.deleteMaster = function(master) {
        if (confirm('Are you sure want to delete user ' + master.name + ' ?')) {
            Master.rest.delete(master.id).then(function(response) {
                alert('Master deleted successfully!');
                location.reload();
            }, function(responseError) {
                alert('Unable to delete user');
            })
        }
    }

});

app.controller('MasterCreateCtrl', function($rootScope, $scope, $window, $timeout, $mdDialog, $location, $state, $stateParams, store, jwtHelper, Master, App) {
    $rootScope.currentPage = {
        class: 'page-add-master',
        name: 'New Master'
    };

    $scope.currentUser = store.get('currentUser');

    $scope.master = {};
    $scope.apps = {};

    App.rest.getList({'auth_id': $scope.currentUser.id}).then(function(response) {
        $scope.apps = response.data;
    }, function(responseError) {
        alert('Something wrong!');
    });

    $scope.createMaster = function() {
        Master.rest.add($scope.master).then(function(response) {
            $scope.errorMsgs = [];
            alert('New master has been created successfully!');
            $state.go('master');
        }, function(responseError) {
            $scope.errorMsgs = responseError.data.error;
        })
    }


});

app.controller('MasterUpdateCtrl', function($rootScope, $scope, $window, $timeout, $mdDialog, $location, $state, $stateParams, $filter, store, jwtHelper, Master, App, Upload, urls) {
    $rootScope.currentPage = {
        class: 'page-update-master',
        name: 'Update Master'
    };

    $scope.currentUser = store.get('currentUser');

    var masterId = $stateParams.masterId;

    $scope.apps = {};

    App.rest.getList({'auth_id': $scope.currentUser.id}).then(function(response) {
        $scope.apps = response.data;
    }, function(responseError) {
        alert('Something wrong!');
    });

    //Get user info
    $scope.master = {};
    $scope.master.dob = ' ';

    Master.rest.get(masterId).then(function(response) {
        $scope.master = response.data;
        $scope.master.sec_name = $scope.master.sec_name;
        $scope.master.sec_pass = $scope.master.sec_pass;
    },function(responseError) {
        if (responseError.status == 404) {
            alert('Master not found');
        } else {
            alert('Invalid request');
        }
        $state.go('master');
    });

    $scope.doUpdate= function() {
        Master.rest.update($scope.master).then(function(response) {
            $scope.errorMsgs = [];

            //Reload object user
            $scope.master = response.data;
            $scope.master.sec_name = $scope.master.sec_name;
            $scope.master.sec_pass = $scope.master.sec_pass;

            //Inform user
            alert('Master has been updated successfully!');
        }, function(responseError) {
            $scope.errorMsgs = responseError.data.error;
        })
    };

    // Upload avatar
    $scope.uploadAvatar = function(avatar) {
        console.log('aaa');
        Master.uploadAvatar({
                id: $scope.master.id,
                avatar: avatar
            })
            .then(function(response) {
                $scope.master.avatar = response.data.avatar;
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