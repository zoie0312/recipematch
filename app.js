var express = require("express");
var path = require("path");
var _ = require("underscore");
//var fs = require('fs');
var pg = require('pg');

var app = express()
            .use(express.static(__dirname,
                                path.join(__dirname, "bower_components"),
                                path.join(__dirname, "public"),
                                path.join(__dirname, "js")))
            .use(express.bodyParser())
            .use(express.cookieParser())
            .use(express.logger('dev'));

var db = [
    {id:1, name: "hohn"}
];

var dbConnectionString = process.env.DATABASE_URL || "/var/run/postgresql recipedb2";

var id = _.max(db, function(user) {return user.id;}).id;

var sample_recipes = [
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

var sample_ingredients = [
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
//var ing_id = _.max(ingredients, function(ingredient) {return ingredient.id;}).id;

//var DB_Ingredients = [];
//var DB_Recipes = [];
var user_input_ingredients = {};

/*fs.readFile('db/db_ingredients_json1120.json', function(err, data){
    if (err){
        return console.log(err);
    }

    DB_Ingredients = JSON.parse(data);

});*/

/*fs.readFile('db/db_recipes1120.json', function(err, data){
    if (err){
        return console.log(err);
    }
    DB_Recipes = JSON.parse(data);
});*/

app.get("/", function(req, res){
    console.log("root hit");
} );

app.get("/hello", function(req, res){
    res.send("Hello, World");
});

app.get("/users", function(req, res){
    res.json(db);
});

app.get("/db_recipes", function(req, res){
    //res.json(DB_Recipes);
    res.end("");
});

app.post("/users", function(req, res){
    id += 1;
    req.body.id = id;
    console.log(req.body);

    db.push(req.body);
    res.end();
    //res.re
});

app.get("/db_ingredients", function(req, res){

    // give each new connection an unique id
    var new_connid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
    user_input_ingredients[new_connid] = Array();
    res.cookie('connID', new_connid);

    //res.json(DB_Ingredients);
    res.json(200, {});
});

app.post("/ingredients", function(req, res){
    var conn_id = req.cookies.connID;
    user_input_ingredients[conn_id].push(req.body.name);

    //console.log("connectiion id= " + conn_id);
    //console.log("user input ingredients= " + user_input_ingredients[conn_id]);
    //console.dir(req.cookies);

    res.end();
});

app.get("/matching", function(req, res, next){
    var conn_id = req.cookies.connID;
    var user_input = user_input_ingredients[conn_id];

    var offset = 1;
    var placeholders = user_input.map(function(name,i){
      return '$'+(i+offset);

    }).join(',');
    console.log("matching recipes..");
    console.log("user input ingredients= " + user_input);

    pg.connect(dbConnectionString, function(err, client, done) {
        var handleError = function(err) {
          if(!err) return false;
          done(client);
          next(err);
          return true;
        };
        /*jshint multistr: true */
        client.query('SELECT DISTINCT id, used_db_ingredients FROM recipes_recipe WHERE id IN \
            (SELECT DISTINCT recipe_id FROM recipes_usedin WHERE ingredient_id IN \
                (SELECT id FROM recipes_ingredient WHERE name IN ('+placeholders+')) ORDER BY recipe_id)'
            /*jshint laxcomma: true */
            ,user_input , function(err, result) {
            if(handleError(err)) return;
            var test_recipe_id = result.rows[1].id;
            console.log("total " + result.rows.length + " possible recipes");
            var matched_recipe_id = [];
            for (var i=0; i<result.rows.length; i++){
                var recipe_used_db_ingredients = JSON.parse(result.rows[i].used_db_ingredients);
                //console.log(recipe_used_db_ingredients);

                if ((_.difference(recipe_used_db_ingredients, user_input)).length === 0){
                    console.log(recipe_used_db_ingredients);
                    matched_recipe_id.push(result.rows[i].id);
                }
            }
            console.log("total " + matched_recipe_id.length + " matched recipes");

            if (matched_recipe_id.length < 1){
                done();
                res.json(200, {});
            }else{
                var offset = 1;
                var placeholders2 = matched_recipe_id.map(function(name,i){
                        return '$'+(i+offset);
                    }).join(',');

                client.query('SELECT * FROM recipes_recipe WHERE id IN ('+placeholders2+')',
                    matched_recipe_id , function(err, result){
                    if(handleError(err)) return;

                    //console.log("total " + result.rows.length + " matched recipes");
                    done();
                    res.json(result.rows);
                    res.end();
                });
            }
        });
    });
});

var port = process.env.PORT || 8000;
app.listen(port);
console.log("Started listen on port " + port);