APP.Ingredients = Backbone.Collection.extend({
	model: APP.Ingredient,
//	url: "/ingredients"
});

APP.DBIngredients = new APP.Ingredients();
APP.DBIngredients.url = "/db_ingredients";
APP.DBIngredients.fetch();
//console.log("111");
//console.dir(APP.DBIngredients);
//console.dir(APP.DBIngredients.models);
//console.dir(APP.DBIngredients.models[0]);
//console.dir(APP.DBIngredients.models[1].get('name'));
APP.userIngredients = new APP.Ingredients();