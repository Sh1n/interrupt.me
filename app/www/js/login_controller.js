pouzApp.controller('LoginController', ['$scope', 'pouzServer', function($scope, pouzServer) {

  $scope.login = function() {

    //DO LOGIN or GET USER's FB ID

    var userFbId = $scope.fbidfsad;

    // open connection with server
    pouzServer.openConnection(userFbId, '');

    // go to main view
    $scope.setView('friends_list');
  }

}]);