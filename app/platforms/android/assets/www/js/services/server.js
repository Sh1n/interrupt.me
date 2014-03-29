pouzApp.service('pouzServer', ['serverUrl', function(serverUrl) {

  var socket = null;

  var callbacks = [];

  function  onInterruption(data) {
    DEBUG && alert('interruption received ' + data.label);
    for (var i = callbacks.length - 1; i >= 0; i--) {
      callbacks[i](data);
    };
  }

  var socket_obj = {

    openConnection: function(fbId, accessToken) {
      socket = io.connect(serverUrl);

      socket.emit("token", {fbId: fbId, accessToken: accessToken})
      socket.on('interruption', onInterruption);

      DEBUG && alert('connected to socket');
    },

    interrupt: function(fbId, label) {
      socket.emit("interrupt", {label: label, fbId: fbId});
    },

    registerInterruptionCallback: function(callback) {
      callbacks.push(callback);
    }

  };

  return socket_obj;

}]);