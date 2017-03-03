var myModule = angular.module("QuizApp", [])

	   myModule.controller("QuizController", ["$scope", "$http",
		function($scope, $http){
		   
		   var qc = this;
		    
		    $http.get("questions.json")
		   .then(function(response){
			  qc.data = angular.fromJson(response.data);
			  qc.questions = qc.data.questions;
		   });
		    
		    
}]);