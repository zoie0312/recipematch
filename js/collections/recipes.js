APP.Recipes = Backbone.Collection.extend({
	model: APP.Recipe,
	url: "/recipes"
});