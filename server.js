var express = require('express');
var app = express();
var mongoose = require('mongoose');                     // mongoose for mongodb
var mongojs = require('mongojs');
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var multer = require('multer');
var db = mongojs("cs5610353",["serviceClients"]);

mongoose.connect('mongodb://localhost/test');

app.use(express.static(__dirname + '/app'));

app.use(morgan('dev'));
app.use(bodyParser.json()); // application/json
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(multer());


/*app.get('/', function(req, res){
  res.send('app/index.html');
});*/


// routes ===========================================================================

// get for selecting or searching anything
app.get("/serviceClients", function(req, res){
	db.serviceClients.find(function(err, docs){
		res.json(docs);
	});
});

//post for inserting into the db
app.post("/serviceClients", function(req, res){
	var svc = req.body;
	console.log(svc);
	db.serviceClients.insert(req.body, function(err, doc){
		res.json(doc);
	});
});

// get for selecting searching
app.get("/serviceClients/:id", function(req, res){
	var id = req.params.id;
	db.serviceClients.findOne({_id: mongojs.ObjectId(id)}, function(err, doc) {
		res.json(doc);
	});
});

// put for updating
app.put("/serviceClients/:id", function(req, res){ 
	console.log(req.body);
	db.serviceClients.findAndModify({
		query: { _id: mongojs.ObjectId(req.params.id) },
		update: { $set: { name: req.body.name } },
		new: true
		},function(err, doc){
			res.json(doc)
		}
	);
});


// delete for deleting an entry from the database
app.delete("/serviceClients/:id", function(req, res){
	var id = req.params.id; // or req.params["id"]
	console.log(id);
	db.serviceClients.remove({_id : mongojs.ObjectId(id)}, function(err, doc) {
		res.json(doc);
	});
});

// routes end here ==================================================================


app.listen(3000);

console.log("App listening on port 3000");