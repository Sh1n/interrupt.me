var io = require("socket.io").listen(3000);

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

function sendMessage(fbId, messageName, messageObject) {
	var socketArr = sockets[fbId];

	for (var i = socketArr.length - 1; i >= 0; i--) {
		socketArr[i].emit(messageName, messageObject);
	}
}


io.sockets.on("connection", function (socket) {
	socket.on("token", function(data) {
		if (data.fbId) {
			socket.fbId = data.fbId;
			socket.timeZoneOffset = data.timeZoneOffset;
			sockets[data.fbId] = sockets[data.fbId] || [];
			sockets[data.fbId].push(socket);
		}
	});

	socket.on("interrupt", function (data) {
		if (data.fbId && data.label) {
			sendMessage(data.fbId, "interruption", {
				"label": data.label,
				"senderFbId": socket.fbId
			});
		}
	});

	socket.on("react", function(data) {
		if (data.fbId && data.senderFbId && data.reaction && data.label) {
			sendMessage(data.senderFbId, "reaction", {
				"label": data.label,
				"senderFbId": socket.fbId,
				"reaction": data.reaction
			});
		}
	});

	socket.on("disconnect", function() {
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
		for (var i = socketArr.length - 1; i >= 0; i--) {
			socketArr[i].emit("interruption", label.label);
		}
	}
}, 1000 * 60);

