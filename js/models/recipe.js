// this model represents each recipe in our database
// for more info. about this project please check README.md
var APP.Recipe = Backbone.Model.extend({
	defaults: {
		name: "Three Cup Chicken",
		ingredients: ["chicken", "ginger", "garlic"]
	}
});