(function () {
    
    var app = angular.module("tutorialsApp", ['ngRoute']);
    
    var injectParams = ["$scope", "$http"];
    
    var homeController = function ($scope, $http) {
        $scope.visits = 0;
        
        $scope.incrementVisits = function() {
            $scope.visits++;
        };
        
        $scope.message = "I am a message. Please print me!";
        
        $scope.catlist = "";
        
        $http.get("/cats/fullList").success(function(data, status, headers, config) {
            $scope.catlist = data;
        });
    };
    
    homeController.$injector = injectParams;
    
    app.controller("homeController", homeController);
    
}());