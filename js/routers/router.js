APP.Router = Backbone.Router.extend({
	routes: {
		""					: "home",
		"users"				: "fetchallusers",
		"recipes/:id"		: "recipe",
		"all_recipes"		: "all_recipes",
		"ingredients/:id"	: "ingredient",
		"user_input"		: "user_input",
		"match_result"		: "user_recipes",
		"user_recipes"		: "match_recipes",
		"show_on_map"		: "result_on_map"
	},

	/*initialize: function() {
		Backbone.history.start({pushState: true});
	},*/

	home: function(){
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
		console.log("user_recipes hit");
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
		//var userCuisines = {};
		for (var i=0; i<matched_result.length; i++){
			var aaa = APP.userRecipes.add(APP.DBRecipes.models[matched_result[i]]);
			//console.log("gggg");
			console.log(APP.DBRecipes.models[matched_result[i]].get('recipeName'));
			console.log("test");
			console.dir(aaa);
			//console.log(APP.DBRecipes.models[matched_result[i]].get('attributes'));
			/*if (APP.DBRecipes.models[matched_result[i]].get('attributes') != undefined){
				var cuisine_name = APP.DBRecipes.models[matched_result[i]].get('attributes')[cuisine][0];
				userCuisines[cuisine_name]
			}else{

			}*/
		}
		APP.userRecipesView = new APP.RecipesView({
			collection: APP.userRecipes
		});
		APP.userRecipesView.render();


		$('#mainbody #match_result #user_recipes').append(APP.userRecipesView.$el);
	},

	match_recipes: function(){
		console.log("match_recipes hit");
		$("body #mainbody #landing").hide();
		$("body #mainbody #user_input").hide();
		$("#mainbody #match_result").show();

		APP.matchRecipes = new APP.Recipes();
		APP.matchRecipes.url = "/matching";
		APP.matchRecipes.fetch({
			success: showMatchResult
		});

	},

	result_on_map: function(){
		$("body #mainbody #landing").hide();
		$("body #mainbody #user_input").hide();
		$("#mainbody #match_result").show();

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
		APP.userCuisines = {
			"american": {num: 0, images_list: []},
			"italian": {num: 0, images_list: []},
			"french": {num: 0, images_list: []},
			"spanish": {num: 0, images_list: []},
			"unknown": {num: 0,
						lon: -40,
						lat: 30,
						images_list: []}
		};
		APP.cuisineImgs = [];
		var cuisine_img_pos = {
			"american": {cx: 45, cy: 0},
			"italian": {cx: 45, cy: 0},
			"french": {cx: 45, cy: 0},
			"spanish": {cx: 45, cy: 0},
			"unknown": {cx: 45, cy: 0}
		};
		for (var i=0; i<matched_result.length; i++){
			APP.userRecipes.add(APP.DBRecipes.models[matched_result[i]]);
			//console.log("gggg");
			//console.log(APP.DBRecipes.models[matched_result[i]].get('recipeName'));
			console.log(APP.DBRecipes.models[matched_result[i]].get('attributes'));
			if (APP.DBRecipes.models[matched_result[i]].get('attributes') != undefined){
				var attr_cuisines = APP.DBRecipes.models[matched_result[i]].get('attributes')['cuisine'];
				//console.log(attr_cuisines.length);
				for (var j=0; j<attr_cuisines.length; j++){
					//console.log(j);
					//console.log(APP.cuisine_geo[cuisine[j]]);
					//console.log(APP.cuisine_geo[attr_cuisines[j]].lon);
					if (attr_cuisines[j] in APP.cuisine_geo){
						console.log(attr_cuisines[j]);
						APP.userCuisines[attr_cuisines[j]].lon = APP.cuisine_geo[attr_cuisines[j]].lon;
						APP.userCuisines[attr_cuisines[j]].lat = APP.cuisine_geo[attr_cuisines[j]].lat;
						APP.userCuisines[attr_cuisines[j]].num += 1;
						/*APP.userCuisines[attr_cuisines[j]].images_list.push({
							cuisine_name: attr_cuisines[j],
							img_src: APP.DBRecipes.models[matched_result[i]].get('smallImageUrls')[0],
							cx: cuisine_img_pos[attr_cuisines[j]].cx,
							cy: cuisine_img_pos[attr_cuisines[j]].cy

						});*/
						APP.cuisineImgs.push({
							cuisine_name: attr_cuisines[j],
							img_src: APP.DBRecipes.models[matched_result[i]].get('smallImageUrls')[0],
							link: "http://www.yummly.com/recipe/"+APP.DBRecipes.models[matched_result[i]].get('yum_id'),
							cx: cuisine_img_pos[attr_cuisines[j]].cx,
							cy: cuisine_img_pos[attr_cuisines[j]].cy

						});
						cuisine_img_pos[attr_cuisines[j]].cx = 45 + Math.floor((APP.userCuisines[attr_cuisines[j]].num / 7)) * 90;
						cuisine_img_pos[attr_cuisines[j]].cy = (APP.userCuisines[attr_cuisines[j]].num % 7) * 60;
					}else{
						APP.userCuisines['unknown'].num += 1;
						APP.cuisineImgs.push({
							cuisine_name: 'unknown',
							img_src: APP.DBRecipes.models[matched_result[i]].get('smallImageUrls')[0],
							link: "http://www.yummly.com/recipe/"+APP.DBRecipes.models[matched_result[i]].get('yum_id'),
							cx: cuisine_img_pos['unknown'].cx,
							cy: cuisine_img_pos['unknown'].cy

						});
						cuisine_img_pos['unknown'].cx = 45 + Math.floor((APP.userCuisines["unknown"].num / 7)) * 90;
						cuisine_img_pos['unknown'].cy = (APP.userCuisines['unknown'].num % 7) * 60;
					}

				}


			}else{
				APP.userCuisines['unknown'].num += 1;
				APP.cuisineImgs.push({
							cuisine_name: 'unknown',
							img_src: APP.DBRecipes.models[matched_result[i]].get('smallImageUrls')[0],
							link: "http://www.yummly.com/recipe/"+APP.DBRecipes.models[matched_result[i]].get('yum_id'),
							cx: cuisine_img_pos['unknown'].cx,
							cy: cuisine_img_pos['unknown'].cy

						});
						cuisine_img_pos['unknown'].cx = 45 + Math.floor((APP.userCuisines["unknown"].num / 7)) * 90;
						cuisine_img_pos['unknown'].cy = (APP.userCuisines['unknown'].num % 7) * 60;
			}
		}
		//console.log("hhhh");
		//console.dir(APP.userCuisines);
		APP.userCuisinesView = new APP.CuisinesView({
			collection: APP.userRecipes

		});
		APP.userCuisinesView.render();

		$('#mainbody #match_result #user_recipes').append(APP.userCuisinesView.$el);

	}

});

var showMatchResult = function(recipes){
	console.log("fetching matchRecipes successfully");
	//console.dir(recipes);
	//console.dir(recipes.models);

	if (recipes.models[0].attributes.yum_id != undefined){
		//console.log(recipes.models[0].attributes.ingredients);
		APP.userRecipes = new APP.Recipes();
		for (var i=0; i<recipes.models.length; i++){
			APP.userRecipes.add({
				id: recipes.models[i].attributes.id,
				recipeName: recipes.models[i].attributes.recipeName,
				ingredients: JSON.parse(recipes.models[i].attributes.ingredients),
				yum_id: recipes.models[i].attributes.yum_id,
				smallImageUrls: new Array(recipes.models[i].attributes.smallImageUrls)

			});
		}
		//APP.userRecipes.add(recipes.models[0]);
		APP.userRecipesView = new APP.RecipesView({
			collection: APP.userRecipes
		});
		APP.userRecipesView.render();
		$('#mainbody #match_result #user_recipes').append(APP.userRecipesView.$el);
	}else{
		console.log("No matched recipes!!")
	}
}

APP.router = new APP.Router();
Backbone.history.start({"root": "/"});

