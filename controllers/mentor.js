// Controller for getting mentor list from the database

// Require model
var mentorModel = require('../models/mentor.js');

// HANDLE MENTORS
function handleMentors(req, res) {

	console.log('getting mentors');

	console.log('finding mentors');
	var hobby = req.query.hobby;
	console.log("hobby = %s", hobby);

	mentorModel.getAllMentors(hobby,function(err, result) {

		if (err){
			console.log("something went wrong with the model");
		}

		console.log(result);
		res.status(200).json(result);

	});
}
//////////////////////////////////////////////////////////////

// SIGN UP MENTOR
function signUpMentor(req, res) {
	console.log("signing up mentor");

	var array = req.body

	console.log("greeting: %s", array['greeting']);

	mentorModel.signMentor(array, function(err, result) {
		console.log("done signing mentor")
	}); 
}
//////////////////////////////////////////////////////////////

module.exports = {
		handleMentors: handleMentors,
		signUpMentor: signUpMentor
}