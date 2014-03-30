pouzApp.controller('PouzReceivedController', ['$scope','interruptions', 'pouzServer', 'FBConnection', function($scope, interruptions, pouzServer, FBConnection) {

  $scope.interruption = interruptions.interruptions[$scope.view_params.label];



  $scope.interruption.description =
    $scope.interruption.descriptions[
    $scope.view_params.description_index];

  $scope.sender = FBConnection.get_friend($scope.view_params.senderFbId);


  $scope.accept = function() {
    pouzServer.react($scope.view_params, true);
    $scope.setView('friends_list');
  }

  $scope.deny = function() {
    pouzServer.react($scope.view_params, false);
    $scope.setView('friends_list');
  }

}]);