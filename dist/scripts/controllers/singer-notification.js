app.controller('SingerNotificationCtrl', function($rootScope, $scope, $window, $timeout, $mdDialog, $location, $state, $stateParams, store, jwtHelper, User, Notification) {
    $rootScope.currentPage = {
        class: 'page-singer-notification',
        name: 'Singer Version ' + $stateParams.contentId
    };

    $scope.contentId = $stateParams.contentId;

    Notification.rest.getList({content_id: $scope.contentId})
        .then(function(response) {
            $scope.notifications = response.data;
        });

    $scope.query = {
        order: '',
        limit: 10,
        page: 1
    };

    $scope.notification = '';
    $scope.openDialog = function(ev, notification) {
        if (notification) {
            $scope.notification = notification;
        } else {
            $scope.notification = {};
        }

        $mdDialog.show({
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            scope: $scope,        // use parent scope in template
            preserveScope: true,  // do not forget this if use parent scope
            templateUrl: "views/partials/form-notification.html"
        });
    };

    $scope.closeDialog = function() {
        $mdDialog.hide();
    };

    $scope.submitNotification = function(notification) {
        //New
        notification.content_id = $scope.contentId;

        Notification.rest.add(notification).then(function(response) {
            alert('New notification added successfully!');
            $scope.errorMsgs = [];
            $scope.notifications.push(response.data);

            $scope.notification = {};
            $mdDialog.hide();
        }, function(responseError) {
            $scope.errorMsgs = responseError.data.error;
        })
    }
});