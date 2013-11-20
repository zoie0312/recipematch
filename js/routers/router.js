APP.Router = Backbone.Router.extend({
	routes: {
		"first": "firstRoute",
		"second": "secondRoute",
		"users": "fetchallusers",
		"recipe": "recipe",
		"all_recipes": "all_recipes",
		"ingredients/:id": "ingredient",
		"user_input": "user_input",
		"match_result": "user_recipes",
		"": "home"
	},

	/*initialize: function() {
		Backbone.history.start({pushState: true});
	},*/

	firstRoute: function(){
		console.log("firstRoute() loaded");
		//APP.user1 = new APP.User();
		//APP.user2 = new APP.User();
		//APP.user1.set({name:"Collin", phone:"40638888" });
		//APP.user2.set({name: "Dan", address:"somewhere in the planet"});

		APP.userCollection = new APP.Users();
		//APP.usersView = new APP.UsersView({collection: APP.userCollection});
		APP.userCollection.create({name:"Collin", phone:"40638888" });
		APP.userCollection.create({name:"Dan", phone:"somewhere in the planet" });
		//APP.userCollection.fetch();
	},

	secondRoute: function(){
		console.log("secondRoute() loaded");
		APP.usersCollection = new APP.Users();
		APP.usersCollection.fetch();
		console.log(APP.usersCollection);

	},
	fetchallusers: function(){
		console.log("fetch all users");
	},
	recipe: function(id){
		console.log("recipes() was hit");
		APP.recipes = new APP.Recipes();
		APP.recipes.fetch({
			success: function(){
				console.log('fetch recipes successfully');
				APP.recipe0 = APP.recipes.get(1);
				APP.recipeView1 = new APP.RecipeView({
					model: APP.recipe0
				});
				APP.recipeView1.render();
				$('body').append(APP.recipeView1.$el);
			},
			error: function(){
				console.log("ttt");
				console.log(arguments);
			}
		});
		//console.log(APP.recipes.get(2));
	},
	all_recipes: function(){
		console.log("all_recipes() was called");
		APP.recipes = new APP.Recipes();
		/*APP.recipes.fetch().done(function(){
			console.log("fetch successfully");
				APP.recipesView = new APP.RecipesView({
					collection: APP.recipes
				});
				APP.recipesView.render();
		});*/

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
		$("body #mainbody").empty();
		//console.log(APP.userIngredients);
		var user_input = [];
		var user_ingredients = [];
		var user_possible_recipes = [];
		var matched_result = [];
		for (var i=0; i<APP.userIngredients.models.length; i++){
			user_input.push(APP.userIngredients.models[i].get('name'));
		}
		for (var i=0; i < user_input.length; i++){
		//console.log(user_input[i]);
		//console.log(DB_Ingredients['tomato']);
		//console.log(DB_Ingredients.hasOwnProperty('tomato'));
			for (var k=0; k<APP.DBIngredients.models.length; k++){
				if (APP.DBIngredients.models[k].get('name') == user_input[i]){
					user_ingredients.push(APP.DBIngredients.models[k].get('id'));
			//console.log(DB_Ingredients[user_input[i]]['used_in']);
					user_possible_recipes = _.union(user_possible_recipes, APP.DBIngredients.models[k].get('used_in'));
				}
			}

		//console.log(user_possible_recipes);
		//console.log(user_ingredients);
		}

		_.forEach(user_possible_recipes, function(r){
		//console.log(DB_Recipes[r-1]['ingredient_used']);
		//console.log(_.intersection(DB_Recipes[r-1]['ingredient_used'], user_ingredients));
		//if ( _.intersection(DB_Recipes[r-1]['ingredient_used'], user_ingredients) == DB_Recipes[r-1]['ingredient_used'] ){
			if ( (_.difference(APP.DBRecipes.models[r-1].get('ingredient_used'), user_ingredients)).length == 0 ){
			//console.log("bingo");
				matched_result.push(r-1);
			//console.log(DB_Recipes[r-1]['recipeName']);
			}
		});
		matched_result = _.uniq(matched_result);
		//console.log(matched_result);
		APP.userRecipes = new APP.Recipes();
		for (var i=0; i<matched_result.length; i++){
			APP.userRecipes.add(APP.DBRecipes.models[matched_result[i]]);
			//console.log(APP.DBRecipes.models[matched_result[i]].get('recipeName'));
		}
		APP.userRecipesView = new APP.RecipesView({
			collection: APP.userRecipes
		});
		APP.userRecipesView.render();
		$('body #mainbody').append(APP.userRecipesView.$el);

	},
	home: function(){
		$("body #mainbody #user_input").hide();

	}
});

APP.router = new APP.Router();
Backbone.history.start({"root": "/"});