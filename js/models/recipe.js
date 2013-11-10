// for more info. about this project please check README.md
// this model represents each recipe in our database
APP.recipe = Backbone.Model.extend({
	defaults: {
		name: "Three Cup Chicken",
		ingredients: ["chicken", "ginger", "garlic"]
	}
})