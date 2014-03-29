pouzApp.service('FBConnection', [ '$http', function( $http) {

  var userConnection = {};
  var friends_cache = null;

  var fb_conn = {
    login: function(successful) {
      // fill userConnection (use native fb connection)
      userConnection.uid = null;

      FB.login(function(response) {

        FB.api('/me', {fileds: 'id,email,first_nama,last_name'}, function(me_response) {

          fb_conn.try_login(successful);
        });

      }, {scope: 'email'});

    },

    // if user is logged open immediatelly connection and move on
    try_login: function(callback) {
      FB.getLoginStatus(function(response) {
        if (response.status == 'connected') {
          userConnection.uid = response.authResponse.userID;
          userConnection.accessToken = response.authResponse.accessToken;

          callback(true);
        } else {
          callback(false);
        }
      });

    },

    get_friends_list: function(success) {
      if (friends_cache !== null) {
        success(friends_cache);
      }

      // load user's friends
      FB.api('/me/friends', { fields: 'id, name, picture' },  function(response) {
        if ( response.error ) {
          DEBUG && alert( response.error.message);
        } else {
          friends_cache = response;
          success(response)
        }

      });

      //turn list;
    },

    user_id: function() {
      return userConnection.uid;
    },

    user_token: function() {
      return userConnection.accessToken;
    }
  };

  return fb_conn;


}]);