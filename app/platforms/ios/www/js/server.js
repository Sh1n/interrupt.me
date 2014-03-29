pouzeApp.service('pouzServer', ['serverUrl'], function(serverUrl) {

	var socket = null;

	var callbacks = [];

	function  onInterruption(data)
	{
		for (var i = callbacks.length - 1; i >= 0; i--) {
			callbacks[i](data);
		};
	}

	var socket_obj = {
		openConnection: function(fbId, token) {
			socket = io.connect(serverUrl);

			socket.emit("token", {fbId: fbId})
			socket.on('interruption', onInterruption);
		},

		interrupt: function(fbId, label) {
			socket.emit("interrupt", {label: label, fbId: fbId});
		},

		registerInterruptionCallback: function(callback) {
			callbacks.push(callback);
		}
	};

<<<<<<< HEAD:app/platforms/ios/www/js/server.js
});
=======
	return socket_obj;
}]);
>>>>>>> 0315353216ce9e82ae7352156b27c6e50fb7e39c:app/www/js/server.js
