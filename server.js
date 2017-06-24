var express = require('express');
var app = express();

// Controllers
var controller = require('./controllers/mentor.js')

// Set port
app.set('port', (process.env.PORT || 5000));

// Body Parser
var bodyParser = require('body-parser');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

// Static files
app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

// GETS
app.get('/getMentors', controller.handleMentors);

// POSTS

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});





