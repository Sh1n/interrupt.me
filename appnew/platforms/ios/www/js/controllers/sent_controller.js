pouzApp.controller('SentController', ['$scope', function($scope) {

  $scope.back = function() {
    $scope.setView('friends_list');
  }

}]);