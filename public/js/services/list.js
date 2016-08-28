angular.module('listService', ['ngResource'])

  .factory('List', ['$http', function ($http) {
    return {
      getProfile: function () {
        return $http.get('/profile');
      },
      get: function () {
        return $http.get('/api/list');
      },
      create: function (todoData) {
        return $http.post('/api/list', todoData);
      },
      delete: function (id) {
        return $http.delete('/api/list/' + id);
      },
      isLoggedIn: function () {
        return $http.get('/loggedin')
      },
      logout: function () {
        return $http.get('/logout');
      },
      createItem: function (data) {
        return $http.post('/api/item/', data);
      },
      getRecentLists: function () {
        return $http.get('/api/list/recent');
      },
      likeList: function (list_id, item_id) {
        return $http.get('/api/list/like/' + list_id + "/" + item_id);
      }
    }
  }]);
