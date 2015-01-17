githubModule.factory('GitHubStreamData', function(){
    return {title:"GitHubStreamData",
            searchTerm:'Angular'}
})


githubModule.factory('GithubPublicApi', function($resource, $q, GitHubStreamData) {
    var GithubPublic = $resource('https://api.github.com/search/repositories/',
        {   get: { method: "JSONP" }
            , jsoncallback: 'JSON_CALLBACK'
        });
// This is a bog statndard search method
    return {
        search: function(value) {
            if(value) GitHubStreamData.searchTerm = value;
            var q = $q.defer();
            GithubPublic.get({
                q: GitHubStreamData.searchTerm
            }, function(resp) {
                console.log("REST ",resp)
                GitHubStreamData.items = resp.items
                q.resolve(resp);
            }, function(err) {
                console.log("ERROR ", err)
                q.reject(err);
            })
            return q.promise;
        },
        searchIssues:function(reponame){
            var GithubIssues = $resource('https://api.github.com/search/issues/',
                {   get: { method: "JSONP" }
                    , jsoncallback: 'JSON_CALLBACK'
                });
            var q = $q.defer();
            GithubIssues.get({
                q: reponame
            }, function(resp) {
                console.log("REST ISUUES ",resp)
                q.resolve(resp);
            }, function(err) {
                console.log("ERROR ON ISSUES", err)
                q.reject(err);
            })
            return q.promise;
        },
        search2:function(){
            var TwitterAPI = $resource("https://api.github.com/search/repositories/",
                { callback: "JSON_CALLBACK" },
                { get: { method: "JSONP" }});

                var result = TwitterAPI.get({ q: "charlie" });
                console.log("RESULT :: ",result)
        }
    }
})
