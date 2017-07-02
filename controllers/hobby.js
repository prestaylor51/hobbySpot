
var hobbyModel = require('../models/hobby.js');

/*HANDLE HOBBIES 
	Gets all of the hobbies from the database*/
function handleHobbies(req, res) {

	console.log("handling hobbies..");

	hobbyModel.getHobbies(function (err,results) {
		if (err) {
			console.log("there was an error in the model");
		}

		console.log("done getting hobbies");

		console.log(results);

		res.status(200).json(results);
	}); 

}

function handleHobby(req, res) {
	console.log("getting hobby");

	var hobbyId = req.query.hobbyId;

	hobbyModel.getHobby(hobbyId, function (err, result){
		if (err) {
			console.log("there was an error in the model");
		}

		console.log("Done geting hobby");

		res.status(200).json(result);
	});

	

}

module.exports = {
	handleHobbies: handleHobbies,
	handleHobby: handleHobby
}