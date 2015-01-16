githubModule.controller('GithubController', ['$scope', 'GitHubStreamData', 'GithubPublicApi', '$http', function($scope, GitHubStreamData, GithubPublicApi, $http) {
    $scope.testData = "Test data bollox";
    $scope.loaded = "NOT LOADED";
    $scope.searchTerm = "Three";
    $scope.lineChartHolderId = "lineChartRender";
//-- methods
    $scope.searchOn=function(value){
        $scope.searchTerm = value;
        $scope.items = [];
        $scope.loaded = "Looking for "+$scope.searchTerm;
        GithubPublicApi.search(value).then(function(resp){
            console.log("Search done...",resp);
            $scope.gitSearchData = resp;
            $scope.loaded = "HAS LOADED";
            $scope.items = resp.items;
        });

    };
    //-- create the d3 chart
    $scope.initD3Chart = function(targ){
        $scope.barChartGit = new BarChartGit(targ);
        console.log("$scope.barChartGit ",$scope.barChartGit);
        console.log("targ ------------ ",targ);
    };

    $scope.LineChartRenderElement = document.getElementById($scope.lineChartHolderId);

    console.log("$scope.LineChartRenderElement  ",$scope.LineChartRenderElement)
    $scope.initD3Chart($scope.LineChartRenderElement);
}]);

