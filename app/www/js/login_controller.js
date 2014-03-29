pouzApp.controller('LoginController', ['$scope', 'pouzServer', 'FBConnection' , function($scope, pouzServer, FBConnection) {

  $scope.login = function() {

    //DO LOGIN or GET USER's FB ID
    FBConnection.login(function() {
      // open connection with server
      pouzServer.openConnection(userFbId, '');

      // go to main view
      $scope.setView('friends_list');
    });

  }

}]);