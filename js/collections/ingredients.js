APP.Ingredients = Backbone.Collection.extend({
	model: APP.Ingredient,
//	url: "/ingredients"
});

APP.DBIngredients = new APP.Ingredients();
APP.DBIngredients.url = "/db_ingredients";
APP.DBIngredients.fetch(); //doesn't actually fetch ingredients; serve as
							//a way to differentiate each connection

APP.userIngredients = new APP.Ingredients();