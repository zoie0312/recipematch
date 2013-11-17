APP.Router = Backbone.Router.extend({
	routes: {
		"first": "firstRoute",
		"second": "secondRoute",
		"users": "fetchallusers",
		"recipe": "recipe",
		"all_recipes": "all_recipes"
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
				console.log('fetch successfully');
				APP.recipe0 = APP.recipes.get(1);
				APP.recipesView1 = new APP.RecipesView({
					model: APP.recipe0
				});
				APP.recipesView1.render();
				$('body').append(APP.recipesView1.$el);
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
				console.log("fetch successfully");
				APP.recipesView = new APP.RecipesView({
					collection: APP.recipes
				});
				APP.recipesView.render();
				$('body').append(APP.recipesView.$el);

			}
		});
	}
});

APP.router = new APP.Router();
Backbone.history.start({"root": "/"});