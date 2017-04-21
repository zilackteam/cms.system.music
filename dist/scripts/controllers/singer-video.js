app.controller('SingerVideoCtrl', function($rootScope, $scope, $window, $timeout, $mdDialog, $location, $state, $stateParams,
                                           store, jwtHelper, User, Video, Song, Album) {

    $scope.query = {
        order: '',
        limit: 10,
        page: 1
    };

    $scope.contentId = $stateParams.contentId;
    
    $scope.categories = {1: 'MV Official', 2: 'Nhạc Ảnh', 3: 'Sự Kiện', 4: 'Fan'};

    $scope.videos = [];
    Video.rest.getList({content_id: $scope.contentId}).then(function(response) {
        $scope.videos = response.data;
    });

    $scope.video = '';
    $scope.openDialog = function(ev, video) {
        $scope.progress = 0;
        if (video) {
            $scope.video = video;
        } else {
            $scope.video = '';
        }

        $mdDialog.show({
            clickOutsideToClose: true,
            scope: $scope,        // use parent scope in template
            preserveScope: true,  // do not forget this if use parent scope
            templateUrl: "views/partials/form-video.html"
        });
    };

    $scope.closeDialog = function() {
        $mdDialog.hide();
    };

    $scope.submitVideo = function(videoId) {
        if (videoId) {
            Video.rest.update($scope.video).then(function(response) {
                alert('Video updated successfully!');
                $scope.errorMsgs = [];
            }, function(responseError) {
                $scope.errorMsgs = responseError.data.error;
            })
        } else {
            $scope.video.content_id = $scope.contentId;
            Video.rest.add($scope.video).then(function(response) {
                //Inform user + clear error
                alert('Video created successfully!');
                $scope.errorMsgs = [];
                $scope.video = '';

                //Update list data & close modal
                $scope.videos.push(response.data);
                $mdDialog.hide();
            }, function(responseError) {
                $scope.errorMsgs = responseError.data.error;
            })
        }
    };

    $scope.deleteVideo = function(videoId) {
        if (confirm('Are you sure that you want to delete video ' + $scope.video.name + '?')) {
            Video.rest.delete(videoId).then(function(response) {
                alert('Video deleted successfully');
                location.reload();
            }, function(responseError) {
                alert('Unable to delete video');
            })
        }
    }

    $scope.uploadThumb = function(file) {
    	if (file) {
    		Video.upload({
                file: file,
                content_id: $scope.contentId
            }).then(function (resp) {
                $scope.video.thumb_url = resp;
            }, function (resp) {
                alert('Unable to upload, please try again');
            }, function (evt) {
                $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
            });
    	}
    };

    
    $scope.featureVideo = function(video) {
    	Video.rest.update(video).then(function(response) {
            $scope.errorMsgs = [];
        }, function(responseError) {
            $scope.errorMsgs = responseError.data.error;
        },function(evt) {
        	
        })
    }
});