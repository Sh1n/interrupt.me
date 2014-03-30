pouzApp.controller('InterruptionController', ['$scope', 'interruptions', 'pouzServer', function($scope, interruptions, pouzServer) {

  $scope.interruptions = interruptions.interruptions;
  $scope.categories = interruptions.categories;

  $scope.subview = 'interruption_index';

  $scope.back = function() {
    $scope.setView('friends_list');
    return false;
  };

  $scope.open = function(key, interruption) {
    $scope.subview = 'interruption_detail';
    $scope.current_interruption_key = key;
    $scope.current_interruption = interruption;

    $scope.current_interruption.description_index = Math.floor(Math.random() * $scope.current_interruption.descriptions.length);

    $scope.current_interruption.description =
    $scope.current_interruption.descriptions[$scope.current_interruption.description_index
    ];

    return false;
  };

  $scope.send = function(key, friend) {
    pouzServer.interrupt(friend.id, key, $scope.current_interruption.description_index);

    $scope.setView('interruption_sent');
  }



}]);