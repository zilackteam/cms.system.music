var app = angular.module('Veo', [
    'ngRoute',
    'ui.router',
    'angular-jwt',
    'angular-storage',
    'ngMaterial',
    'md.data.table',
    'ngFileUpload',
    'pickadate',
    'angularMoment'
]);

/**
 * Constant configuration
 */
app.constant('urls', {
    BASE: 'http://localhost:3000',
    BASE_API: 'http://localhost/tucq/veo-api/'
});

/**
 * JWT configuration
 */
app.config(function(jwtInterceptorProvider, $httpProvider) {

    jwtInterceptorProvider.tokenGetter = function(config, store) {
        if (config.url.substr(config.url.length - 5) == '.html') {
            return null;
        }

        return store.get('jwt');
    };

    $httpProvider.interceptors.push('jwtInterceptor');

    // Handle error response globally
    $httpProvider.interceptors.push(function($q) {
        return {
            'responseError': function(response) {
                if (response.status == 500) {
                    alert('Internal server error! Please contact us for technical support.');
                } else if (response.status == 401) {
                    //Check token
                    //Try to refresh
                    //Unable to refresh >> logout
                    if (confirm('Token expired, please reload to try refreshing')) {
                        location.reload();
                    }
                }
                console.log('Error from API', response);
                return $q.reject(response);
            }
        };
    });

});

app.config(['pickADateProvider', 'pickATimeProvider', function (pickADateProvider, pickATimeProvider) {
    pickADateProvider.setOptions({
        format: 'dd-mm-yyyy',
        selectYears: true
    });

    pickATimeProvider.setOptions({
        today: ''
    });
}]);


app.run(function($rootScope, $state, store, jwtHelper, User) {

    $rootScope.$on('$stateChangeStart', function(e, to) {
        // Authenticated pages
        if (!to.data || !to.data.isPublic) {
            if (!store.get('jwt')) {
                doLogout(e);
            } else if (jwtHelper.isTokenExpired(store.get('jwt'))) {
                //Try refresh
                var now = new Date();
                console.log('Refresh at ' + now);
                User.refreshToken().then(function(response) {
                    store.set('jwt', response.data.token);
                },function() {
                    console.log('Token could not be refreshed');
                    doLogout(e);
                })
            }
        }

        // Public page
        if (to.data && to.data.isPublic) {
            if (store.get('jwt') && !jwtHelper.isTokenExpired(store.get('jwt'))) {
                e.preventDefault();
                $state.go('/');
            } else if (store.get('jwt') && jwtHelper.isTokenExpired(store.get('jwt'))) {
                User.refreshToken().then(function(response) {
                    store.set('jwt', response.data.token);
                    $state.go('/')
                },function() {
                    console.log('Token could not be refreshed');
                    doLogout(e);
                })
            }
        }
    });

    $rootScope.$on('$stateChangeSuccess', function(e,to) {
        if ($state.params.contentId) {
            User.rest.get($state.params.contentId).then(function(response) {
                $rootScope.singerInfo = response.data;
                $rootScope.logo = $rootScope.singerInfo.avatar;
            }, function(responseError) {
                if (responseError.status != 401) {
                    alert('Could not get the artist');
                    $state.go('/');
                }
            });
        } else {
            $rootScope.singerInfo = '';
            $rootScope.logo = '/images/logo.jpg';
        }
    });

    function doLogout(e) {
        e.preventDefault();
        store.remove('jwt');
        $rootScope.isAuthenticated = false;
        $state.go('login');
    }

});