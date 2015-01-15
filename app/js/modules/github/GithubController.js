githubModule.controller('GithubController', ['$scope', 'GitHubStreamData', 'GithubPublicApi', '$http', function($scope, GitHubStreamData, GithubPublicApi, $http) {
    $scope.testData = "Test data bollox";
    $scope.loaded = "NOT LOADED";

    GithubPublicApi.search().then(function(resp){
        console.log("Search done...",resp)
        $scope.gitSearchData = resp;
        $scope.loaded = "HAS LOADED"
        $scope.items = resp.items
    });
}]);

