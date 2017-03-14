app.controller('SingerPhotoCtrl', function($rootScope, $scope, $window, $timeout, $mdDialog, $location, $state, $stateParams, store, jwtHelper, User, Photo) {
    $rootScope.currentPage = {
        class: 'page-singer-photo',
        name: 'Singer Photo ' + $stateParams.singerId
    };

    $scope.singerId = $stateParams.singerId;

    $scope.photos = [];
    Photo.rest.getList({singer_id: $scope.singerId})
        .then(function(response) {
            $scope.photos = response.data;
        });

    $scope.photo = '';
    $scope.openDialog = function(ev, photo) {
        $scope.progress = 0;
        if (photo) {
            $scope.photo = photo;
        } else {
            $scope.photo = {};
        }

        $scope.myImage = '';
        $scope.myCroppedImage = '';

        $mdDialog.show({
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            scope: $scope,        // use parent scope in template
            preserveScope: true,  // do not forget this if use parent scope
            templateUrl: "views/partials/form-photo-new.html"
        });
    };

    $scope.closeDialog = function() {
        $mdDialog.hide();
    };

    $scope.myImage = '';
    $scope.myCroppedImage = '';
    
    $scope.uploadPhoto = function(file) {
    	if (file) {
            // ng-img-crop
            var imageReader = new FileReader();
            imageReader.onload = function(image) {
                $scope.$apply(function($scope) {
                    $scope.myImage = image.target.result;
                });
            };
            imageReader.readAsDataURL(file);
        }
    	
        Photo.upload({
            file: file,
            singer_id: $stateParams.singerId
        }).then(function (resp) {
            $scope.photo.file_path = resp.link;
        }, function (resp) {
            alert('Unable to upload, please try again');
        }, function (evt) {
            $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
        });
    };

    $scope.submitPhoto = function(photo) {
        if (photo.id) {
            //Update
        	if ($scope.myImage) {
        		photo.thumb_path = $scope.myCroppedImage;
        	} else {
        		photo.thumb_path = '';
        	}
        	
            Photo.rest.update(photo).then(function(response) {
                alert('Photo updated successfully!');
                $scope.errorMsgs = [];
                $mdDialog.hide();

            }, function(responseError) {
                $scope.errorMsgs = responseError.data.error;
            })

        } else {
            //New

            photo.singer_id = $scope.singerId;
            photo.thumb_path = $scope.myCroppedImage;
            console.log(photo);

            Photo.rest.add(photo).then(function(response) {
                alert('New photo added successfully!');
                $scope.errorMsgs = [];
                $scope.photos.push(response.data);
                $scope.photo = {};
                $mdDialog.hide();

            }, function(responseError) {
                $scope.errorMsgs = responseError.data.error;
            })
        }
    }

    $scope.deletePhoto = function(photo) {
        if (confirm('Are you sure want to delete this photo ?')) {
            Photo.rest.delete(photo.id).then(function(response) {
                alert('Photo deleted successfully!');
                location.reload();
            }, function(responseError) {
                alert('Unable to delete photo');
            })
        }
    }
});