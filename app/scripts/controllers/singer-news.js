app.controller('SingerNewsCtrl', function($rootScope, $scope, $window, $timeout, $mdDialog, $location, $state, $stateParams, store, jwtHelper, urls, User, News) {
    $rootScope.currentPage = {
        class: 'page-singer-news',
        name: 'Singer News ' + $stateParams.singerId
    };

    $scope.query = {
        order: '',
        limit: 10,
        page: 1
    };

    $scope.newsList = [];
    News.rest.getList({singer_id: $stateParams.singerId}).then(function(response) {
        $scope.newsList = response.data;
    });
});

app.controller('NewsCreateCtrl', function($rootScope, $scope, $window, $timeout, $mdDialog, $location, $state, $stateParams, store, jwtHelper, urls, User, News, Upload) {
    $rootScope.currentPage = {
        class: 'page-news-create',
        name: 'Create News ' + $stateParams.singerId
    };

    if (!$stateParams.singerId) {
        $state.go('/');
    }

    $scope.froalaOptions = {
        imageUploadURL:  urls.BASE_API + 'news/upload',
        imageUploadParams: {
            upload_type: 'image',
            singer_id: $stateParams.singerId
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
            singer_id: $stateParams.singerId,
            upload_type: 'image'
        }).then(function (resp) {
            console.log(resp);
            $scope.news.feature_img = resp;
        }, function (resp) {
            alert('Unable to upload, please try again');
        }, function (evt) {
            $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
        });
    };

    $scope.createNews = function() {
        $scope.news.singer_id = $stateParams.singerId;
        $scope.news.thumb_feature_img = $scope.myCroppedImage;
        console.log($scope.news);
        News.rest.add($scope.news).then(function(response) {
            alert('News created successfully');
            //$state.go('singer-news', {singerId: $stateParams.singerId});
        }, function(responseError) {
            $scope.errorMsgs = responseError.data.error;
        })
    }
});

app.controller('NewsUpdateCtrl', function($rootScope, $scope, $window, $timeout, $mdDialog, $location, $state, $stateParams, store, jwtHelper, urls, User, News, Upload) {
    $rootScope.currentPage = {
        class: 'page-news-update',
        name: 'Update News ' + $stateParams.singerId
    };

    if (!$stateParams.singerId) {
        $state.go('/');
    }

    $scope.froalaOptions = {
        imageUploadURL:  urls.BASE_API + 'news/upload',
        imageUploadParams: {
            upload_type: 'image',
            singer_id: $stateParams.singerId
        }
    };

    $scope.news = {};
    News.rest.get($stateParams.newsId).then(function(response) {
        $scope.news = response.data;
        $scope.old_feature_img = $scope.news.feature_img;
        $scope.old_thumb_feature_img = $scope.news.thumb_feature_img;
    }, function(responseError) {
        alert('Problem in getting news');
        $state.go('singer-news', {singerId: $stateParams.singerId});
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
            singer_id: $stateParams.singerId,
            upload_type: 'image'
        }).then(function (resp) {
            console.log(resp);
            $scope.news.feature_img = resp;
        }, function (resp) {
            alert('Unable to upload, please try again');
        }, function (evt) {
            $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
        });
    };

    $scope.updateNews = function() {
    	//Update
    	if ($scope.myImage) {
    		$scope.news.thumb_feature_img = $scope.myCroppedImage;
    	} else {
    		$scope.news.thumb_feature_img = '';
    	}
    	
        News.rest.update($scope.news).then(function(response) {
            alert('News updated successfully');
            $state.go('singer-news', {singerId: $stateParams.singerId});
        }, function(responseError) {
            $scope.errorMsgs = responseError.data.error;
        })
    };

    $scope.deleteThis = function() {
        if (confirm('Are you sure that you want to delete this news ?')) {
            News.rest.delete($scope.news.id).then(function(response) {
                alert('News deleted successfully!');
                $state.go('singer-news', {singerId: $state.params.singerId});
            }, function(responseError) {
                alert('Unable to delete news!');
            })
        }
    }
});