var express = require("express");
var path = require("path");

var app = express()
			.use(express.static(__dirname,
								path.join(__dirname, "bower_components"),
								path.join(__dirname, "js")))
			.use(express.logger('dev'));

app.get("/hello", function(req, res){
	res.send("Hello, World");
});

var port = process.env.PORT || 8000;
app.listen(port);
console.log("Started listen on port " + port);