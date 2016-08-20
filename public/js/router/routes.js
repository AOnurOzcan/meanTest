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

  .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider

      .state('login', {
        url: '/',
        templateUrl: 'views/home.html'
      })

      .state('profile', {
        url: '/profile',
        authenticate: true,
        templateUrl: 'views/profile.html',
        resolve: {
          user: check
        }
      })

    $urlRouterProvider.otherwise("/");

  });

var check = function ($q, List, $state, $rootScope) {
  var deferred = $q.defer();
  List.isLoggedIn().success(function (userLoggedIn) {
    if (userLoggedIn) {
      deferred.resolve();
    } else {
      deferred.reject();
      $state.go("login");
    }
  });
  return deferred.promise;
};