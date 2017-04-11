app.controller('HomeCtrl', function($rootScope, $scope, $window, $timeout, $mdDialog, $location, $state, store, jwtHelper, App) {
    $rootScope.currentPage = {
        class: 'page-home',
        name: 'Dashboard'
    };

    $scope.currentUser = store.get('currentUser');

    App.rest.getList({}).then(function(response) {
        $scope.apps = response.data;
    }, function(responseError) {
        alert('Something wrong!');
    })
});