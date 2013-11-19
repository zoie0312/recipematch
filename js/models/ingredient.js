APP.Ingredient = Backbone.Model.extend({
	urlRoot: "/ingredients",

	defaults: {
		name: "Onion",
		used_in: [1, 2, 3]
	}
});