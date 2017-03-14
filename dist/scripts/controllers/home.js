app.controller('HomeCtrl', function($rootScope, $scope, $window, $timeout, $mdDialog, $location, $state, store, jwtHelper, User) {
    $rootScope.currentPage = {
        class: 'page-home',
        name: 'Dashboard'
    };

    $scope.currentUser = store.get('currentUser');
    if ($scope.currentUser.role == "admin") {
    	$scope.isAdmin = 1;
    } else {
    	$scope.isAdmin = 0;
    }
    
    if ($scope.currentUser.role == "singer") {
    	$state.go('singer', { 'singerId': $scope.currentUser.id});
    }
    
    User.rest.getList({singer: 1, is_admin: $scope.isAdmin}).then(function(response) {
        $scope.singers = response.data;
    }, function(responseError) {
        alert('Something wrong!');
    })
});