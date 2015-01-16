var BarChartGit = (function(target, opt_data, opt_config){
    var _scope = function(target, opt_data, opt_config){
        this._target = target;
        this._data = opt_data || [];
        this.backgroundColor = "#353535"
        this.width      = 500;
        this.height     = 400;
        this.padding = {t:40, r:40, b:40,l:40};
        this._svg;
        this._gridLinesHorizontal = null;
        this._gridLinesVertical = null;

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
        _init.call(this);

    }
//-- internal logic

    var _init = function(){
        _init_svg.call(this);
    }

   var _init_svg =function(){
        this._svg = d3.select( "#lineChartRender" )

       this._svg
            .style('width', this.width+ "px")
            .style('height',  this.height+ "px")
            .style('background-color',  this.backgroundColor)
            .append('svg:svg')
            .attr('width',this.width)
            .attr('height',this.height )
            .attr('class', "chartSvg")
            .append('svg:g')
            .attr('transform', "translate(" + this.padding.l + "," + this.padding.t  + ")");

       console.log("this._svg ",this._svg );


       this._gridLinesHorizontal  =
            this._svg
                .append('svg:g')
                .attr('class', 'gridlinesH')

        this._gridLinesVertical  =
            this._svg
                .append('svg:g')
                .attr('class', 'gridlinesV');
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
