pouzApp.controller('PouzController', ['$scope', 'FBConnection', 'pouzServer', 'notifications', 'PhoneGap' , function($scope, FBConnection, pouzServer, notifications, PhoneGap) {

  $scope.view = 'splash';

  $scope.safeApply = function(fn) {
    var phase = this.$root.$$phase;
    if(phase == '$apply' || phase == '$digest') {
      if(fn && (typeof(fn) === 'function')) {
        fn();
      }
    } else {
      this.$apply(fn);
    }
  };

  $scope.setView = function(view, view_params) {
    $scope.safeApply(function() {
      $scope.view = view;
      $scope.view_params = view_params;
    })
  }

  var show_notification = function(data) {
    console.log('interruption received', data);
    $scope.setView('pouz', data);
  };

  var show_reaction = function(data) {
    console.log('reaction received', data);
    $scope.setView('reaction', data);
  };


  $scope.successfully_logged_in = function(first_login) {
      // open connection with server
      pouzServer.openConnection(FBConnection.user_id(), FBConnection.user_token());

      // notify background service
      pouzServer.registerInterruptionCallback(notifications.notify);

      // show interruption in app
      pouzServer.registerInterruptionCallback(show_notification);

      // show reaction in app
      pouzServer.registerReactionCallback(show_reaction);



      DEBUG && alert('logged in');

      // load friend list first
      FBConnection.get_friends_list(function() {
        if (first_login) {
          $scope.setView('wellcome');
        } else {
          $scope.setView('friends_list');
        }
      });
      //}
  };

  PhoneGap.load_facebook_api(function() {
    DEBUG && alert('trying to login');
    // get user state
    FBConnection.try_login(function(success) {
      DEBUG && alert('try login');
      if (success) {
        DEBUG && alert('already logged in');
        $scope.successfully_logged_in(false);
      } else {
        $scope.setView('login');
      }
    })

  });



}]);