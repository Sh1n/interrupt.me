pouzApp.controller('LoginController', ['$scope', 'pouzServer', 'FBConnection' , function($scope, pouzServer, FBConnection) {

  $scope.login = function() {

  	pouzServer.registerInterruptionCallback(function(e) {
		//alert(e);
		//goBgService();

            	//navigator.notification.vibrate(2000);
		//navigator.notification.beep(1);

		console.log("interruption recieved - " + JSON.stringify(e));
		
		//window.plugin.notification.local.setDefaults({ autoCancel: true });
		var now = new Date().getTime();
		var _almost_now = new Date(now + 2 * 1000);

		window.plugin.notification.local.add({
			id:      1,
			title:   'Reminder',
			message: 'Dont forget to buy some flowers.',
			//repeat:  'weekly',
			date:    _almost_now,

			foreground: foreground,
			background: background
		});
		
		function foreground(id) {
			console.log('I WAS RUNNING ID='+id)
		}

		function background(id) {
			console.log('I WAS IN THE BACKGROUND ID='+id)
		}

		console.log("after notification");
	});

	var userFbId = "user1";
	pouzServer.openConnection(userFbId, '');

	alert('connected');
	console.log('server connected');
	//pouzServer.interrupt("user2", "lunch");

    //DO LOGIN or GET USER's FB ID
 /*   FBConnection.login(function() {
      // open connection with server
      pouzServer.registerInterruptionCallback(function(e) {
      	alert(e);
      });
      var userFbId = "user1";
      pouzServer.openConnection(userFbId, '');

      // go to main view
      $scope.setView('friends_list');
    });
*/
  }

}]);

