app.controller('SingerNewsCtrl', function($rootScope, $scope, $window, $timeout, $mdDialog, $location, $state, $stateParams, store, jwtHelper, urls, User, News) {
    $rootScope.currentPage = {
        class: 'page-singer-news',
        name: 'Singer News ' + $stateParams.contentId
    };

    $scope.query = {
        order: '',
        limit: 10,
        page: 1
    };

    $scope.newsList = [];
    News.rest.getList({content_id: $stateParams.contentId}).then(function(response) {
        $scope.newsList = response.data;
    });
});

app.controller('NewsCreateCtrl', function($rootScope, $scope, $window, $timeout, $mdDialog, $location, $state, $stateParams, store, jwtHelper, urls, User, News, Upload) {
    $rootScope.currentPage = {
        class: 'page-news-create',
        name: 'Create News ' + $stateParams.contentId
    };

    if (!$stateParams.contentId) {
        $state.go('/');
    }

    $scope.froalaOptions = {
        imageUploadURL:  urls.BASE_API + 'news/upload',
        imageUploadParams: {
            upload_type: 'image',
            content_id: $stateParams.contentId
        }
    };

    $scope.news = {};
    
    $scope.myImage = '';
    $scope.myCroppedImage = '';

    $scope.uploadFeature = function(file) {
        $scope.progress = 0;
        if (file) {
            // ng-img-crop
            var imageReader = new FileReader();
            imageReader.onload = function(image) {
                $scope.$apply(function($scope) {
                    $scope.myImage = image.target.result;
                });
            };
            imageReader.readAsDataURL(file);
        }
        
        News.upload({
            file: file,
            content_id: $stateParams.contentId,
            upload_type: 'image'
        }).then(function (resp) {
            $scope.news.feature_url = resp;
        }, function (resp) {
            alert('Unable to upload, please try again');
        }, function (evt) {
            $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
        });
    };

    $scope.createNews = function() {
        $scope.news.content_id = $stateParams.contentId;
        $scope.news.thumb_url = $scope.myCroppedImage;
        News.rest.add($scope.news).then(function(response) {
            alert('News created successfully');
            //$state.go('singer-news', {contentId: $stateParams.contentId});
        }, function(responseError) {
            $scope.errorMsgs = responseError.data.error;
        })
    }
});

app.controller('NewsUpdateCtrl', function($rootScope, $scope, $window, $timeout, $mdDialog, $location, $state, $stateParams, store, jwtHelper, urls, User, News, Upload) {
    $rootScope.currentPage = {
        class: 'page-news-update',
        name: 'Update News ' + $stateParams.contentId
    };

    if (!$stateParams.contentId) {
        $state.go('/');
    }

    $scope.froalaOptions = {
        imageUploadURL:  urls.BASE_API + 'news/upload',
        imageUploadParams: {
            upload_type: 'image',
            content_id: $stateParams.contentId
        }
    };

    $scope.news = {};
    News.rest.get($stateParams.newsId).then(function(response) {
        $scope.news = response.data;
        $scope.old_feature_url = $scope.news.feature_url;
        $scope.old_thumb_url = $scope.news.thumb_url;
    }, function(responseError) {
        alert('Problem in getting news');
        $state.go('singer-news', {contentId: $stateParams.contentId});
    });
    
    $scope.myImage = '';
    $scope.myCroppedImage = '';

    $scope.uploadFeature = function(file) {
    	if (file) {
            // ng-img-crop
            var imageReader = new FileReader();
            imageReader.onload = function(image) {
                $scope.$apply(function($scope) {
                    $scope.myImage = image.target.result;
                });
            };
            imageReader.readAsDataURL(file);
        }
    	
        News.upload({
            file: file,
            content_id: $stateParams.contentId,
            upload_type: 'image'
        }).then(function (resp) {
            $scope.news.feature_url = resp;
        }, function (resp) {
            alert('Unable to upload, please try again');
        }, function (evt) {
            $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
        });
    };

    $scope.updateNews = function() {
    	//Update
    	if ($scope.myImage) {
    		$scope.news.thumb_url = $scope.myCroppedImage;
    	} else {
    		$scope.news.thumb_url = '';
    	}
    	
        News.rest.update($scope.news).then(function(response) {
            alert('News updated successfully');
            $state.go('singer-news', {contentId: $stateParams.contentId});
        }, function(responseError) {
            $scope.errorMsgs = responseError.data.error;
        })
    };

    $scope.deleteThis = function() {
        if (confirm('Are you sure that you want to delete this news ?')) {
            News.rest.delete($scope.news.id).then(function(response) {
                alert('News deleted successfully!');
                $state.go('singer-news', {contentId: $state.params.contentId});
            }, function(responseError) {
                alert('Unable to delete news!');
            })
        }
    }
});