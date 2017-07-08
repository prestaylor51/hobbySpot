var express = require('express');
var app = express();


// Controllers
var mentorControl = require('./controllers/mentor.js');
var userControl = require('./controllers/user.js');
var studentControl = require('./controllers/student.js');
var hobbyControl = require('./controllers/hobby.js');

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
  response.redirect('main.html');
});

// GETS
app.get('/getMentors', mentorControl.handleMentors);
app.get('/getStudents', studentControl.handleStudents);
app.get('/getHobbies', hobbyControl.handleHobbies);
app.get('/getHobby', hobbyControl.handleHobby);

// /getSingleStudent
// /getSingleMentor

// POSTS
app.post('/signUp', userControl.createUser);
app.post('/signUpMentor', mentorControl.signUpMentor);
app.post('/signIn', userControl.handleSignIn);
// /submitHobby
// /contactMentor
// /signUpForMentor
// /acceptStudent

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});





