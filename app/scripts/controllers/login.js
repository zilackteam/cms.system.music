app.controller('LoginCtrl', function($rootScope, $scope, $window, $timeout, $mdDialog, $location, $state, store, jwtHelper, User) {
    $rootScope.currentPage = {
        class: 'page-public page-login',
        name: 'Login'
    };

    $scope.user = {};
    $scope.errorMsgs = [];
    $scope.doLogin = function() {
        User.login($scope.user).then(function(response) {
            store.set('jwt', response.data.token);
            store.set('currentUser', response.data.user);

            $state.go('/');
        }, function(responseError) {
            $scope.errorMsgs = responseError.data.error;
        });
    }
});

app.controller('ForgotCtrl', function($rootScope, $scope, $window, $timeout, $mdDialog, $location, $state, store, jwtHelper, User) {
    $rootScope.currentPage = {
        class: 'page-public page-forgot',
        name: 'Forgot your password?'
    };

    $scope.doForgotPassword = function() {
        User.forgotPassword($scope.user).then(function(response) {
            alert('Please check your inbox');
            $scope.errorMsgs = [];
            $scope.user = {};
        }, function(responseError) {
            $scope.errorMsgs = responseError.data.error;
        });
    }
});

app.controller('ResetCtrl', function($rootScope, $scope, $window, $timeout, $mdDialog, $location, $state, $stateParams, store, jwtHelper, User) {
    $rootScope.currentPage = {
        class: 'page-public page-reset',
        name: 'Reset password'
    };

    //Verify token
    User.verifyForgotToken($stateParams.token).then(function(response) {
    }, function(responseError) {
        alert('Your reset password token was expired or invalid. Please re-submit your request');
        $state.go('forgot');
    });

    $scope.user = {
        token: $stateParams.token
    };
    // Update new password
    $scope.updatePassword = function() {
        User.resetPassword($scope.user).then(function(response) {
            $scope.errorMsgs = [];
            $scope.user = {};
            alert('Password updated! Please login with your new password');
            $state.go('login');
        }, function(responseError) {
            $scope.errorMsgs = responseError.data.error;
        })
    }
});