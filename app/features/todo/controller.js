(function() {

var app = angular.module('Harmonium', []);

app.controller('ServicesCtrl',['$scope','$http', function($scope, $http) {
	console.log("Hello from Services controller");
	$scope.message = "Hello";

	$scope.create = function() {
		console.log($scope.serviceClient);
		$http.post("/serviceClients", $scope.serviceClient).success(function(response) { $scope.all(); });
	};
	
	$scope.remove = function(id) {
		$http.delete("/serviceClients/"+id).success(function(response) {
			$scope.all();
		});
	};

	$scope.update = function() {
		console.log($scope.serviceClient);
		$http.put("/serviceClients/"+ $scope.serviceClient._id, $scope.serviceClient).success(function(response){
			$scope.all();
		});
	};

	$scope.select = function(id){
		$http.get("/serviceClients/"+id).success(function(response){
			console.log(response);
			$scope.serviceClient = response;
		});
	};

	$scope.renderServiceClients = function(response) {
		$scope.serviceClients = response;
	};
	//get all
	$scope.all = function() {
	$http.get("/serviceClients").success($scope.renderServiceClients);
	};

	$scope.all();
}]);

})();