/**
 * Route configuration
 */
app.config(function ($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {

  $urlMatcherFactoryProvider.strictMode(false);

  $urlRouterProvider.otherwise('/');

  $stateProvider.state('/', {
    url: '/',
    templateUrl: 'views/pages/home.html',
    controller: 'HomeCtrl'
  })
    .state('login', {
      url: '/login',
      templateUrl: 'views/pages/login.html',
      controller: 'LoginCtrl',
      data: {
        isPublic: true
      }
    })
    .state('forgot', {
      url: '/forgot',
      templateUrl: 'views/pages/forgot.html',
      controller: 'ForgotCtrl',
      data: {
        isPublic: true
      }
    })
    .state('reset-password', {
      url: '/reset-password/{token}',
      templateUrl: 'views/pages/reset-password.html',
      controller: 'ResetCtrl',
      data: {
        isPublic: true
      }
    })
    .state('my-profile', {
      url: '/my-profile',
      templateUrl: 'views/pages/my-profile.html',
      controller: 'MyProfileCtrl'
    })
    .state('search', {
      url: '/search',
      templateUrl: 'views/pages/search.html',
      controller: 'SearchCtrl'
    })
    .state('setting', {
      url: '/setting',
      templateUrl: 'views/pages/setting.html',
      controller: 'SettingCtrl'
    })
    .// Users
    state('user', {
      url: '/user',
      templateUrl: 'views/pages/user-list.html',
      controller: 'UserCtrl'
    })
    .state('user-create', {
      url: '/user/create',
      templateUrl: 'views/pages/user-create.html',
      controller: 'UserCreateCtrl'
    })
    .state('user-update', {
      url: '/user/:userId/update',
      templateUrl: 'views/pages/user-update.html',
      controller: 'UserUpdateCtrl'
    })
    .// Singers
    state('singer', {
      url: '/singer/{singerId}',
      templateUrl: 'views/pages/singer-overview.html',
      controller: 'SingerOverviewCtrl'
    })
    .// Albums
    state('singer-album', {
      url: '/singer/{singerId}/album',
      templateUrl: 'views/pages/singer-album.html',
      controller: 'SingerAlbumCtrl',
      data: {
        isSingerPage: true
      }
    })
    .state('album-update', {
      url: '/album/{albumId}/update',
      templateUrl: 'views/pages/album-update.html',
      controller: 'AlbumUpdateCtrl',
      data: {
        isSingerPage: true
      }
    })
    .// Songs
    state('singer-song', {
      url: '/singer/{singerId}/song',
      templateUrl: 'views/pages/singer-song.html',
      controller: 'SingerSongCtrl',
      data: {
        isSingerPage: true
      }
    })
    .state('song-create', {
      url: '/singer/{singerId}/song/create',
      templateUrl: 'views/pages/song-create.html',
      controller: 'SongCreateCtrl',
      data: {
        isSingerPage: true
      }
    })
    .state('song-update', {
      url: '/singer/{singerId}/song/{songId}/update',
      templateUrl: 'views/pages/song-update.html',
      controller: 'SongUpdateCtrl',
      data: {
        isSingerPage: true
      }
    })
    .// Videos
    state('singer-video', {
      url: '/singer/{singerId}/video',
      templateUrl: 'views/pages/singer-video.html',
      controller: 'SingerVideoCtrl',
      data: {
        isSingerPage: true
      }
    })
    .// Photos
    state('singer-photo', {
      url: '/singer/{singerId}/photo',
      templateUrl: 'views/pages/singer-photo.html',
      controller: 'SingerPhotoCtrl',
      data: {
        isSingerPage: true
      }
    })
    .// Shows
    state('singer-show', {
      url: '/singer/{singerId}/show',
      templateUrl: 'views/pages/singer-show.html',
      controller: 'SingerShowCtrl',
      data: {
        isSingerPage: true
      }
    })
    .state('singer-news', {
      url: '/singer/{singerId}/news',
      templateUrl: 'views/pages/singer-news.html',
      controller: 'SingerNewsCtrl',
      data: {
        isSingerPage: true
      }
    })
    .state('news-create', {
      url: '/singer/{singerId}/news/create',
      templateUrl: 'views/pages/news-create.html',
      controller: 'NewsCreateCtrl',
      data: {
        isSingerPage: true
      }
    })
    .state('news-update', {
      url: '/singer/{singerId}/news/{newsId}/update',
      templateUrl: 'views/pages/news-update.html',
      controller: 'NewsUpdateCtrl',
      data: {
        isSingerPage: true
      }
    })
    .// Wall - Feed
    state('singer-wall', {
      url: '/singer/{singerId}/wall',
      templateUrl: 'views/pages/singer-wall.html',
      controller: 'SingerWallCtrl',
      data: {
        isSingerPage: true
      }
    })
    .//Website
    state('singer-website', {
      url: '/singer/{singerId}/website',
      templateUrl: 'views/pages/singer-website.html',
      controller: 'SingerWebsiteCtrl',
      data: {
        isSingerPage: true
      }
    })
    .// Version
    state('singer-version', {
      url: '/singer/{singerId}/version',
      templateUrl: 'views/pages/singer-version.html',
      controller: 'SingerVersionCtrl',
      data: {
        isSingerPage: true
      }
    })
    .// Single
    state('singer-single', {
      url: '/singer/{singerId}/single',
      templateUrl: 'views/pages/singer-single.html',
      controller: 'SingerSingleCtrl',
      data: {
        isSingerPage: true
      }
    })
  ;

});