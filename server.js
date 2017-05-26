// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');


// MYSQL Dependency
var mysql = require('mysql');
var options = {
	host: 'localhost',
	user: 'x',
	password: 'x',
	database: 'test_db'
}
var connection = mysql.createConnection(options);


// configure app
app.use(morgan('dev')); // log requests to the console
// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 3000; // set our port

var http = require('http');

app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.get('/', function(req, res) {
		res.sendfile('./public/index.html');
});





// ROUTES FOR OUR API
//=========================================================================================================
// create our router
var router = express.Router();

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/getUsers', function(req, res) {
	connection.connect();
	connection.query('SELECT * FROM users', (error,results,fields)=>{
		if (error) throw error;

		res.json({'users': results[0]});
	});	
});

router.post('/token', (req,res)=>{

	var token = req.body.token;

	res.json({ 'token': token});
})

// on routes that end in /bears
//---------------------------------------------------------------------------------------------------------


// REGISTER OUR ROUTES ------------------------------------------------------------------------------------
app.use('/api', router);

// START THE SERVER
// =========================================================================================================
app.listen(port);
console.log('Your not very secure API is running on: ' + port);





// NODE NEWS API
// ========================================================================================================



