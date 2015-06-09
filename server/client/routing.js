(function () {
    // configure our routes
    angular.module('tutorialsApp').config(function ($routeProvider) {
        $routeProvider
        // route for the home page
        .when('/', {
            templateUrl : 'templates/homeTemplate.html',
            controller  : 'homeController'
        })
        .when('/breedPage/:breedName', {
            templateUrl : 'templates/breedPageTemplate.html',
            controller  : 'breedController' 
        })
        .otherwise( {
            templateUrl : 'templates/homeTemplate.html',
            controller  : 'homeController'
        });
    });
}());