pouzApp.controller('PouzController', ['$scope', function($scope) {

  $scope.view = 'login';

  $scope.setView = function(view) {
    $scope.view = view;
  }

}]);