app.factory('User', function(RestService, urls, $http, Upload, $rootScope) {
    var rest = new RestService('user/');

    var login = function(credentials) {
        return $http.post(urls.BASE_API + 'auth/manager', credentials)
            .then(function(response) {
                return $rootScope.decrypt(response.data);
            })
    };

    var getAuthenticatedUser = function(){
        return $http
            .get(urls.BASE_API + 'auth/authenticated')
            .then(function(response) {
                return $rootScope.decrypt(response.data);
            });
    };

    var changePassword = function(item){
        return $http
            .post(urls.BASE_API + 'auth/change-password', item)
            .then(function(response) {
                return $rootScope.decrypt(response.data);
            });
    };

    var changeInfo = function(item){
        return $http
            .post(urls.BASE_API + 'auth/change-info', item)
            .then(function(response) {
                return $rootScope.decrypt(response.data);
            });
    };

    var refreshToken = function() {
        return $http.post(urls.BASE_API + 'auth/refresh-token', [])
            .then(function(response) {
                return $rootScope.decrypt(response.data);
            })
    };

    var uploadAvatar = function(data) {
        //Default method is POST
        return Upload.upload({
            url: urls.BASE_API + 'auth/avatar',
            data: data
        });
    };

    var forgotPassword = function(data) {
        return $http.post(urls.BASE_API + 'password/email', data)
          .then(function(response) {
              return $rootScope.decrypt(response.data);
          });
    }

    var verifyForgotToken = function(token) {
        return $http.get(urls.BASE_API + 'password/verify-token/' + token)
          .then(function(response) {
              return $rootScope.decrypt(response.data);
          });
    }

    var resetPassword = function(data) {
        return $http.post(urls.BASE_API + 'password/reset', data)
          .then(function(response) {
              return $rootScope.decrypt(response.data);
          });
    }

    var getAuthType = function(){
        return $http
            .get(urls.BASE_API + 'auth/type')
            .then(function(response) {
                return $rootScope.decrypt(response.data);
            });
    };

    // Public API
    return {
        rest: rest,
        login: login,
        getAuthenticatedUser: getAuthenticatedUser,
        changePassword: changePassword,
        changeInfo: changeInfo,
        refreshToken: refreshToken,
        uploadAvatar: uploadAvatar,
        forgotPassword: forgotPassword,
        verifyForgotToken: verifyForgotToken,
        resetPassword : resetPassword,
        getAuthType: getAuthType
    }
});