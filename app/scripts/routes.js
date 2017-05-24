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
      url: '/singer/{contentId}',
      templateUrl: 'views/pages/singer-overview.html',
      controller: 'SingerOverviewCtrl'
    })
    .// Albums
    state('singer-album', {
      url: '/singer/{contentId}/album',
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
      url: '/singer/{contentId}/song',
      templateUrl: 'views/pages/singer-song.html',
      controller: 'SingerSongCtrl',
      data: {
        isSingerPage: true
      }
    })
    .state('song-create', {
      url: '/singer/{contentId}/song/create',
      templateUrl: 'views/pages/song-create.html',
      controller: 'SongCreateCtrl',
      data: {
        isSingerPage: true
      }
    })
    .state('song-update', {
      url: '/singer/{contentId}/song/{songId}/update',
      templateUrl: 'views/pages/song-update.html',
      controller: 'SongUpdateCtrl',
      data: {
        isSingerPage: true
      }
    })
    .// Videos
    state('singer-video', {
      url: '/singer/{contentId}/video',
      templateUrl: 'views/pages/singer-video.html',
      controller: 'SingerVideoCtrl',
      data: {
        isSingerPage: true
      }
    })
    .// Photos
    state('singer-photo', {
      url: '/singer/{contentId}/photo',
      templateUrl: 'views/pages/singer-photo.html',
      controller: 'SingerPhotoCtrl',
      data: {
        isSingerPage: true
      }
    })
    .// Shows
    state('singer-show', {
      url: '/singer/{contentId}/show',
      templateUrl: 'views/pages/singer-show.html',
      controller: 'SingerShowCtrl',
      data: {
        isSingerPage: true
      }
    })
    .state('singer-news', {
      url: '/singer/{contentId}/news',
      templateUrl: 'views/pages/singer-news.html',
      controller: 'SingerNewsCtrl',
      data: {
        isSingerPage: true
      }
    })
    .state('news-create', {
      url: '/singer/{contentId}/news/create',
      templateUrl: 'views/pages/news-create.html',
      controller: 'NewsCreateCtrl',
      data: {
        isSingerPage: true
      }
    })
    .state('news-update', {
      url: '/singer/{contentId}/news/{newsId}/update',
      templateUrl: 'views/pages/news-update.html',
      controller: 'NewsUpdateCtrl',
      data: {
        isSingerPage: true
      }
    })
    .// Wall - Feed
    state('singer-wall', {
      url: '/singer/{contentId}/wall',
      templateUrl: 'views/pages/singer-wall.html',
      controller: 'SingerWallCtrl',
      data: {
        isSingerPage: true
      }
    })
    .//Website
    state('singer-website', {
      url: '/singer/{contentId}/website',
      templateUrl: 'views/pages/singer-website.html',
      controller: 'SingerWebsiteCtrl',
      data: {
        isSingerPage: true
      }
    })
    .// Version
    state('singer-version', {
      url: '/singer/{contentId}/version',
      templateUrl: 'views/pages/singer-version.html',
      controller: 'SingerVersionCtrl',
      data: {
        isSingerPage: true
      }
    })
    .// Single
    state('singer-single', {
      url: '/singer/{contentId}/single',
      templateUrl: 'views/pages/singer-single.html',
      controller: 'SingerSingleCtrl',
      data: {
        isSingerPage: true
      }
    })
    .// Application info
    state('singer-app', {
      url: '/singer/{contentId}/app',
      templateUrl: 'views/pages/singer-app.html',
      controller: 'SingerAppCtrl',
      data: {
        isSingerPage: true
      }
    })
    .// Master
    state('master', {
      url: '/master',
      templateUrl: 'views/pages/master-list.html',
      controller: 'MasterCtrl'
    })
    .
    state('master-create', {
      url: '/master/create',
      templateUrl: 'views/pages/master-create.html',
      controller: 'MasterCreateCtrl'
    })
    .
    state('master-update', {
      url: '/master/:masterId/update',
      templateUrl: 'views/pages/master-update.html',
      controller: 'MasterUpdateCtrl'
    })
    .// Notification
    state('singer-notification', {
      url: '/singer/{contentId}/notification',
      templateUrl: 'views/pages/singer-notification.html',
      controller: 'SingerNotificationCtrl'
    })
  ;

});