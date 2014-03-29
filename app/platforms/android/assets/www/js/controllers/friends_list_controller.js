pouzApp.controller('FriendsListController', ['$scope', 'FBConnection', 'pouzServer', function($scope, FBConnection, pouzServer) {

  $scope.friends = null;

  var loadFacebookFriends = function() {
    FBConnection.get_friends_list(function(response) {
       DEBUG && alert('friends loaded ');
       $scope.friends = response;
       $scope.$apply();
    });
  };

  loadFacebookFriends();

  $scope.interrupt = function(friend) {
    $scope.setView('interruption', {friend: friend});
  };

}]);