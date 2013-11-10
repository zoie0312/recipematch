// this model represents what raw materials a user already has at home
// for more info. about this project, please check README.md
var APP.Inventory = Backbone.Models.extend({
	defaults: {
		user: default_user,
		materials: ["onion", "garlic", "chicken", "tomato"]
	}

});