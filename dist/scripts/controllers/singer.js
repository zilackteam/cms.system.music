app.controller('SingerOverviewCtrl', function($rootScope, $scope, $window, $timeout, $mdDialog, $location, $state, $stateParams, store, jwtHelper, User) {
    $rootScope.currentPage = {
        class: 'page-singer-overview',
        name: 'Singer Overview ' + $stateParams.singerId
    };
    $rootScope.singerId = $stateParams.singerId;
});