githubModule.controller('GithubController', ['$scope', 'GitHubStreamData', 'GithubPublicApi', '$http', function($scope, GitHubStreamData, GithubPublicApi, $http) {
    $scope.testData = "Test data bollox";
    $scope.loaded = "NOT LOADED";
    $scope.searchTerm = "Three";

    $scope.searchOn=function(value){
        $scope.searchTerm = value;
        $scope.items = [];
        $scope.loaded = "Looking for "+$scope.searchTerm
        GithubPublicApi.search(value).then(function(resp){
            console.log("Search done...",resp)
            $scope.gitSearchData = resp;
            $scope.loaded = "HAS LOADED"
            $scope.items = resp.items
        });

    };

}]);

