var myModule = angular.module("QuizApp", [])

	   myModule.controller("QuizController", ["$scope", "$http", "LocalStorageService",
		function($scope, $http, LocalStorageService){
		   
		   var qc = this;
		   
		   qc.userAnswer1 = "";
		   qc.userAnswer2 = "";
		   qc.userAnswer3 = "";
		   qc.userAnswer4 = "";
		   qc.userAnswers = [];
		   
		   
		qc.remove = function($index){

		qc.userAnswers = qc.latestData();
		qc.userAnswers.splice($index, 1);
		return LocalStorageService.setData('my-storage', angular.toJson(qc.userAnswers));		
		
	}
    
    qc.latestData = function() {
        return LocalStorageService.getData('my-storage');
    }; 
	
    qc.update = function(userAnswer1, userAnswer2, userAnswer3, userAnswer4) {
		qc.userAnswers = qc.latestData();
		if(qc.userAnswers == null){
			qc.userAnswers = [];
		}
		if(qc.correctAnswer1 == userAnswer1){
			qc.answerResult1 = "correct";
		}else{
			qc.answerResult1 = "incorrect";
		}
		if(qc.correctAnswer2 == userAnswer2){
			qc.answerResult2 = "correct";
		}else{
			qc.answerResult2 = "incorrect";
		}
		if(qc.correctAnswer3 == userAnswer3){
			qc.answerResult3 = "correct";
		}else{
			qc.answerResult3 = "incorrect";
		}
		if(qc.correctAnswer4 == userAnswer4){
			qc.answerResult4 = "correct";
		}else{
			qc.answerResult4 = "incorrect";
		}
		
		var answer = 
		{ 
				answer1: userAnswer1, 
				grade1: qc.answerResult1,
		        answer2: userAnswer2, 
		        grade2: qc.answerResult2,
		        answer3: userAnswer3, 
		        grade3: qc.answerResult3,
		        answer4: userAnswer4,
		        grade4: qc.answerResult4
			
		};
		console.log(angular.toJson(answer));
		qc.userAnswers.push(answer);
        return LocalStorageService.setData('my-storage', angular.toJson(qc.userAnswers));
    };
    /*
    qc.grade = function(userAnswer1, userAnswer2, userAnswer3, userAnswer4) {
    	
    }*/

    
	if(qc.userAnswers != null){
		qc.userAnswers = qc.latestData();
	}else{
		console.log("oops");
	}
		   
		    $http.get("data.txt")
		   .then(function(response){
			  qc.data = angular.fromJson(response.data); 
			  qc.question1 = qc.data.questions.question1;
			  qc.question2 = qc.data.questions.question2;
			  qc.question3 = qc.data.questions.question3;
			  qc.question4 = qc.data.questions.question4;
			  qc.correctAnswer1 = qc.data.answers.answer1;
			  qc.correctAnswer2 = qc.data.answers.answer2;
			  qc.correctAnswer3 = qc.data.answers.answer3;
			  qc.correctAnswer4 = qc.data.answers.answer4;
		   });
		   
		   
		   


}]);

myModule.factory("LocalStorageService", function($window, $rootScope) {
    
    angular.element($window).on('storage', function(event) {
        if (event.key === 'my-storage') {
            $rootScope.$apply();
        }
    });    
    
    return {
        setData: function(key, val) {
			
            $window.localStorage && $window.localStorage.setItem(key, val);
            return this;
        },
        getData: function(key) {
            
            var val = $window.localStorage && $window.localStorage.getItem(key);
            
            var data = angular.fromJson(val);
            
            return data; 
        }
    };
});
