githubModule.controller('GithubController', ['$scope', 'GitHubStreamData', 'GithubPublicApi', '$http', function($scope, GitHubStreamData, GithubPublicApi, $http) {
    $scope.testData = "Test data bollox"
    $scope.searccData = GithubPublicApi.search();
}]);

