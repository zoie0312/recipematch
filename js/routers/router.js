APP.Router = Backbone.Router.extend({
	routes: {
		"first": "firstRoute",
		"second": "secondRoute",
		"users": "fetchallusers"
	},

	firstRoute: function(){
		console.log("firstRoute() loaded");
		//APP.user1 = new APP.User();
		//APP.user2 = new APP.User();
		//APP.user1.set({name:"Collin", phone:"40638888" });
		//APP.user2.set({name: "Dan", address:"somewhere in the planet"});
		APP.userCollection = new APP.Users();
		APP.userCollection.create({name:"Collin", phone:"40638888" });
		APP.userCollection.create({name:"Dan", phone:"somewhere in the planet" });
	},

	secondRoute: function(){
		console.log("secondRoute() loaded");
	},
	fetchallusers: function(){
		console.log("fetch all users");
	}
});

APP.router = new APP.Router();
Backbone.history.start({"root": "/"});