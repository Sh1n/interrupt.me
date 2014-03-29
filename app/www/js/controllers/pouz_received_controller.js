pouzApp.controller('PouzReceivedController', ['$scope','interruptions', 'pouzServer', function($scope, interruptions, pouzServer) {

  $scope.interruption = interruptions.interruptions[$scope.view_params.label];

  $scope.accept = function() {
    pouzServer.sendReaction($scope.view_params, true);
    $scope.setView('friends_list');
  }

  $scope.deny = function() {
    pouzServer.sendReaction($scope.view_params, false);
    $scope.setView('friends_list');
  }

}]);