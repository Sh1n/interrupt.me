var io = require("socket.io").listen(3000);

var sockets = {};


io.sockets.on("connection", function (socket) {
	socket.on("token", function(data) {
		if (data.fbId) {
			socket.fbId = data.fbId;
			sockets[data.fbId] = sockets[data.fbId] || [];
			sockets[data.fbId].push(socket);
		}
	});

	socket.on("interrupt", function (data) {
		if (data.fbId && data.label) {
			var socketArr = sockets[data.fbId];

			for (var i = socketArr.length - 1; i >= 0; i--) {
				socketArr[i].emit("interruption", {
					"label": data.label,
					"sender": socket.fbId
				});
			}
		}
	});

	socket.on("disconnect", function() {
		var socketArr = sockets[socket.fbId];

		for (var i = socketArr.length - 1; i >= 0; i--) {
			if (socket === socketArr[i]) {
				socketArr.splice(i, 1);
				break;
			}
		}
	});
});

