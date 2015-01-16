var BarChartGit = (function(target, opt_data, opt_config){
    var _scope = function(target, opt_data, opt_config){
        this._target = target;
        this._data = opt_data || [];

        this.width      = 500;
        this.height     = 400;
        this._scaleX    = null;
        this._scaleY     = null;
        /*
         total_count
         open_issues_count
         size
         watchers_count
         forks_count
         open_issues_count
         score
         */
        this.xProperty = "stargazers_count";
        _init()

    }
//-- internal logic

    var _init = function(){

    }
    var _initSvg = function(){

    }
    var _onDataChanged = function(){
        console.log("Data Changed");
    }


// Methods
    _scope.prototype = {
        getTarget:function(){
            return this._target;
        },
        setData:function(value){
            this._data = value;
            _onDataChanged.call(this);
        },
        getData:function(){
            return this._data;
        }
    };
    return _scope
})();
// Static functions
