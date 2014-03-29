pouzApp.controller('PouzController', ['$scope', 'FBConnection', 'pouzServer', 'notifications' , function($scope, FBConnection, pouzServer, notifications) {

  // load facebook API

  $scope.view = 'splash';

  $scope.setView = function(view, view_params) {
    $scope.view = view;
    $scope.view_params = view_params;
    $scope.$apply();
  }

  var show_notification = function(data) {
    $scope.setView('pouz', data);
  };

  $scope.successfully_logged_in = function(first_login) {
      // open connection with server
      pouzServer.openConnection(FBConnection.user_id(), FBConnection.user_token());

      // notify background service
      pouzServer.registerInterruptionCallback(notifications.notify);

      // show interruption in app
      pouzServer.registerInterruptionCallback(show_notification);

      DEBUG && alert('logged in');

      // go to main view
      // if (first_login) {
      //   //TODO
      //   $scope.setView('friends_list');
      // } else {
      $scope.setView('friends_list');
      //}
  };

  var ready = function() {
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

  }

  if (window.cordova || window.PhoneGap || window.phonegap) {
    jQuery.getScript('js/fb/facebook-js-sdk.js', function() {
      document.addEventListener('deviceready', function() {
        ready();
      }, false);
    });

  } else {

    // initialize FB online
    $(function() {

      window.fbAsyncInit = function() {
        FB.init({
          appId: app.fbId,
          status: true,
          xfbml: true
        });

        ready();

      };

      (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "//connect.facebook.net/en_US/all.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));

    })

  }



}]);