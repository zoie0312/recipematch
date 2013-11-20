APP.User_InputView = Backbone.View.extend({
	tagName: "div",
	el: "#mainbody",
//	section: "#landing",

	template: _.template('<div class="modal fade" id="addIngredient" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' +
							'<div class="modal-dialog">' +
								'<div class="modal-content">' +
									'<div class="modal-header">' +
										'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
										'<h4 class="modal-title" id="myModalLabel">What do you have in your frige?</h4>' +
									'</div>' +
									'<div class="modal-body">' +
									'......' +
									'</div>' +
									'<div class="modal-footer">' +
										'<button type="button" class="btn btn-primary" data-dismiss="modal">Match</button>' +
									'</div>' +
								'</div><!-- /.modal-content -->' +
							'</div><!-- /.modal-dialog -->' +
						'</div><!-- /.modal -->'),
	userinputTemplate: _.template($('#stats-template').html()),

	events: {
		"keypress #new-ingredient": 'createOnEnter',
		"click #match-button": "match"

	},

	initialize: function(){
		this.$input = this.$('#new-ingredient');
		this.$main = this.$('#main');
		this.$footer = this.$('#footer');
		this.$landing_page = this.$('#landing');

		this.listenTo(APP.userIngredients, 'add', this.addOne);
		this.listenTo(APP.userIngredients, 'reset', this.addAll);
		this.listenTo(APP.userIngredients, 'all', this.render);

		//APP.userIngredients.fetch({reset: true});
	},

	match: function(){
		console.log("match start");

	},

	addOne: function (ingredient) {
        var view = new APP.IngredientView({ model: ingredient });
        $('#ingredient-list').append(view.render().el);
    },

    newAttributes: function () {
    	return {
    		name: this.$input.val().trim(),
    		//order: app.todos.nextOrder(),
    		//completed: false
    	};
    },

    createOnEnter: function (e) {
    	console.log("createOnEnter hit");
    	if (e.which !== ENTER_KEY || !this.$input.val().trim()) {
    		return;
    	}

        APP.userIngredients.create(this.newAttributes());
        this.$input.val('');
    },

	render: function(){
		//this.$el.html('<h3>' + this.model.get('name') + '</h3>');
		//var attributes = this.model.toJSON();
		console.log("render user_input");
		//console.log(this.$('#landing'));
		this.$landing_page.hide();
		this.$main.show();
		this.$footer.show();
		//this.$el.html(this.template());
		return this;
	}

});