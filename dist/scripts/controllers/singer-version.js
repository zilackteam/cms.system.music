app.controller('SingerVersionCtrl', function($rootScope, $scope, $window, $timeout, $mdDialog, $location, $state, $stateParams, store, jwtHelper, User, Version) {
    $rootScope.currentPage = {
        class: 'page-singer-version',
        name: 'Singer Version ' + $stateParams.contentId
    };
    
    $scope.contentId = $stateParams.contentId;
    
    Version.rest.listing({content_id: $scope.contentId})
    .then(function(response) {
        $scope.versions = response.data;
    });

	$scope.query = {
	    order: '',
	    limit: 10,
	    page: 1
	};
	
	$scope.version = '';
    $scope.openDialog = function(ev, version) {
        if (version) {
            $scope.version = version;
        } else {
            $scope.version = {};
        }

        $mdDialog.show({
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            scope: $scope,        // use parent scope in template
            preserveScope: true,  // do not forget this if use parent scope
            templateUrl: "views/partials/form-version.html"
        });
    };

    $scope.closeDialog = function() {
        $mdDialog.hide();
    };
    
    $scope.submitVersion = function(version) {
        if (version.id) {
        	//Update
        	Version.rest.update(version).then(function(response) {
                alert('Version updated successfully!');
                $scope.errorMsgs = [];

            }, function(responseError) {
                $scope.errorMsgs = responseError.data.error;
            })
        } else {
            //New
        	version.content_id = $scope.contentId;

        	Version.rest.add(version).then(function(response) {
                alert('New version added successfully!');
                $scope.errorMsgs = [];
                $scope.versions.push(response.data);

                $scope.version = {};
                $mdDialog.hide();
            }, function(responseError) {
                $scope.errorMsgs = responseError.data.error;
            })
        }
    }

    $scope.deleteVersion = function(version) {
        if (confirm('Are you sure want to delete version ' + version.version + ' ?')) {
        	Version.rest.delete(version.id).then(function(response) {
                alert('Version deleted successfully!');
                location.reload();
            }, function(responseError) {
                alert('Unable to delete version');
            })
        }
    }
});