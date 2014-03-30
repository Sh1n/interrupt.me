pouzApp.controller('LoginController', ['$scope', 'pouzServer', 'FBConnection' , function($scope, pouzServer, FBConnection) {

  $scope.login = function() {
    //DO LOGIN or GET USER's FB ID
    FBConnection.login(function() {
      // assume that this is a first login
      $scope.successfully_logged_in(true);
    });
  }

}]);