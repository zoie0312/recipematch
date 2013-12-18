APP.CuisinesView = Backbone.View.extend({
	//tagName: "div",
	className: "cuisines",
	//template: _.template('<h3><%= name %></h3>'),

	initialize: function( ){
		var VIZ = {}
		VIZ.w = 700;
		VIZ.h = 500;
		var path = d3.geo.path();
		d3.json("/readme.json", function(json) {

        svg.selectAll("path")
           .data(json.features)
           .enter()
           .append("path")
           .attr("fill", "#ccc")
           .attr("stroke", "#fff")
           .attr("d", path);

		});
		var projection = d3.geo.mercator()
                       .translate([VIZ.w/2, VIZ.h/2])
                       .scale([100]);
        var path = d3.geo.path()
                 .projection(projection);

		var svg = d3.select("#mainbody #match_result #user_recipes")
		.append("svg")
		.attr("width", VIZ.w)
		.attr("height", VIZ.h);

	},

	render: function(){
		this.collection.forEach(function(model){
			APP.recipeView = new APP.RecipeView({
				model: model
			});
			this.$el.append(APP.recipeView.render().el);

		}, this);

	}
});