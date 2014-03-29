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
		console.error("sendMessage -- connection with that fbId not found.", fbId);
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
					// POST /{recipient_userid}/notifications?access_token= … &template= … &href= …
					request.post("https://graph.facebook.com/" + data.fbId + "/notifications?access_token=" + socket.accessToken + "&template=InterruptYourFriends!!!&href=https://www.facebook.com/pouz.co", function(data) {
						console.log("facebook notif: ", data);
					});





//https://graph.facebook.com/1157890924/notifications?access_token=CAAKqkZCzNTG0BADCU2eAYrAdpXGd8OZBwd05m1Rx6txZBaGah8D5QDZChABhfis4xZA4nOLKZBs3hZC9KXDcbZAXu5EtWzE7MU81Y3DvNOl7DT3omuYdrrTT8qe0WKjghHCw5ZABSbTxE8lrQoDXB87FpGLRZC8ogfggjfwcuMm2N3COyFalpDZCcpgiRO5fYtavAgZD&template=InterruptYourFriends!!!&href=https://www.facebook.com/pouz.co
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


function createFilterForTime(timeZoneOffset) {
	var nowHours = new Date().getHours() + timeZoneOffset / 60;
	return function filterForTime(element, nowHours) {
		return nowHours >= element.time.from && nowHours < element.time.to;
	};
}

function randomInterruption(elements) {
	return elements[Math.floor(Math.random()*elements.length)];
}

setInterval(function() {
	for (var prop in sockets) {
		var socketArr = sockets[prop];

		if (socketArr.length < 1) {
			continue;
		}

		var filteredLabels = interruptionLabels.filter(createFilterForTime(socketArr[0].timeZoneOffset));

		var label = randomInterruption(filteredLabels);

		if (label) {
			for (var i = socketArr.length - 1; i >= 0; i--) {
				socketArr[i].emit("interruption", {"label": label.label});
			}
		}
	}
}, 1000 * 60 * 60);

