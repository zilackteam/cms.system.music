app.controller('SingerSingleCtrl', function($rootScope, $scope, $window, $timeout, $mdDialog, $location, $state, $stateParams,
		              store, jwtHelper, User, Album) {
    $rootScope.currentPage = {
        class: 'page-singer-single',
        name: 'Single Management'
    };

    $scope.contentId = $stateParams.contentId;
    $scope.albums = [];

    Album.rest.getList({content_id : $scope.contentId, is_single: 1, includes: 'songs'}).then(function(response) {
        $scope.albums = response.data;
    });
    
    $scope.query = {
        order: '',
        limit: 10,
        page: 1
    };

    $scope.album = '';
    $scope.openDialog = function(ev, album) {
        if (album) {
            $scope.album = album;
            $scope.albumImg = null;
        } else {
            $scope.album = '';
        }

        $mdDialog.show({
            clickOutsideToClose: true,
            scope: $scope,        // use parent scope in template
            preserveScope: true,  // do not forget this if use parent scope
            templateUrl: "views/partials/form-album.html"
        });
    };

    $scope.closeDialog = function() {
        $mdDialog.hide();
    };

    $scope.submitAlbum = function(albumId) {

        if (albumId) {
            Album.rest.update({
                id: $scope.album.id,
                name: $scope.album.name,
                description: $scope.album.description,
                thumb_img: $scope.album.thumb_img,
                is_public: $scope.album.is_public,
                keywords: $scope.album.keywords,
                is_single: 1,
            }).then(function(response) {
                alert('Single updated successfully!');
                $scope.errorMsgs = [];
                $scope.album.thumb_img = response.data.thumb_img;
            }, function(responseError) {
                $scope.errorMsgs = responseError.data.error;
            }, function(evt) {
                $scope.album.progress = parseInt(100.0 * evt.loaded / evt.total);
            })
        } else {
            Album.rest.add({
                content_id: $scope.contentId,
                name: $scope.album.name,
                description: $scope.album.description,
                thumb_img: $scope.album.thumb_img,
                is_public: $scope.album.is_public,
                keywords: $scope.album.keywords,
                is_single: 1,
            }).then(function(response) {
                //Inform user + clear error
                alert('Single created successfully!');
                $scope.errorMsgs = [];

                //Update list data
                $scope.albums.push(response.data);
            }, function(responseError) {
                $scope.errorMsgs = responseError.data.error;
            }, function(evt) {
                $scope.album.progress = parseInt(100.0 * evt.loaded / evt.total);
            })
        }
    };

    $scope.clearUpload = function() {
        $scope.albumImg = null;
        $scope.uploadErrors = [];
    }

    $scope.deleteAlbum = function(albumId) {
        var ableDelete = true;
        angular.forEach($scope.albums, function(album) {
           if (album.id == albumId && album.songs.length) {
               ableDelete = false;
           }
        });

        if (ableDelete) {
            if (confirm('Are you sure that you want to single album ' + $scope.album.name + '?')) {
                Album.rest.delete(albumId).then(function(response) {
                    alert('Single deleted successfully');
                    location.reload();
                }, function(responseError) {
                    alert('Unable to delete single');
                })
            }
        } else {
            alert('You cant delete single that have songs');
        }


    }
    
    $scope.featureAlbum = function(album) {
    	data = {id: album.id, name: album.name, is_feature: album.is_feature};
    	Album.rest.update(data).then(function(response) {
            $scope.errorMsgs = [];
        }, function(responseError) {
            $scope.errorMsgs = responseError.data.error;
        },function(evt) {
        	
        })
    }
});
