var AppMain = new angular.module('AppMain', ["GithubModule", "ngRoute"])
AppMain.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/git', {
                templateUrl: 'js/modules/github/GithubTemplate.html'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);

AppMain.controller('mainController', ['$scope', function($scope){
    $scope.data = "mainController data"

}])
