// Controller for getting mentor list from the database

// GETTING MENTORS
var mentorModel = require('../models/get.js');

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

module.exports = {
		handleMentors: handleMentors,
}