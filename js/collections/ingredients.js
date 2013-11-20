APP.Ingredients = Backbone.Collection.extend({
	model: APP.Ingredient,
//	url: "/ingredients"
});

APP.DBIngredients = new APP.Ingredients();
APP.DBIngredients.url = "/ingredients";
APP.DBIngredients.fetch();
APP.userIngredients = new APP.Ingredients();