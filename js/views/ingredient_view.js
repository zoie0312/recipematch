APP.IngredientView = Backbone.View.extend({
	tagName: "div",
	className: "ingredient",
	template: _.template('<label><%= name %></label>' +
		'<button><span class="glyphicon glyphicon-remove"></span></button>'),

	events: {
		"click .glyphicon-remove": "remove"

	},

	render: function(){
		//this.$el.html('<h3>' + this.model.get('name') + '</h3>');
		var attributes = this.model.toJSON();
		this.$el.html(this.template(attributes));
		return this;
	},

	remove: function(){
		this.$el.remove();

	}
});