pouzApp.controller('LoginController', ['$scope', 'pouzServer', 'FBConnection' , function($scope, pouzServer, FBConnection) {

	$scope.login = function()
	{
		userFbId = "user1";
		connectServer(pouzServer, userFbId);

	  	// DO LOGIN or GET USER's FB ID
		/*   FBConnection.login(function() {
			// open connection with server
			connectServer(pouzServer, userFbId);
			
			// go to main view
			$scope.setView('friends_list');
		});
		*/
	}
}]);