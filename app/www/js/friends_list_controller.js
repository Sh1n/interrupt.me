pouzApp.controller('FriendsListController', ['$scope', 'FBConnection', function($scope, FBConnection) {

  $scope.friends = [];

  var loadFacebookFriends = function() {
    $scope.friends = FBConnection.get_friends_list();
  };

  loadFacebookFriends();

}]);