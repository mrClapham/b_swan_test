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
         forks
         */
        this.yProperty = "stargazers_count";
        _init.call(this);

    }
//-- internal logic

    var _init = function(){
        _init_svg.call(this);
    }

   var _init_svg =function(){
        this._svg = d3.select( "#"+this.getTarget() )
            .style('width', this.width+ "px")
            .style('height',  this.height+ "px")
            .style('background-color',  this.backgroundColor)
            .append('svg:svg')
            .attr('width',this.width)
            .attr('height',this.height )
            .attr('class', "chartSvg")

       this._inner = this._svg
            .append('svg:g')
            .attr('transform', "translate(" + this.padding.l + "," + this.padding.t  + ")");

       this._lineHolder = this._inner.append('g')
           .attr('width',this.width)
           .attr('height',this.height )

       this._lineHolder
           .append('svg:rect')
           .attr('width',this.width)
           .attr('height',this.height )
           .style('background-color',  "0xffff00")


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
        var _this = this
        var max = d3.max(this._data, function(d) {
            return d[_this.yProperty];} );
        console.log("MAX   ",max);
        this._scaleY = d3.scale.linear()
            .range([0, this.height])
            .domain([0,max ]);

        _updateView.call(this);
    }

    var _initView = function(){

    }

    var _updateView = function(){
        var _this = this
        this._bars = this._svg.selectAll(".bar")
            .data(this._data);

        this._bars
            .enter().append("rect")
            .attr("class", "bar")
            .attr('fill',  "#ff00ff")
            .attr("x", function(d, i) { return 10 * i; })
            .attr("width", 20)
//            .attr("y", function(d,i){ return _this.height - ( _this._scaleY(d[_this.yProperty]) )} )
//            .attr("height", function(d) { return _this._scaleY(d[_this.yProperty]) });


        this._bars.transition()
            .duration(800)
            .attr("y", function(d,i){ return _this.height - ( _this._scaleY(d[_this.yProperty]) )} )
            .attr("height", function(d) { return _this._scaleY(d[_this.yProperty]) });

        this._bars.exit().remove();
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
