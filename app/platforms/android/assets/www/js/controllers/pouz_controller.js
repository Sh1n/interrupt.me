pouzApp.controller('PouzController', ['$scope', 'FBConnection', 'pouzServer' , function($scope, FBConnection, pouzServer) {

  // load facebook API

  $scope.view = 'login';

  $scope.setView = function(view, view_params) {
    $scope.view = view;
    $scope.view_params = view_params;
    $scope.$apply();
  }

  $scope.successfully_logged_in = function(first_login) {
      // open connection with server
      pouzServer.openConnection(FBConnection.user_id(), FBConnection.user_token());

      DEBUG && alert('logged in');

      // go to main view
      // if (first_login) {
      //   //TODO
      //   $scope.setView('friends_list');
      // } else {
        $scope.setView('friends_list');
      //}
  };

  document.addEventListener('deviceready', function() {

    DEBUG && alert('trying to login');
    // get user state
    FBConnection.try_login(function(success) {
      DEBUG && alert('try login');
      if (success) {
        alert('already logged in');
        DEBUG && $scope.successfully_logged_in(false);
      }
    })

  }, false);


}]);