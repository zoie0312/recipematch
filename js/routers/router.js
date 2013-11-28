APP.Router = Backbone.Router.extend({
	routes: {
		""					: "home",
		"users"				: "fetchallusers",
		"recipes/:id"		: "recipe",
		"all_recipes"		: "all_recipes",
		"ingredients/:id"	: "ingredient",
		"user_input"		: "user_input",
		"match_result"		: "user_recipes"
	},

	/*initialize: function() {
		Backbone.history.start({pushState: true});
	},*/

	home: function(){
		console.log("home() hitted");
		$("body #mainbody #landing").show();

		$("#mainbody #match_result").hide();
		//$("body #mainbody #user_input").show();
		//$('#landing').hide();
		APP.userIngredients = new APP.Ingredients();
		APP.user_inputView = new APP.User_InputView();
		APP.user_inputView.render();

		$('body #mainbody').append(APP.user_inputView.$el);

	},
	fetchallusers: function(){
		console.log("fetch all users");
	},
	recipe: function(id){
		console.log("recipe() was hit");
		console.log(APP.DBRecipes.models.length);
		$('body #mainbody').empty();
		APP.recipe0 = new APP.Recipe();
		APP.recipe0 = APP.DBRecipes.models[id];
		APP.recipeView1 = new APP.RecipeView({
			model: APP.recipe0
		});
		APP.recipeView1.render();
		$('body #mainbody').append(APP.recipeView1.$el);

	},
	all_recipes: function(){
		console.log("all_recipes() was called");
		APP.recipes = new APP.Recipes();

		APP.recipes.fetch({
			success: function(){
				console.log("fetch recipes successfully");
				APP.recipesView = new APP.RecipesView({
					collection: APP.recipes
				});
				APP.recipesView.render();
				$('body').append(APP.recipesView.$el);

			}
		});
	},
	ingredient: function(id){
		console.log("ingredient() hitted");
		APP.ingredients = new APP.Ingredients();
		APP.ingredients.fetch({
			success: function(){
				console.log("fetch ingredients successfully");
				APP.ingredient = APP.ingredients.get(id);
				APP.ingredientView1 = new APP.IngredientView({
					model: APP.ingredient
				});
				APP.ingredientView1.render();
				//$('body').empty();
				$('body').append(APP.ingredientView1.$el);

			}
		});

	},
	user_input: function(){
		console.log("user_input() hitted");
		$("body #mainbody #landing").hide();
		$("#mainbody #match_result").hide();
		$("body #mainbody #user_input").show();
		//$('#landing').hide();
		APP.userIngredients = new APP.Ingredients();
		APP.user_inputView = new APP.User_InputView();
		APP.user_inputView.render();
		console.log($('#landing'));

		$('body #mainbody').append(APP.user_inputView.$el);

	},
	user_recipes: function(){
		//console.log("user_recipes hit");
		$("body #mainbody #landing").hide();
		$("body #mainbody #user_input").hide();
		$("#mainbody #match_result").show();
		//console.log(APP.userIngredients);
		var user_input = [];
		var user_ingredients = [];
		var user_possible_recipes = [];
		var matched_result = [];
		for (var i=0; i<APP.userIngredients.models.length; i++){
			user_input.push(APP.userIngredients.models[i].get('name'));
		}
		for (var i=0; i < user_input.length; i++){
			for (var k=0; k<APP.DBIngredients.models.length; k++){
				if (APP.DBIngredients.models[k].get('name') == user_input[i]){
					user_ingredients.push(APP.DBIngredients.models[k].get('id'));
			//console.log(DB_Ingredients[user_input[i]]['used_in']);
					user_possible_recipes = _.union(user_possible_recipes, APP.DBIngredients.models[k].get('used_in'));
				}
			}
		}

		_.forEach(user_possible_recipes, function(r){
			if ( (_.difference(APP.DBRecipes.models[r-1].get('ingredient_used'), user_ingredients)).length == 0 ){
			//console.log("bingo");
				matched_result.push(r-1);
			//console.log(DB_Recipes[r-1]['recipeName']);
			}
		});
		matched_result = _.uniq(matched_result);
		APP.userRecipes = new APP.Recipes();
		for (var i=0; i<matched_result.length; i++){
			APP.userRecipes.add(APP.DBRecipes.models[matched_result[i]]);
			//console.log(APP.DBRecipes.models[matched_result[i]].get('recipeName'));
		}
		APP.userRecipesView = new APP.RecipesView({
			collection: APP.userRecipes
		});
		APP.userRecipesView.render();
		$('#mainbody #match_result #user_recipes').append(APP.userRecipesView.$el);
	}

});

APP.router = new APP.Router();
Backbone.history.start({"root": "/"});