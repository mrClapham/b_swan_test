githubModule.controller('GithubController', ['$scope', 'GitHubStreamData', 'GithubPublicApi', '$http', function($scope, GitHubStreamData, GithubPublicApi, $http) {
    $scope.testData = "Test data bollox";
    $scope.loaded = "NOT LOADED";
    $scope.gitSearchData = {};
    $scope.searchTerm = "Three";
    $scope.lineChartHolderId = "lineChartRender";

    //-- watches

    $scope.$watch("gitSearchData", function(oldVal, newVal){
        console.log("CHANGED ", oldVal, newVal);
        if( $scope.barChartGit ) $scope.barChartGit.setData(newVal);
    });
//-- METHODS
    $scope.searchOn=function(value){
        $scope.searchTerm = value;
        $scope.items = [];
        $scope.loaded = "Looking for "+$scope.searchTerm;
        GithubPublicApi.search(value).then(function(resp){
            console.log("Search done...",resp);
            $scope.gitSearchData = resp;

            $scope.items = resp.items;

            $scope.items.length == 0 ? $scope.loaded = "Sorry, there were no reults for "+$scope.searchTerm : $scope.loaded = "HAS LOADED";
        });

    };
    //-- create the d3 chart
    //TODO: if time - move this to its own directive.

    $scope.initD3Chart = function(targ){
        $scope.barChartGit = new BarChartGit(targ);
    };

    $scope.LineChartRenderElement = document.getElementById($scope.lineChartHolderId);
    $scope.initD3Chart($scope.lineChartHolderId);
}]);

