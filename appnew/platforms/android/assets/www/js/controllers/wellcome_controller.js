pouzApp.controller('WellcomeController', ['$scope', function($scope) {

  $scope.continue = function() {
    $scope.setView('friends_list');
  }

}])