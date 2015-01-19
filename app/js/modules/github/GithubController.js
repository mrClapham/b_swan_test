githubModule.controller('GithubController', ['$scope', 'GitHubStreamData', 'GithubPublicApi', '$http', function($scope, GitHubStreamData, GithubPublicApi, $http) {
    $scope.loaded = "Search github";
    $scope.gitSearchData = {};
    $scope.searchTerm = "Three";
    $scope.lineChartHolderId = "lineChartRender";
    $scope.selectedRepoIndex = 0;
    $scope.selectedRepo = null;
    $scope.headerTemplate  = "partials/header.html";
    $scope.footerTemplate  = "partials/footer.html";
    $scope.items = [];

    // has the chart been initialised?
    $scope.barChartGit = null

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
            if($scope.items.length == 0){
                $scope.loaded = "Sorry, there were no results for "+$scope.searchTerm;
            }else{
                $scope.loaded = $scope.items.length+" results"
                if(!$scope.barChartGit){
                    $scope.LineChartRenderElement = document.getElementById($scope.lineChartHolderId);
                    $scope.initD3Chart($scope.lineChartHolderId);
                }
            }
        });
    };
//
    $scope.setActiveRepo = function(value){
        $scope.selectedRepoIndex = value;
        $scope.selectedRepo = $scope.items[$scope.selectedRepoIndex];
    }
    //-- create the d3 chart
    //TODO: if time - move this to its own directive.

    $scope.initD3Chart = function(targ){
        $scope.barChartGit = new BarChartGit(targ);
    };

    $scope.setChartYValue = function(value){
        if($scope.barChartGit){
            $scope.barChartGit.setYProperty(value)
        }
    }


}]);

