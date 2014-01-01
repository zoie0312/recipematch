APP.RecipesView = Backbone.View.extend({
	tagName: "div",
	className: "recipes",
	//template: _.template('<h3><%= name %></h3>'),
	render: function(){
		console.log("RecipesView called");
		this.collection.forEach(function(model){
			APP.recipeView = new APP.RecipeView({
				model: model
			});
			this.$el.append(APP.recipeView.render().el);

		}, this);

	}
});