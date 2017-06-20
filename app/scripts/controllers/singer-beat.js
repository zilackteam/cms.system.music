app.controller('SingerBeatCtrl', function($rootScope, $scope, $window, $timeout, $mdDialog, $location, $state, $stateParams,
                                          store, jwtHelper, User, Beat) {
    $rootScope.currentPage = {
        class: 'page-singer-beat',
        name: 'Singer Beat ' + $stateParams.contentId
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

    $scope.beats = [];
    Beat.rest.getList({content_id: $scope.contentId})
        .then(function(response) {
            $scope.beats = response.data;

            angular.forEach($scope.beats, function(beat) {
                beat.format_available = '';
                if (beat.file128) {
                    beat.format_available += ' (128) '
                }
                if (beat.file320) {
                    beat.format_available += ' (320) '
                }
                if (beat.file_lossless) {
                    beat.format_available += ' (LL) '
                }
            });
        });

    $scope.featureBeat = function(beat) {
        data = {id: beat.id, performer: beat.performer, name: beat.name, is_feature: beat.is_feature};
        Beat.rest.update(data).then(function(response) {
            $scope.errorMsgs = [];
        }, function(responseError) {
            $scope.errorMsgs = responseError.data.error;
        },function(evt) {

        })
    }

    // Selected beat
    $scope.selection = [];

    // Toggle selection for beat
    $scope.toggleSelection = function toggleSelection(beatId) {
        var idx = $scope.selection.indexOf(beatId);

        // Is currently selected
        if (idx > -1) {
            $scope.selection.splice(idx, 1);
        }

        // Is newly selected
        else {
            $scope.selection.push(beatId);
        }
    };

    $scope.action = '';

    $scope.applyAction = function(action) {
        if ($scope.selection.length ) {
            if (action == 'feature') {
                Beat.featureBeats({id: $scope.selection.join(), is_feature: 1}).then(function(response) {
                    alert('Beat feature successfully!');
                    location.reload();
                }, function(responseError) {
                    alert('Unable to feature Beat');
                })
            } else if (action == 'unfeature') {
                Beat.featureBeats({id: $scope.selection.join(), is_feature: 0}).then(function(response) {
                    alert('Beat feature successfully!');
                    location.reload();
                }, function(responseError) {
                    alert('Unable to feature Beat');
                })
            } else if (action == 'public') {
                Beat.publicBeats({id: $scope.selection.join(), is_public: 1}).then(function(response) {
                    alert('Beat update successfully!');
                    location.reload();
                }, function(responseError) {
                    alert('Unable to update Beat');
                })
            } else if (action == 'private') {
                Beat.publicBeats({id: $scope.selection.join(), is_public: 0}).then(function(response) {
                    alert('Beat update successfully!');
                    location.reload();
                }, function(responseError) {
                    alert('Unable to update Beat');
                })
            } else if (action == 'delete') {
                if (confirm('Are you sure want to delete beat?')) {
                    Beat.deleteBeats({id: $scope.selection.join()}).then(function (response) {
                        alert('Beat deleted successfully!');
                        location.reload();
                    }, function (responseError) {
                        alert('Unable to delete beat');
                    })
                }
            }
        } else {
            alert('Please select beat.');
        }
    }

});

app.controller('BeatCreateCtrl', function($rootScope, $scope, $window, $timeout, $mdDialog, $location, $state, $stateParams,
                                          store, jwtHelper, User, Beat) {
    $rootScope.currentPage = {
        class: 'page-create-beat',
        name: 'New Beat For' + $stateParams.contentId
    };

    $scope.beat = {};
    $scope.createBeat = function() {
        $scope.beat.content_id = $stateParams.contentId;

        Beat.rest.add($scope.beat).then(function(response) {
            alert('Beat created! Redirect to update page to upload beat file');
            $scope.errorMsgs = [];
            $state.go('beat-update', {contentId: $stateParams.contentId, beatId: response.data.id});
        }, function(responseError) {
            $scope.errorMsgs = responseError.data.error;
        })
    }

});

app.controller('BeatUpdateCtrl', function($rootScope, $scope, $window, $timeout, $mdDialog, $location, $state, $stateParams,
                                          store, jwtHelper, User, Beat) {
    $rootScope.currentPage = {
        class: 'page-update-beat',
        name: 'Update Beat ' + $stateParams.beatId
    };

    $scope.beatId = $stateParams.beatId;

    // Get data
    Beat.rest.get($scope.beatId).then(function(response) {
        $scope.beat = response.data;

        if ($scope.beat.content_id != $stateParams.contentId) {
            alert('Beat not match with user!');
            $state.go('singer-beat', {contentId: $state.params.contentId});
        }

        if (!$scope.beat.thumb_url)
            $scope.beat.thumb_url = null;

    }, function(responseError) {
        alert('Beat not found!');
        $state.go('singer-beat', {contentId: $state.params.contentId});
    });

    // Do update
    $scope.doUpdate = function() {
        Beat.rest.update($scope.beat).then(function(response) {
            alert('Beat updated successfully!');
            $scope.errorMsgs = [];
        }, function(responseError) {
            $scope.errorMsgs = responseError.data.error;
        },function(evt) {
            $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
        })
    };

    $scope.clearFile = function(input) {
        $scope.beat[input] = null;
    }

    $scope.deleteThis = function() {
        if (confirm('Are you sure that you want to delete this beat "' + $scope.beat.name + '" ?')) {
            Beat.rest.delete($scope.beat.id).then(function(response) {
                alert('Beat deleted successfully!');
                $state.go('singer-beat', {contentId: $state.params.contentId});
            }, function(responseError) {
                alert('Unable to delete beat!');
            })
        }

    }
});