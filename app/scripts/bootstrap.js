var app = angular.module('Veo', [
  'ngRoute',
  'ui.router',
  'angular-jwt',
  'angular-storage',
  'ngMaterial',
  'md.data.table',
  'ngFileUpload',
  'pickadate',
  'angularMoment',
  'froala',
  'ngImgCrop'
]);

/**
 * Constant configuration
 */
app.constant('urls', {
  BASE: 'http://localhost/cms.system.music/',
  BASE_API: 'http://localhost/api.system.music/'
});

/**
 * JWT configuration
 */
app.config(function (jwtInterceptorProvider, $httpProvider) {

  jwtInterceptorProvider.tokenGetter = function (config, store) {
    if (config.url.substr(config.url.length - 5) == '.html') {
      return null;
    }

    return store.get('jwt');
  };

  $httpProvider.interceptors.push('jwtInterceptor');

  // Handle error response from API server
  $httpProvider.interceptors.push(function ($q) {

    var obsClass = 'obs'
      , processingClass = 'processing'
      , spinnerSelector = '.page-spinner-bar';

    function startLoading() {
      $(spinnerSelector).removeClass('hide');

      $('form [type=submit], .md-submit').each(function (btn) {
        var btn = $(this);

        if (btn.attr(obsClass)) {
          return null;
        }

        btn.attr(obsClass, btn.html())
          .attr('disabled', true)
          .html('Processing...')
          .parents('form')
          .addClass(processingClass)
      });
    }

    function finishLoading() {
      $(spinnerSelector).addClass('hide');

      $('[' + obsClass + ']').each(function () {
        $(this)
          .html($(this).attr(obsClass))
          .removeAttr(obsClass)
          .removeAttr('disabled')
          .parents('form')
          .removeClass(processingClass);
        $(this).find('.md-ripple-container').remove();
      })
    }

    return {
      request: function (config) {
        // Skip the message query
        // Have no idea about this
        if (
          'GET' == config.method
        //&& /\/messages$/.test(config.url)
        ) {
          return config;
        }

        startLoading();
        return config;
      },
      requestError: function (rejection) {
        finishLoading();

        return $q.reject(rejection);
      },
      response: function (response) {
        finishLoading();

        return response;
      },

      'responseError': function (rejection) {
        if (rejection.status == 500) {
          alert('Internal server error! Please contact us for technical support.');
        } else if (rejection.status == 401) {
          //Check token
          //Try to refresh
          //Unable to refresh >> logout
          if (confirm('Token expired, please reload to try refreshing')) {
            location.reload();
          }
        }
        console.log('There is error from API');

        finishLoading();

        return $q.reject(rejection);
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

app.value('froalaConfig', {
  height: 500,
  charCounterCount: false,
  toolbarInline: false,
  toolbarSticky: false,
  requestWithCORS: false,
  placeholderText: 'Enter text here',
  toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'fontFamily', 'fontSize',
    '|', 'color', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', 'insertHR',
    '|', 'insertLink', 'insertImage', 'insertVideo', 'insertTable',
    '-', 'undo', 'redo', 'clearFormatting', 'selectAll', 'html'],
  imageInsertButtons: ['imageBack', '|', 'imageUpload', 'imageByURL'],
  imageAllowedTypes: ['jpeg', 'jpg', 'png'],
  imageMaxSize: 3 * 1024 * 1024
});

app.run(function ($rootScope, $state, store, jwtHelper, User, froalaConfig, App) {

  $rootScope.$on('$stateChangeStart', function (e, to) {

    // Authenticated pages
    if (!to.data || !to.data.isPublic) {
      if (!store.get('jwt')) {
        doLogout(e);
      } else if (jwtHelper.isTokenExpired(store.get('jwt'))) {
        //Try refresh
        var now = new Date();
        console.log('Refresh at ' + now);
        User.refreshToken().then(function (response) {
          store.set('jwt', response.data.token);
        }, function () {
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
        User.refreshToken().then(function (response) {
          store.set('jwt', response.data.token);
          $state.go('/')
        }, function () {
          console.log('Token could not be refreshed');
          doLogout(e);
        })
      }
    }
  });

  $rootScope.$on('$stateChangeSuccess', function (e, to) {
    if ($state.params.contentId) {
      App.rest.get($state.params.contentId).then(function (response) {
        $rootScope.appInfo = response.data;
        if ($rootScope.appInfo.avatar) {
          $rootScope.logo = $rootScope.appInfo.avatar;
        } else {
          $rootScope.logo = '/images/logo.jpg';
        }
      }, function (responseError) {
        if (responseError.status != 401) {
          alert('Could not get the artist');
          $state.go('/');
        }
      });
    } else {
      $rootScope.appInfo = '';
      $rootScope.logo = '/images/logo.jpg';
    }
  });

  $rootScope.decrypt = function(response) {
    var CryptoJSAesJson = {
      stringify: function (cipherParams) {
        var j = {ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64)};
        if (cipherParams.iv) j.iv = cipherParams.iv.toString();
        if (cipherParams.salt) j.s = cipherParams.salt.toString();
        return JSON.stringify(j);
      },
      parse: function (jsonStr) {
        var j = JSON.parse(jsonStr);
        var cipherParams = CryptoJS.lib.CipherParams.create({ciphertext: CryptoJS.enc.Base64.parse(j.ct)});
        if (j.iv) cipherParams.iv = CryptoJS.enc.Hex.parse(j.iv)
        if (j.s) cipherParams.salt = CryptoJS.enc.Hex.parse(j.s)
        return cipherParams;
      }
    }
    var password = 'llRYAcSucCE6ZWRNd0gNoKdGsMw8W6Gv';
    var decrypted = JSON.parse(CryptoJS.AES.decrypt(response.data, "llRYAcSucCE6ZWRNd0gNoKdGsMw8W6Gv", {format: CryptoJSAesJson}).toString(CryptoJS.enc.Utf8));;

    var result = {
      'error' : response.error,
      'data' : decrypted,
    }

    return result;
  };

  //Custom froala config
  froalaConfig.requestHeaders = {
    Authorization: 'Bearer ' + store.get('jwt')
  };

  function doLogout(e) {
    e.preventDefault();
    store.remove('jwt');
    $rootScope.isAuthenticated = false;
    $state.go('login');
  }

});
