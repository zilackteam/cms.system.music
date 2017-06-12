app.controller('SingerLiveConfigCtrl', function($rootScope, $scope, $window, $timeout, $mdDialog, $location, $state, $stateParams, store, jwtHelper, Live, LiveConfig) {
    $rootScope.currentPage = {
        class: 'page-singer-liveconfig',
        name: 'Singer Stream ' + $stateParams.contentId
    };

    $scope.contentId = $stateParams.contentId;

    LiveConfig.rest.get($scope.contentId).then(function(response) {
        $scope.liveConfig = response.data;
    }, function(responseError) {
        alert('Problem in getting config');
        $state.go('singer', {contentId: $stateParams.contentId});
    });

    // Do update
    $scope.doUpdate = function() {
        if ($scope.liveConfig.id) {
            LiveConfig.rest.update($scope.liveConfig).then(function(response) {
                alert('Live stream config updated successfully!');
                $scope.liveConfig = response.data;
                $scope.errorMsgs = [];
            }, function(responseError) {
                $scope.errorMsgs = responseError.data.error;
            },function(evt) {
                $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
            })
        } else {
            $scope.liveConfig.content_id = $scope.contentId;
            LiveConfig.rest.add($scope.liveConfig).then(function(response) {
                alert('Live stream config create successfully!');
                $scope.liveConfig = response.data;
                $scope.errorMsgs = [];
            }, function(responseError) {
                $scope.errorMsgs = responseError.data.error;
            },function(evt) {
                $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
            })
        }
    };
});