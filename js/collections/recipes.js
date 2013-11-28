APP.Recipes = Backbone.Collection.extend({
	model: APP.Recipe,
	//url: "/recipes"
});

//var dbRecipes = require('./db_recipes1.js');

//var DB_Recipes1 = dbRecipes.dbrecipes;

APP.DBRecipes = new APP.Recipes();
APP.DBRecipes.url = "/recipes";
APP.DBRecipes.fetch();