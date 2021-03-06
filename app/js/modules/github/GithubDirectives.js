githubModule.directive('mainProjectDisplay', ['GithubPublicApi', function(GithubPublicApi) {
    return{
        restrict:'E',
        transclude:   "true",
        replace: "true",
        scope:{},
        templateUrl: "js/modules/github/GithubMainProjectDisplay.html",
        link:function(scope, element, attrs ){
            //TODO: Add the catch for Errors when the limit has been exceeded on calls to api.
            scope.getIssues = function(){
                scope.issueData = []; // just to do an immediate hide of old issues
                if(scope.$parent.selectedRepo && scope.$parent.selectedRepo.full_name){
                    GithubPublicApi.searchIssues(scope.$parent.selectedRepo.full_name).then(function(resp){
                        scope.issueData = resp.items
                        scope.total_count = resp.total_count
                    })
                }
            }
            //---

            scope.$watch('$parent.selectedRepo', function(newVal, oldVal){
                scope.getIssues();
            });
        }
    }
}]);


githubModule.directive('menuCell', function() {
    return{
        restrict:'E',
        transclude:   "true",
        replace: "true",
        templateUrl: "js/modules/github/githubMenuCellTemplate.html",
        link:function(scope, element, attrs ){


        }
    }
});




