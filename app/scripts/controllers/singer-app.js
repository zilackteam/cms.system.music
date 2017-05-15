app.controller('SingerAppCtrl', function($rootScope, $scope, $window, $timeout, $mdDialog, $location, $state, $stateParams, App) {
    $rootScope.currentPage = {
        class: 'page-singer-app',
        name: 'Singer App ' + $stateParams.contentId
    };

    $scope.contentId = $stateParams.contentId;

    $scope.application = {};
    App.rest.get($scope.contentId).then(function(response) {
        $scope.application = response.data;
    }, function(responseError) {
        alert('Problem in getting news');
        $state.go('singer', {contentId: $stateParams.contentId});
    });

    // Do update
    $scope.doUpdate = function() {
        App.rest.update($scope.application).then(function(response) {
            alert('Application updated successfully!');
            $scope.errorMsgs = [];
            $scope.application.thumb_url = response.data.thumb_url;
        }, function(responseError) {
            $scope.errorMsgs = responseError.data.error;
        },function(evt) {
            $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
        })
    };
});