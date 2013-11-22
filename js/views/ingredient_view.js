APP.IngredientView = Backbone.View.extend({
	tagName: "div",
	className: "ingredient",

	template: _.template('<label><%= name %></label>' +
		'<button><span class="glyphicon glyphicon-remove"></span></button>'),
	ing_template: _.template($('#ingredient-template').html()),

	events: {
		"click .destroy": "clear"

	},

	initialize: function(){
		this.listenTo(this.model, 'destroy', this.remove);

	},

	render: function(){
		//this.$el.html('<h3>' + this.model.get('name') + '</h3>');
		var attributes = this.model.toJSON();
		this.$el.html(this.ing_template(attributes));
		this.$input = this.$('.edit');
		return this;
	},

	clear: function(){
		this.model.destroy();

	}
});