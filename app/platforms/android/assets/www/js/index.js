/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var APP_IS_ACTIVE = true;


var app = {
	// Application Constructor
	initialize: function() {
		this.bindEvents();

		app.fbId = '750502531648621';
	},
	// Bind Event Listeners
	//
	// Bind any events that are required on startup. Common events are:
	// 'load', 'deviceready', 'offline', and 'online'.
	bindEvents: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},

	// deviceready Event Handler
	//
	// The scope of 'this' is the event. In order to call the 'receivedEvent'
	// function, we must explicity call 'app.receivedEvent(...);'
	onDeviceReady: function()
	{
		app.receivedEvent('deviceready');

		document.addEventListener("pause", onPause, false);
		document.addEventListener("resume", onResume, false);


		window.plugin.notification.local.onclick = function (json)
		{
			console.log("notification click event -- " + id);
			console.log(json);

			// go and display the interruptions
		}
	},

	// Update DOM on a Received Event
	receivedEvent: function(id)
	{
		var parentElement = document.getElementById(id);

		console.log('Received Event: ' + id);
	}
};



function onPause()
{
	APP_IS_ACTIVE = false;
}


function onResume()
{
	APP_IS_ACTIVE = true;
}


function connectServer(pouzServer, userFbId)
{
	pouzServer.registerInterruptionCallback(function(e)
	{
		//alert(e);
		//goBgService();

		//navigator.notification.vibrate(2000);
		//navigator.notification.beep(1);

		console.log("interruption recieved - " + JSON.stringify(e));

		if (!APP_IS_ACTIVE)
		{
			var now = new Date().getTime();
			var _almost_now = new Date(now + 2 * 1000);

			window.plugin.notification.local.add({
				//id:      1,
				title:   e.label,
				message: 'Time for an interruption!',
				date:    _almost_now,

				json:   JSON.stringify(e)
			});

			console.log("after notification");
		}
		else
		{
			// go directly and display the interruptions
			alert('Interuption! ' + e.label);
		}
	});

	pouzServer.openConnection(userFbId, '');

	alert('connected');
	console.log('server connected');
	//pouzServer.interrupt("user2", "lunch");
}


