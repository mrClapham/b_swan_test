githubModule.directive('menuCell', function() {
    return{
        restrict:'E',
        transclude:   "true",
        replace: "true",
        templateUrl: "js/modules/github/githubMenuCellTemplate.html",
        link:function(scope, element, attrs ){
            //

        }
    }
});