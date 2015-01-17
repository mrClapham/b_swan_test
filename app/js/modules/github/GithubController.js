githubModule.controller('GithubController', ['$scope', 'GitHubStreamData', 'GithubPublicApi', '$http', function($scope, GitHubStreamData, GithubPublicApi, $http) {
    $scope.testData = "Test data bollox";
    $scope.loaded = "Search github";
    $scope.gitSearchData = {};
    $scope.searchTerm = "Three";
    $scope.lineChartHolderId = "lineChartRender";
    $scope.selectedRepoIndex = 0;
    $scope.selectedRepo = null;

    //-- watches

    $scope.$watch("gitSearchData", function(newVal, oldVal ){
        console.log("CHANGED ", newVal.items);
        if( $scope.barChartGit && newVal.items) $scope.barChartGit.setData(newVal.items);
    });
//-- METHODS
    $scope.searchOn=function(value){
        $scope.searchTerm = value;
        $scope.items = [];
        $scope.loaded = "Looking for "+$scope.searchTerm;
        GithubPublicApi.search(value).then(function(resp){
            $scope.gitSearchData = resp;
            $scope.items = resp.items;
            if($scope.items[0]) $scope.setActiveRepo(0);
            $scope.items.length == 0 ? $scope.loaded = "Sorry, there were no results for "+$scope.searchTerm : $scope.loaded = "HAS LOADED";
        });
    };
    $scope.searchIssues = function(){
        GithubPublicApi.searchIssues("Netflix","netflix.github.com")
    }

    $scope.setActiveRepo = function(value){
        $scope.selectedRepoIndex = value;
        $scope.selectedRepo = $scope.items[$scope.selectedRepoIndex];
        console.log("ACTIVE REPO SET")

    }
    //-- create the d3 chart
    //TODO: if time - move this to its own directive.

    $scope.initD3Chart = function(targ){
        $scope.barChartGit = new BarChartGit(targ);
    };

    $scope.LineChartRenderElement = document.getElementById($scope.lineChartHolderId);
    $scope.initD3Chart($scope.lineChartHolderId);
    $scope.searchIssues("codeforamerica/three")
}]);

