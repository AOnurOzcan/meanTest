angular.module('todoController', [])

  .controller('navbarController', ['$scope', '$http', 'List', '$location', '$rootScope', function ($scope, $http, User, $location, $rootScope) {


    $scope.logout = function () {
      User.logout().success(function (data) {
        if (data.logout == true) {
          $rootScope.isLogged = false;
          $location.path('/');
        }
      });
    }
  }])

  .controller('profileController', ['$scope', '$rootScope', '$http', 'List', function ($scope, $rootScope, $http, List) {


    List.getProfile().success(function (data) {
      $rootScope.isLogged = true;
      $scope.data = data;
      $rootScope.profilePicture = data.facebook.profilePicture;
    });

    $scope.listFormData = {};
    $scope.listArray = [];
    $scope.formData = {};
    $scope.loading = true;

    // GET =====================================================================
    // when landing on the page, get all todos and show them
    // use the service to get all the todos
    List.get().success(function (data) {
      console.log(data);
      $scope.lists = data;
      $scope.loading = false;
    });

    // CREATE ==================================================================
    // when submitting the add form, send the text to the node API
    $scope.createList = function () {

      // validate the formData to make sure that something is there
      // if form is empty, nothing will happen
      if ($scope.formData.title != undefined) {
        $scope.loading = true;

        // call the create function from our service (returns a promise object)
        List.create($scope.formData)

        // if successful creation, call our get function to get all the new todos
          .success(function (data) {
            $scope.loading = false;
            $scope.formData = {}; // clear the form so our user is ready to enter another
            $scope.lists = data; // assign our new list of todos
          });
      }
    };

    // DELETE ==================================================================
    // delete a todo after checking it
    $scope.deleteTodo = function (id) {
      $scope.loading = true;

      User.delete(id)
      // if successful creation, call our get function to get all the new todos
        .success(function (data) {
          $scope.loading = false;
          $scope.todos = data; // assign our new list of todos
        });
    };

    $scope.createItem = function (list_id, index) {
      $scope.loading = true;
      $scope.listFormData.list_id = list_id;
      $scope.listFormData.item = $scope.listArray[index];

      List.createItem($scope.listFormData)
        .success(function (data) {
          $scope.loading = false;
          $scope.listFormData = {};
          $scope.listArray = {};
          $scope.lists = data;
        });
    }


  }])

  .controller('homeController', ['$scope', 'List', function ($scope, List) {
    $scope.isExists = function (likes, userId) {
      var obj = likes.some(function (x) {
        return x == userId;
      });
      return obj !== null && obj != false;
    };

    List.getRecentLists().success(function (lists) {
      $scope.recentLists = lists;
      console.log(lists);
    });

    $scope.likeList = function (list_id, item_id) {
      List.likeList(list_id, item_id).success(function (lists) {
        console.log(lists);
        $scope.recentLists = lists;
      });
    }
  }]);
