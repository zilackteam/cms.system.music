app.controller('SingerSongCtrl', function($rootScope, $scope, $window, $timeout, $mdDialog, $location, $state, $stateParams,
                                          store, jwtHelper, User, Album, Song) {
    $rootScope.currentPage = {
        class: 'page-singer-song',
        name: 'Singer Song ' + $stateParams.contentId
    };

    if (!$stateParams.contentId) {
        alert('Invalid request');
        $state.go('/');
    }
    
    $scope.contentId = $stateParams.contentId;

    $scope.query = {
        order: '',
        limit: 10,
        page: 1
    };

    $scope.songs = [];
    Song.rest.getList({content_id: $scope.contentId, includes: 'albums'})
        .then(function(response) {
            $scope.songs = response.data;

            angular.forEach($scope.songs, function(song) {
                angular.forEach(song.albums, function(album) {
                    song.album_name = album.name;
                });

                song.format_available = '';
                if (song.file128) {
                    song.format_available += ' (128) '
                }
                if (song.file320) {
                    song.format_available += ' (320) '
                }
                if (song.file_lossless) {
                    song.format_available += ' (LL) '
                }
            });
        });
    
    $scope.featureSong = function(song) {
    	data = {id: song.id, performer: song.performer, name: song.name, is_feature: song.is_feature};
    	Song.rest.update(data).then(function(response) {
            $scope.errorMsgs = [];
        }, function(responseError) {
            $scope.errorMsgs = responseError.data.error;
        },function(evt) {
        	
        })
    }

});

app.controller('SongCreateCtrl', function($rootScope, $scope, $window, $timeout, $mdDialog, $location, $state, $stateParams,
                                          store, jwtHelper, User, Album, Song) {
    $rootScope.currentPage = {
        class: 'page-create-song',
        name: 'New Song For' + $stateParams.contentId
    };

    Album.rest.getList({content_id: $stateParams.contentId})
        .then(function(response) {
            $scope.albums = response.data;
        });

    $scope.song = {};
    $scope.createSong = function() {
        $scope.song.content_id = $stateParams.contentId;

        Song.rest.add($scope.song).then(function(response) {
            alert('Song created! Redirect to update page to upload song file');
            $scope.errorMsgs = [];
            $state.go('song-update', {contentId: $stateParams.contentId, songId: response.data.id});
        }, function(responseError) {
            $scope.errorMsgs = responseError.data.error;
        })
    }

});

app.controller('SongUpdateCtrl', function($rootScope, $scope, $window, $timeout, $mdDialog, $location, $state, $stateParams,
                                          store, jwtHelper, User, Album, Song) {
    $rootScope.currentPage = {
        class: 'page-update-song',
        name: 'Update Song ' + $stateParams.songId
    };

    $scope.songId = $stateParams.songId;

    // Get data
    Song.rest.get($scope.songId).then(function(response) {
        $scope.song = response.data;

        if ($scope.song.albums) {
            angular.forEach($scope.song.albums, function(album) {
                $scope.song.album_id = album.id;
            });
        }

        if ($scope.song.content_id != $stateParams.contentId) {
            alert('Song not match with user!');
            $state.go('singer-song', {contentId: $state.params.contentId});
        }

        if (!$scope.song.thumb_img)
            $scope.song.thumb_img = null;

    }, function(responseError) {
        alert('Song not found!');
        $state.go('singer-song', {contentId: $state.params.contentId});
    });

    Album.rest.getList({content_id: $stateParams.contentId})
        .then(function(response) {
            $scope.albums = response.data;
        });


    // Do update
    $scope.doUpdate = function() {
        Song.rest.update($scope.song).then(function(response) {
            alert('Song updated successfully!');
            $scope.errorMsgs = [];
        }, function(responseError) {
            $scope.errorMsgs = responseError.data.error;
        },function(evt) {
            $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
        })
    };

    $scope.clearFile = function(input) {
        $scope.song[input] = null;
    }

    $scope.deleteThis = function() {
        if (confirm('Are you sure that you want to delete this song "' + $scope.song.name + '" ?')) {
            Song.rest.delete($scope.song.id).then(function(response) {
                alert('Song deleted successfully!');
                $state.go('singer-song', {contentId: $state.params.contentId});
            }, function(responseError) {
                alert('Unable to delete song!');
            })
        }

    }
});