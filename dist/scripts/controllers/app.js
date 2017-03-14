app.controller('AppCtrl', function($rootScope, $scope, $window, $timeout, $mdDialog, $location, $state, $mdSidenav, $log, store, jwtHelper, User) {

    $scope.toggleMenu = buildDelayedToggler('menu-left');

    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
    function debounce(func, wait, context) {
        var timer;
        return function debounced() {
            var context = $scope,
                args = Array.prototype.slice.call(arguments);
            $timeout.cancel(timer);
            timer = $timeout(function() {
                timer = undefined;
                func.apply(context, args);
            }, wait || 10);
        };
    }
    /**
     * Build handler to open/close a SideNav
     */
    function buildDelayedToggler(navID) {
        return debounce(function() {
            $mdSidenav(navID).toggle()
        }, 200);
    }

    $rootScope.redirect = function(url, refresh) {
        if(refresh || $scope.$$phase) {
            $window.location.href = url;
        } else {
            $location.path(url);
            $scope.$apply();
        }
    };

    $rootScope.changeState = function(state, params) {
        $state.go(state, params);
    };

    $rootScope.$state = $state;

    $rootScope.currentPage = {};

    $rootScope.today = new Date();

    $rootScope.logout = function() {
        //Do logout
        store.remove('jwt');
        $rootScope.isAuthenticated = false;
        $state.go('login');
    };

});