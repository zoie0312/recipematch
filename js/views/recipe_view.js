APP.RecipeView = Backbone.View.extend({
	tagName: "div",
	className: "recipe",
	template: _.template('<h3 class="title"><%= recipeName %></h3>'),
	rcp_template: _.template($('#recipe-template').html()),

	events: {
		"click .title": "sayHello"

	},

	render: function(){
		//this.$el.html('<h3>' + this.model.get('name') + '</h3>');
		//console.log(this.model.get('recipeName'));
		var attributes = this.model.toJSON();
		this.$el.html(this.rcp_template(attributes));
		return this;
	},

	sayHello: function(){
		//var attributes = this.model.toJSON();
		console.log(this.model);
		alert(this.model.get("name") + " has been clicked");
	}
});