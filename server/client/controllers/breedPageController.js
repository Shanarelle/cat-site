/* name, description, characteristics in breed 
     name and pic in each item of relatedBreeds
     author, date, text, and picturelist in commentlist
     name and picture url in commentlist */
         
(function() {
    
    var app = angular.module("tutorialsApp");
    
    var injectParams = ["$scope", "$http", "$routeParams"];
    
    var breedController = function ($scope, $http, $routeParams) {
        $scope.breed = {
            'name':$routeParams.breedName,
            'characteristics':[
                'char1',
                'char2'
            ],
            'description':'lorem'
        };
        
        $scope.commentList = [
            {
                author:'John',
                date:'16/02/12',
                text:'I love cats me. Especially fluffy ones!',
                pictureList: [
                    {
                        pic:'/contents/images/cat.jpg',
                        name:'jeff'
                    },
                    {
                        pic:'/contents/images/cat_1.jpg',
                        name:'jeff'
                    },
                    {
                        pic:'/contents/images/cat_2.jpg',
                        name:'jeff'
                    },
                    {
                        pic:'/contents/images/cat_3.jpg',
                        name:'jeff'
                    },
                    {
                        pic:'/contents/images/cat_4.jpg',
                        name:'jeff'
                    }
                ]
            }
        ];
        
        //get selection of photos for breed from flickr
        $http.get("/cats/breed?breed="+$routeParams.breedName).success(function(data, status, headers, config) {
            $scope.relatedBreeds = data;
        });
    };
    
    breedController.$injector = injectParams;
    
    app.controller("breedController", breedController);
         
         
}());