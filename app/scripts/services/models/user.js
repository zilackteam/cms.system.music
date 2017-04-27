app.factory('User', function(RestService, urls, $http, Upload) {
    var rest = new RestService('user/');

    var login = function(credentials) {
        return $http.post(urls.BASE_API + 'auth/manager', credentials)
            .then(function(response) {
                return response.data;
            })
    };

    var getAuthenticatedUser = function(){
        return $http
            .get(urls.BASE_API + 'auth/authenticated')
            .then(function(response) {
                return response.data;
            });
    };

    var changePassword = function(item){
        return $http
            .post(urls.BASE_API + 'user/change-password', item)
            .then(function(response) {
                return response.data;
            });
    };

    var refreshToken = function() {
        return $http.post(urls.BASE_API + 'auth/refresh-token', [])
            .then(function(response) {
                return response.data
            })
    };

    var uploadAvatar = function(data) {
        //Default method is POST
        return Upload.upload({
            url: urls.BASE_API + 'user/avatar',
            data: data
        });
    };

    var forgotPassword = function(data) {
        return $http.post(urls.BASE_API + 'password/email', data)
          .then(function(response) {
              return response.data;
          });
    }

    var verifyForgotToken = function(token) {
        return $http.get(urls.BASE_API + 'password/verify-token/' + token)
          .then(function(response) {
              return response.data;
          });
    }

    var resetPassword = function(data) {
        return $http.post(urls.BASE_API + 'password/reset', data)
          .then(function(response) {
              return response.data;
          });
    }

    var getAuthType = function(){
        return $http
            .get(urls.BASE_API + 'auth/type')
            .then(function(response) {
                return response.data;
            });
    };

    // Public API
    return {
        rest: rest,
        login: login,
        getAuthenticatedUser: getAuthenticatedUser,
        changePassword: changePassword,
        refreshToken: refreshToken,
        uploadAvatar: uploadAvatar,
        forgotPassword: forgotPassword,
        verifyForgotToken: verifyForgotToken,
        resetPassword : resetPassword,
        getAuthType: getAuthType
    }
});