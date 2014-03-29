var io = require("socket.io").listen(3000),
	request = require("request");

var sockets = {};

var interruptionLabels = [
	{
		label: "lunch",
		time: {
			from: 12,
			to: 15
		}
	},
	{
		label: "beer",
		time: {
			from: 16,
			to: 2
		}
	},
	{
		label: "sex",
		time: {
			from: 16,
			to: 3
		}
	}
];

function sendMessage(fbId, messageName, messageObject, next) {
	var socketArr = sockets[fbId];

	if (!socketArr) {
		console.error("sendMessage -- connection with that fbId not found.");
		return;
	}

	for (var i = socketArr.length - 1; i >= 0; i--) {
		socketArr[i].emit(messageName, messageObject);
	}

	if (typeof next === "function") {
		next(socketArr.length);
	}
}


io.sockets.on("connection", function (socket) {
	socket.on("token", function(data) {
		console.log("token: ", data);
		if (data.fbId) {
			socket.fbId = data.fbId;
			socket.timeZoneOffset = data.timeZoneOffset;
			socket.accessToken = data.accessToken;

			sockets[data.fbId] = sockets[data.fbId] || [];
			sockets[data.fbId].push(socket);
		}
	});

	socket.on("interrupt", function (data) {
		console.log("interrupt: ", data);
		if (data.fbId && data.label) {
			sendMessage(data.fbId, "interruption", {
				"label": data.label,
				"senderFbId": socket.fbId
			}, function(numOfoundClients) {
				if (!numOfoundClients) {
					request.post("http://graph.facebook.com/", function(data) {
						console.log("facebook notif: ", data);
					});
				}
			});
		}
	});

	socket.on("react", function(data) {
		console.log("react: ", data);
		if (data.fbId && data.senderFbId && data.reaction && data.label) {
			sendMessage(data.senderFbId, "reaction", {
				"label": data.label,
				"senderFbId": socket.fbId,
				"reaction": data.reaction
			});
		}
	});

	socket.on("disconnect", function() {
		console.log("disconnect...");
		var socketArr = sockets[socket.fbId];

		if (!socketArr) {
			return;
		}

		for (var i = socketArr.length - 1; i >= 0; i--) {
			if (socket === socketArr[i]) {
				socketArr.splice(i, 1);
				break;
			}
		}
	});
});



function filterForTime(element) {
	var nowHours = new Date().getHours();
	return nowHours >= element.time.from && nowHours < element.time.to;
}

function randomInterruption(elements) {
	return elements[Math.floor(Math.random()*elements.length)];
}

setInterval(function() {
	for (var prop in sockets) {
		var socketArr = sockets[prop];

		var filteredLabels = interruptionLabels.filter(filterForTime);

		var label = randomInterruption(filteredLabels);

		if (label) {
			for (var i = socketArr.length - 1; i >= 0; i--) {
				socketArr[i].emit("interruption", {"label": label.label});
			}
		}
	}
}, 1000 * 60 * 60);

