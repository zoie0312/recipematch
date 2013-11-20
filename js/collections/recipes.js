APP.Recipes = Backbone.Collection.extend({
	model: APP.Recipe,
	//url: "/recipes"
});

APP.DBRecipes = new APP.Recipes();
APP.DBRecipes.url = "/recipes";
APP.DBRecipes.fetch();