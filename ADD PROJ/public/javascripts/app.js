angular.module('carshow', [])
.controller('MainCtrl', [
  '$scope','$http',
  function($scope,$http){
	$scope.cars = [];
    $scope.create = function(newcar) {
      return $http.post('/cars', newcar).success(function(data){
        $scope.cars.push(data);
      });
    };
	$scope.addCar = function() {
	 var newcar = {foto:$scope.foto, name:$scope.name, title:$scope.title, url:$scope.url, upvotes:0};
	  if($scope.foto==''){
		  newcar.foto="";
	  }
	  $scope.foto='';
      $scope.name='';
      $scope.title='';
	  $scope.url='';
	  $scope.create(newcar);
    };
	
	$scope.clear = function() {
	   $http({
  method: 'GET',
  url: '/delete'
}).then(function successCallback(response) {
	
  }, function errorCallback(response) {
  });
	//console.log('deleting all');
	  $scope.getAll();
    };
	
	
	
    $scope.upvote = function(car) {
      return $http.put('/cars/' + car._id + '/upvote')
        .success(function(data){
         // console.log("upvote worked");
          car.upvotes = data.upvotes;
        });
    };
	 $scope.remove = function(car) {
      return $http.delete('/cars/' + car._id)
        .success(function(data){
          console.log("delete worked");
          car.upvotes = data.upvotes;
        });
    };
	$scope.incrementUpvotes = function(car) {
	  $scope.upvote(car);
    };
	
	$scope.delete = function(car) {
	  $scope.remove(car);
	  $scope.getAll();
    };
	
	 $scope.decrementUpvotes = function(car) {
      return $http.put('/cars/' + car._id + '/downvote')
        .success(function(data){
         // console.log("dv worked");
          car.upvotes = data.upvotes;
        });
    };
	
    $scope.getAll = function() {
      return $http.get('/cars').success(function(data){
        angular.copy(data, $scope.cars);
      });
    };
    $scope.getAll();

  }
]);
