var express = require("express");
var path = require("path");
var _ = require("underscore");
var fs = require('fs');

var app = express()
			.use(express.static(__dirname,
								path.join(__dirname, "bower_components"),
								path.join(__dirname, "js")))
			.use(express.bodyParser())
			.use(express.logger('dev'));

var db = [
	{id:1, name: "hohn"}
];

var id = _.max(db, function(user) {return user.id;}).id;
//id = id + 1;
/*var getID = function(){
	id += 1;
	return id;
};*/

var recipes = [
	{
		id: "1",
		name: "Three Cup Chicken",
		ingredients: ["chicken", "ginger", "garlic"]
	},
	{
		id: "2",
		name: "recipe 2",
		ingredients: ["pork", "tomato", "onion"]
	}
];

var ingredients = [
	{
		id: 1,
		name: "tomato",
		used_in: [2, 44, 5]
	},
	{
		id: 2,
		name: "onion",
		used_in: [12, 4, 5]
	}
];
var ing_id = _.max(ingredients, function(ingredient) {return ingredient.id;}).id;

var DB_Ingredients = [];

fs.readFile('db/db_ingredients_json.json', function(err, data){
	if (err){
		return console.log(err);
	}

	DB_Ingredients = JSON.parse(data);

	db_ingredients_ready = true;
	//console.log(DB_Ingredients["garlic"]["id"]);
	console.log(DB_Ingredients[23]["name"]);
});

fs.readFile('db/db_recipes.json', function(err, data){
	if (err){
		return console.log(err);
	}
		//console.log(data.length);
	DB_Recipes = JSON.parse(data);

	db_recipes_ready = true;
	console.log(DB_Recipes.length);
	console.log(DB_Recipes[0]);
});


app.get("/hello", function(req, res){
	res.send("Hello, World");
});

app.get("/users", function(req, res){
	res.json(db);

});

app.get("/recipes", function(req, res){
	res.json(DB_Recipes);
	//console.log(recipes);
});

app.post("/users", function(req, res){
	id += 1;
	req.body.id = id;
	console.log(req.body);

	db.push(req.body);
	res.end();
	//res.re
});

app.get("/ingredients", function(req, res){
	res.json(DB_Ingredients);

});

app.post("/ingredients", function(req, res){
	ing_id += 1;
	req.body.id = ing_id;
	console.log(req.body);

	ingredients.push(req.body);
	res.end();
	//res.re
});

var port = process.env.PORT || 8000;
app.listen(port);
console.log("Started listen on port " + port);