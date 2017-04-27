app.controller('SingerWallCtrl', function ($rootScope, $scope, $window, $timeout, $mdDialog, $location, $state, $stateParams,
  store, jwtHelper, User, Post) {
  $rootScope.currentPage = {
    class: 'page-singer-wall',
    name: 'Singer Post ' + $stateParams.contentId
  };

  $scope.contentId = $stateParams.contentId;

  $scope.query = {
    order: '',
    limit: 10,
    page: 1
  };

  $scope.posts = [];
  Post.rest.getList({content_id: $scope.contentId, includes: 'commentCount,likeCount'})
    .then(function (response) {
      $scope.posts = response.data;
    });

  $scope.openDialog = function (ev, post) {
    $scope.showedPost = post;

    $mdDialog.show({
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      scope: $scope,        // use parent scope in template
      preserveScope: true,  // do not forget this if use parent scope
      templateUrl: "views/partials/modal-post.html"
    });
  };

  $scope.closeDialog = function () {
    $mdDialog.hide();
  };

  $scope.deletePost = function (post) {
    Post.rest.delete(post.id)
      .then(function (success) {
        alert('Post deleted successfully. Page will reload');
        location.reload();
      }, function (error) {
        alert('Unable to delete post. Please try again.');
      });
  }

});