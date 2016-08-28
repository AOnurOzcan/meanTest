angular.module('routes', ['ui.router'])

//   .run(function ($rootScope, $q, User) {
//
//     $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
// console.log("state changed;");
//       User.isLoggedIn().success(function (userLoggedIn) {
//         if (userLoggedIn) {
//           $rootScope.isLogged = true;
//         } else {
//           $rootScope.isLogged = false;
//         }
//       });
//
//     });
//   })

  .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

    $httpProvider.defaults.cache = false;
    if (!$httpProvider.defaults.headers.get) {
      $httpProvider.defaults.headers.get = {};
    }
    // disable IE ajax request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';


    $stateProvider

      .state('login', {
        url: '/',
        templateUrl: 'views/home.html',
        resolve: {
          user: checkHome
        }
      })

      .state('profile', {
        url: '/profile',
        authenticate: true,
        templateUrl: 'views/profile.html',
        resolve: {
          user: check
        }
      });

    $urlRouterProvider.otherwise("/");

  });

var check = function ($q, List, $state, $rootScope) {
  var deferred = $q.defer();
  List.isLoggedIn().success(function (userLoggedIn) {
    if (userLoggedIn) {
      $rootScope.isLogged = true;
      $rootScope.userId = userLoggedIn._id;
      deferred.resolve();
    } else {
      deferred.reject();
      $rootScope.isLogged = false;
      delete $rootScope.userId;
      $state.go("login");
    }
  });
  return deferred.promise;
};

var checkHome = function ($q, List, $state, $rootScope) {
  var deferred = $q.defer();
  if (!$rootScope.hasOwnProperty("isLogged")) {
    List.isLoggedIn().success(function (userLoggedIn) {
      if (userLoggedIn) {
        $rootScope.isLogged = true;
        $rootScope.userId = userLoggedIn._id;
      } else {
        $rootScope.isLogged = false;
        delete $rootScope.userId;
      }
      deferred.resolve();
    });
  } else {
    deferred.resolve();
  }
  return deferred.promise;
};