githubModule.directive('mainProjectDisplay', ['GithubPublicApi', function(GithubPublicApi) {
    return{
        restrict:'E',
        transclude:   "true",
        replace: "true",
        scope:{},
        templateUrl: "js/modules/github/GithubMainProjectDisplay.html",
        link:function(scope, element, attrs ){
            scope.getIssues = function(){
                if(scope.$parent.selectedRepo && scope.$parent.selectedRepo.full_name){
                    GithubPublicApi.searchIssues(scope.$parent.selectedRepo.full_name).then(function(resp){
                        scope.issueData = resp.items
                        console.log(scope.issueData)
                    })
                }

            }
            //---

            scope.$watch('$parent.selectedRepo', function(newVal, oldVal){
                console.log("THE VALUE HAS BEEN CHANGED")
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
            // nowt yet - but who knows...

        }
    }
});