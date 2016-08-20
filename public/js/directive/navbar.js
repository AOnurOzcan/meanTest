angular.module('directives', ['todoController'])

  .directive('navbar', function () {
    return {
      restrict: 'E',
      controller: 'navbarController',
      templateUrl: '../../views/navbar.html'
    }
  });