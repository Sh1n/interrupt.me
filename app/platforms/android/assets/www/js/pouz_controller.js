pouzApp.controller('PouzController', ['$scope' , function($scope) {

  // load facebook API


  $scope.view = 'login';

  $scope.setView = function(view) {
    $scope.view = view;
  }

}]);