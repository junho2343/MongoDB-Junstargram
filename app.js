
// load package
const express 	 = require('express');
const app 		 = express();
const bodyParser = require('body-parser');
const mongoose 	 = require('mongoose');

// models
var User 	= require('./model/user');
var Product = require('./model/product');
var models = {
	'User'  	:  User,
	'Product'  	:  Product
};

// set view engine
app.set("view engine","ejs");
app.set("views",'./views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// router
var main = require('./routes/main.js')(app,models);

// connect to mongo server
var db = mongoose.connection;
db.on('error', console.error);
db.once('open',function(){
	console.log("connected to mongod server");
});
mongoose.connect("mongodb://localhost/junstargram");

// server start
app.listen(3000,function(){
	console.log("express listening on port",3000);
})