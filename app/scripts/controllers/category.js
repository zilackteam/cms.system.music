app.controller('CategoryCtrl', function($rootScope, $scope, $window, $timeout, $mdDialog, $location, $state, $mdSidenav, $log, store, Category) {
    $rootScope.currentPage = {
        class: 'page-category',
        name: 'Category Management'
    };

    $scope.currentUser = store.get('currentUser');

    // List page
    $scope.query = {
        filter: '',
        order: '',
        limit: 10,
        page: 1
    };

    $scope.types = {
        '1' : 'Photo',
        '2' : 'Video'
    };

    $scope.categories = [];
    Category.rest.getList().then(function(response){
        $scope.categories = response.data;
    })

    $scope.deleteCategory = function(category) {
        if (confirm('Are you sure want to delete category ' + category.name + ' ?')) {
            Category.rest.delete(category.id).then(function(response) {
                alert('Category deleted successfully!');
                location.reload();
            }, function(responseError) {
                alert('Unable to delete category');
            })
        }
    }

    $scope.category = '';
    $scope.openDialog = function(ev, category) {
        if (category) {
            $scope.category = category;
        } else {
            $scope.category = '';
        }

        $mdDialog.show({
            clickOutsideToClose: true,
            scope: $scope,        // use parent scope in template
            preserveScope: true,  // do not forget this if use parent scope
            templateUrl: "views/partials/form-category.html"
        });
    };


    $scope.closeDialog = function() {
        $mdDialog.hide();
    };

    $scope.submitCategory = function(categoryId) {
        if (categoryId) {
            Category.rest.update($scope.category).then(function(response) {
                alert('Category updated successfully!');
                $scope.errorMsgs = [];
            }, function(responseError) {
                $scope.errorMsgs = responseError.data.error;
            })
        } else {
            Category.rest.add($scope.category).then(function(response) {
                //Inform user + clear error
                alert('Category created successfully!');
                $scope.errorMsgs = [];
                $scope.video = '';

                //Update list data & close modal
                $scope.categories.push(response.data);
                $mdDialog.hide();
            }, function(responseError) {
                $scope.errorMsgs = responseError.data.error;
            })
        }
    };

    $scope.featureCategory = function(category) {
        Category.rest.update(category).then(function(response) {
            $scope.errorMsgs = [];
        }, function(responseError) {
            $scope.errorMsgs = responseError.data.error;
        },function(evt) {

        })
    }
});