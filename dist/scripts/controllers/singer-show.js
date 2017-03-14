app.controller('SingerShowCtrl', function($rootScope, $scope, $window, $timeout, $mdDialog, $location, $state, $stateParams, store, jwtHelper, User, Show) {
    $rootScope.currentPage = {
        class: 'page-singer-show',
        name: 'Singer Show ' + $stateParams.singerId
    };

    $scope.singerId = $stateParams.singerId;

    Show.rest.getList({singer_id: $scope.singerId})
        .then(function(response) {
            $scope.shows = response.data;
        });

    $scope.query = {
        order: '',
        limit: 10,
        page: 1
    };

    $scope.show = '';
    $scope.openDialog = function(ev, show) {
        if (show) {
            $scope.show = show;
            show.on_datetime = moment(show.on_datetime).format();
        } else {
            $scope.show = {};
        }

        $mdDialog.show({
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            scope: $scope,        // use parent scope in template
            preserveScope: true,  // do not forget this if use parent scope
            templateUrl: "views/partials/form-show.html"
        });
    };

    $scope.closeDialog = function() {
        $mdDialog.hide();
    };

    $scope.submitShow = function(show) {
        if (show.id) {
            //Update
            show.on_datetime = moment(show.on_datetime).format();

            Show.rest.update(show).then(function(response) {
                alert('Show updated successfully!');
                $scope.errorMsgs = [];

            }, function(responseError) {
                $scope.errorMsgs = responseError.data.error;
            })

        } else {
            //New

            show.singer_id = $scope.singerId;

            show.on_datetime = moment(show.on_datetime).format();
            
            if (!show.end_date) {
            	show.end_date = moment(show.on_datetime).format('YYYY-MM-DD');
            }

            Show.rest.add(show).then(function(response) {
                alert('New show added successfully!');
                $scope.errorMsgs = [];
                $scope.shows.push(response.data);

                $scope.show = {};

            }, function(responseError) {
                $scope.errorMsgs = responseError.data.error;
            })
        }
    }

    $scope.deleteShow = function(show) {
        if (confirm('Are you sure want to delete show ' + show.name + ' ?')) {
            Show.rest.delete(show.id).then(function(response) {
                alert('Show deleted successfully!');
                location.reload();
            }, function(responseError) {
                alert('Unable to delete show');
            })
        }
    }

});