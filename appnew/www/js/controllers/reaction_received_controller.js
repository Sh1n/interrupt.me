pouzApp.controller('ReactionReceivedController', ['$scope', 'FBConnection', 'interruptions', function($scope, FBConnection, interruptions) {


  var interruption = interruptions.interruptions[$scope.view_params.label]


  var sender = FBConnection.get_friend($scope.view_params.senderFbId);

  $scope.reaction = {
    pouz_icon: interruption.picture,
    user_picture: sender.picture.data.url,
    user_name: sender.name,
    text: $scope.view_params.reaction == 'ok' ? 'Hell YEAH' : 'FUCK You'
  }

  $scope.back = function() {
    $scope.setView('friends_list');
  }

}]);