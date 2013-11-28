APP.User_InputView = Backbone.View.extend({
	tagName: "div",
	el: "#mainbody",
//	section: "#landing",

	events: {
		"keypress #new-ingredient": 'createOnEnter',
		"click #match-button": "match"

	},

	initialize: function(){
		this.$input = this.$('#new-ingredient');
		this.$main = this.$('#main');
		//this.$footer = this.$('#footer');
		this.$landing_page = this.$('#landing');

		this.listenTo(APP.userIngredients, 'add', this.addOneIngredient);
		this.listenTo(APP.userIngredients, 'reset', this.addAll);
		this.listenTo(APP.userIngredients, 'all', this.render);

	},

	match: function(){
		console.log("match start");

	},

	addOneIngredient: function (ingredient) {
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
    	//console.log("createOnEnter hit");
    if (e.which !== ENTER_KEY || !this.$input.val().trim()) {
    	return;
    }

    APP.userIngredients.create(this.newAttributes());
    this.$input.val('');
  },

	render: function(){
		//this.$landing_page.hide();
		this.$main.show();
		//this.$footer.show();
		this.addAutoComplete();
		//this.$el.html(this.template());
		return this;
	},

	addAutoComplete: function(){
    	var availableTags = [
          "tomato",
          "onion",
          "chicken breast",
          "chicken wing",
          "chicken leg",
          "chicken thigh",
          "garlic",
          "milk",
          "cheese",
          "olive oil",
          "butter",
          "egg",
          "shallot",
          "chile",
          "wheat flour",
          "pork",
          "wine vinegar",
          "balsamic vinegar",
          "white vinegar",
          "red wine vinegar",
          "beef",
          "sweet pepper",
          "chicken stock",
          "herbs",
          "stalk vegetable",
          "bell pepper",
          "seafood",
          "parsley",
          "vegetable oil",
          "lemon",
          "potato",
          "carrot",
          "nut",
          "celery",
          "mushroom",
          "all purpose flour",
          "cayenne pepper",
          "basil",
          "thyme",
          "bread",
          "cilantro",
          "chicken broth",
          "cheddar",
          "soy sauce",
          "white wine",
          "parmesan cheese",
          "oregano",
          "cured pork",
          "pasta",
          "beetroot",
          "brown rice",
          "white rice",
          "lettuce",
          "cucumber",
          "zucchini",
          "chili",
          "bacon",
          "mayonnaise",
          "cumin",
          "sour cream",
          "cinnamon",
          "mustard",
          "ginger",
          "fish",
          "shrimp",
          "wine vinegar",
          "vegetable stock",
          "bay leaf",
          "spinach",
          "sausage",
          "shellfish",
          "oyster",
          "mussel",
          "clam",
          "lobster",
          "crab",
          "prawn",
          "breadcrumb",
          "corn",
          "lime",
          "jalapeno",
          "rosemary",
          "cabbage",
          "beef stock",
          "beef broth",
          "pork stock",
          "pork broth",
          "vegetable broth",
          "coriander",
          "balsamic vinegar",
          "tomato paste",
          "pickle",
          "ketchup",
          "avocado",
          "yogurt",
          "chocolate",
          "broccoli",
          "cauliflower",
          "sweet potato",
          "apple",
          "pork tenderloins",
          "orange",
          "vanilla bean",
          "curry powder",
          "black bean",
          "tortilla",
          "fennel",
          "leek",
          "eggplant",
          "cayenne",
          "turkey",
          "salmon",
          "lamb",
          "artichoke",
          "syrup",
          "mozzarella cheese",
          "mint",
          "beer",
          "squid",
          "frozen pea",
          "chili sauce",
          "oyster sauce",
          "fish fillet",
          "pineapple",
          "bok choi",
          "spaghetti",
          "asparagus",
          "scallop",
          "bean sprout",
          "linguini",
          "salami"
        ];
        $('#new-ingredient').autocomplete({
          source: availableTags
        });
    }

});