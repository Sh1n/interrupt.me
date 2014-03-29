pouzApp.controller('InterruptionController', ['$scope', 'interruptions', 'pouzServer', function($scope, interruptions, pouzServer) {

  $scope.interruptions = interruptions.interruptions;
  $scope.categories = interruptions.categories;

  $scope.subview = 'interruption_index';

  $scope.back = function() {
    $scope.setView('friends_list');
  };

  $scope.open = function(key, interruption) {
    $scope.subview = 'interruption_detail';
    $scope.current_interruption_key = key;
    $scope.current_interruption = interruption;
  };

  $scope.send = function(key, friend) {
    pouzServer.interrupt(friend.id, key);

    $scope.setView('interruption_sent');
  }



}]);