pouzApp.service('FBConnection', [ '$http', function( $http) {

  var userConnection = {};

  return {
    login: function(successful) {
      // fill userConnection (use native fb connection)
      userConnection.uid = 1;

      FB.login(function(response) {

        FB.api('/me', {fileds: 'id,email,first_nama,last_name'}, function(me_response) {
          userConnection.uid = me_response.id;

          successful();
        });

      }, {scope: 'email'});

    },

    get_friends_list: function() {
      // load user's friends
      var list = [];

      FB.api('/me/friends', { fields: 'id, name, picture' },  function(response) {
        //todo
      });

      return list;
    },

    user_id: function() {
      return userConnection.id;
    }
  };


}]);