pouzApp.controller('LoginController', ['$scope', 'pouzServer', 'FBConnection' , function($scope, pouzServer, FBConnection) {

  $scope.login = function() {
    //DO LOGIN or GET USER's FB ID
    FBConnection.login($scope.successfully_logged_in);
  }

}]);