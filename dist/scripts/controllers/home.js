app.controller('HomeCtrl', function($rootScope, $scope, $window, $timeout, $mdDialog, $location, $state, store, jwtHelper, App) {
    $rootScope.currentPage = {
        class: 'page-home',
        name: 'Dashboard'
    };

    $scope.currentUser = store.get('currentUser');

    $scope.apps = {};
    App.rest.getList({'auth_id': $scope.currentUser.id}).then(function(response) {
        $scope.apps = response.data;
    }, function(responseError) {
        alert('Something wrong!');
    });

    $scope.openDialog = function(ev) {
        $scope.application = {};

        $mdDialog.show({
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            scope: $scope,        // use parent scope in template
            preserveScope: true,  // do not forget this if use parent scope
            templateUrl: "views/partials/form-application.html"
        });
    };

    $scope.closeDialog = function() {
        $mdDialog.hide();
    };

    $scope.submitApp = function(application) {
        //New
        console.log(application);

        App.rest.add(application).then(function(response) {
            alert('New application added successfully!');
            $scope.errorMsgs = [];
            $scope.apps.push(response.data);
            $scope.application = {};
            $mdDialog.hide();
        }, function(responseError) {
            $scope.errorMsgs = responseError.data.error;
        })
    }
});