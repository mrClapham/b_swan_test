var BarChartGit = (function(target, opt_data, opt_config){
    var _scope = function(target, opt_data, opt_config){
        this._target = target;
        this._data = opt_data || [];
        this.backgroundColor = "#353535"
        this.width      = 1170;
        this.height     = 500;
        this.padding = {t:40, r:40, b:240,l:90};
        this._svg;
        this._gridLinesHorizontal = null;
        this._gridLinesVertical = null;
        this.barColour = "#D3EC0E"

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
       var _this = this;

       this._svg = d3.select( "#"+this.getTarget() )
            .style('width', this.width+ "px")
            .style('height',  this.height+ "px")
            .style('background-color',  this.backgroundColor)
            .append('svg:svg')
            .attr('width',this.width)
            .attr('height',this.height )
            .attr('class', "chartSvg")

       this.title_bar = this._svg
           .append("text")
           .attr("class", "chart-title-text")
           .attr('fill',  "#ffffff")
           .attr("x", _this.padding.l)
           .attr("y", _this.padding.t/2)
           .attr("dy", ".71em")
//           .style("text-anchor", "end")
           .text(function(d,i){return _this.yProperty.split('_').join(" ") });

       this._inner = this._svg
            .append('svg:g')
            .attr('transform', "translate(" + this.padding.l + "," + this.padding.t  + ")");

       this._lineHolder = this._inner.append('g')
           .attr('width',this.width-(this.padding.r +this.padding.l) )
           .attr('height',this.height-(this.padding.t +this.padding.b) )

       this._lineHolderRect = this._lineHolder
           .append('svg:rect')
           .attr('width',this.width-(this.padding.r +this.padding.l) )
           .attr('height',this.height-(this.padding.t +this.padding.b) )
           .style('background-color',  "0xffff00")


       this._gridLinesX  =
            this._svg
                .append('svg:g')
                .attr('class', 'gridlinesH')

       this._gridLinesY  =
            this._svg
                .append('svg:g')
                .attr('class', 'gridlinesV')
                .attr('fill', '#ffffff')
                .attr("transform", "translate(" + this.padding.l +","+this.padding.t+ ")")
       ;
    }

    var _onDataChanged = function(){
        var _this = this;
        var max = d3.max(this._data, function(d) {
            return d[_this.yProperty];} );

        console.log("MAX   ",max);

        this._scaleY = d3.scale.linear()
            .range([0, this.height-(this.padding.t +this.padding.b) ])
            .domain([max,0 ]);

        this.xAxis = d3.svg.axis()
            .scale(this._scaleX)
            .orient("bottom");

        this.yAxis = d3.svg.axis()
            .scale(this._scaleY)
            .orient("left")
            .ticks(10);

        this._bars = this._lineHolder.selectAll(".bar")
            .data(this._data);

        this._bars
            .enter().append("svg:g")
            .attr("class", "bar")
            .append("rect")
            .attr("class", "barDisplay")
            .attr('fill',  this.barColour)

        this._bars
            .select('.chart-text')
            .remove();

        this._barsText = this._bars
            .append("text")
            .attr("class", "chart-text")
            .attr('fill',  "#ffffff")
            .attr("transform", "rotate(-90)")
            .attr("y", 16)
            .attr("x", - (this.height-this.padding.b) )
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text(function(d,i){return d.full_name+": "+d[_this.yProperty]});

        this._bars.exit().remove();


        _updateView.call(this);
    }


    var _updateView = function(){
        var _this = this

            _this.title_bar
            .text(function(d,i){return _this.yProperty.split('_').join(" ") });


        this._gridLinesY
            .call(this.yAxis);

//            .attr("y", function(d,i){ return _this.height - ( _this._scaleY(d[_this.yProperty]) )} )
//            .attr("height", function(d) { return _this._scaleY(d[_this.yProperty]) });

        var barSpacing = (_this.width-this.padding.l-this.padding.r)/30

        this._bars.transition()
            .duration(800)
            //.attr("x", function(d, i) { return 30 * i; })
            .attr("transform", function(d, i) {
                return "translate("+barSpacing*i+","+0+")";
            })
            .select('.barDisplay')
            .attr("y", function(d,i){ return _this._scaleY(d[_this.yProperty])} )

            .attr("height", function(d, i) {
            console.log(i," : ",d[_this.yProperty]," ",_this._scaleY(d[_this.yProperty]) )
            return (_this.height-_this.padding.b - _this.padding.t) - _this._scaleY(d[_this.yProperty])
            })
            .attr("width", ((_this.width-this.padding.l-this.padding.r)/30-3) );
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
        },
        setYProperty:function(value){
            this.yProperty  = value
            _onDataChanged.call(this);
        }
    };
    return _scope
})();
// Static functions
