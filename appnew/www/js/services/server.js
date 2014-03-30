pouzApp.service('pouzServer', ['serverUrl', function(serverUrl) {

  var socket = null;

  var interruption_callbacks = [];
  var reaction_callbacks = [];

  function handle_event(callbacks, data) {
    DEBUG && alert('interruption received ' + data.label);
    for (var i = callbacks.length - 1; i >= 0; i--) {
      callbacks[i](data);
    };
  }

  var socket_obj = {

    openConnection: function(fbId, accessToken) {
      socket = io.connect(serverUrl);

      socket.emit("token", {fbId: fbId, accessToken: accessToken})

      // bind events handlers
      socket.on('interruption', function(data) { handle_event(interruption_callbacks, data)});
      socket.on('reaction', function(data) { handle_event(reaction_callbacks, data)});

      socket.on('connection', function() {
        alert('connected');
      })

      //TODO handle reaction

      DEBUG && alert('connected to socket');
      console.log('connected to socket');
    },

    interrupt: function(fbId, label, desc_index) {
      console.log('interruption sent', fbId, label);
      socket.emit("interrupt", {label: label, fbId: fbId, description_index: desc_index});
    },

    react: function(interruption, reaction) {
      console.log('sending reaction')
      socket.emit('react', {
        label: interruption.label,
        senderFbId: interruption.senderFbId,
        reaction: (reaction ? 'ok' : 'fuck')
      });
    },

    registerInterruptionCallback: function(callback) {
      interruption_callbacks.push(callback);
    },

    registerReactionCallback: function(callback) {
      reaction_callbacks.push(callback);
    },


  };

  return socket_obj;

}]);